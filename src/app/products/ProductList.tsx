"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AlertModal } from "@/components/common/AlertModal";
import { HD_Table } from "@/components/Tables/HD_Table";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/styles/components/ui/alert-dialog";
import { DeleteProduct, GetAllProduct } from "api/productService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Filter } from "types/MainType";
import useStore from "zustand/store";
import { debounce } from "lodash";
import HD_Input from "@/components/common/HD_Input";
import { SearchIcon, TrashIcon } from "assets/icons";
import LottieComponent from "@/components/lotties/lottie";
import HyperTodoTable_v2 from "@/components/HyperTodoTable_v2";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DefaultHeader from "@/components/default-header";
import isEqual from "lodash/isEqual";
import { cn } from "@/styles/lib/utils";
import { ProductStatus } from "enum/productEnum";
import { PreviewIcon } from "@/components/Tables/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrencyVN } from "lib/format-number";
import MyPagination from "@/components/ui/panigation/MyPagination";
const filterInit = {
  keySearch: "",
  sort: {},
  page: 1,
  pageSize: 10,
  sessionCode: Math.random().toString(),
};
const ProductList = () => {
  const router = useRouter();
  const zustan = useStore();
  const { hasDataChanged, setHasDataChanged } = zustan;

  const queryClient = useQueryClient();
  const cachedStore = queryClient.getQueryData(["#productList"]);
  const { isLoading, setIsLoading, openAlert, setOpenAlert } = zustan;
  const [data, setData] = useState([]);
  const [filterPage, setFilterPage] = useState<Filter>(filterInit);
  const [keySearch, setKeySearch] = useState<string>("");
  const [itemDelete, setItemDelete] = useState({ name: "", _id: "" });
  const LoadData = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    GetAllProduct(filterPage)
      .then((response) => {
        if (response.success) {
          setData(response.data);
          queryClient.setQueryData(["#productList"], () => {
            return response.data;
          });
          setHasDataChanged(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleViewDetail = (id) => {
    router.push(`/products/${id}`);
  };
  const handleDeleteConform = (item) => {
    setItemDelete(item);
    setOpenAlert(true);
  };
  const handleDelete = (id) => {
    DeleteProduct(id, {}).then((res) => {
      if (res.success) {
        LoadData();
        toast.success("Delete Success !", {
          position: "bottom-right",
        });
      } else {
        toast.error("Delete Fail !", {
          position: "bottom-right",
        });
      }
    });
  };
  const onDebounce = useCallback(
    debounce((term) => {
      setFilterPage({
        ...filterPage,
        keySearch: term.trim(),
        page: 1,
        sessionCode: Math.random().toString(),
      });
    }, 700),
    []
  );
  const columnHelper = createColumnHelper<any>();
  const columns: ColumnDef<any, any>[] = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("name", {
      header: (info) => <DefaultHeader info={info} name="Info" />,
      cell: (info) => {
        return (
          <div className="flex min-w-fit items-center gap-3  justify-start">
            <img
              src={
                info.row.original.images.length > 0
                  ? info.row.original.images[0].imageAbsolutePath
                  : "/images/empty.png"
              }
              loading="lazy"
              className="aspect-[6/5] w-15 rounded-[5px] object-cover"
              width={100}
              height={100}
              alt={"Image for product " + info.row.original.name}
              role="presentation"
            />
            <div>{info.row.original.name}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("price", {
      header: (info) => <DefaultHeader info={info} name="Price" />,
      cell: (info) => {
        return (
          <div className="min-w-[155px] ">
            <h5 className="text-dark dark:text-white">
              {info.row.original.name}
            </h5>
            <p className="mt-[3px] text-body-sm font-medium">
              {`${formatCurrencyVN(info.row.original.price)} `}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("categoryName", {
      header: (info) => <DefaultHeader info={info} name="Category" />,
      cell: (info) => {
        return info.getValue() || "_";
      },
    }),
    columnHelper.accessor("status", {
      header: (info) => <DefaultHeader info={info} name="Status" />,
      cell: (info) => {
        return (
          <div
            className={cn(
              "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
              {
                "bg-[#219653]/[0.08] text-[#219653]":
                  info.row.original.status === ProductStatus.inStock,
                "bg-[#D34053]/[0.08] text-[#D34053]":
                  info.row.original.status === ProductStatus.outOfStock,
                "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                  info.row.original.status === ProductStatus.pending,
              }
            )}
          >
            {info.row.original.status}
          </div>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      enableSorting: false,
      header: (info) => <DefaultHeader info={info} name="Actions" />,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-x-3.5">
          <button
            className="hover:text-primary"
            onClick={() => handleViewDetail(row.original._id)}
          >
            <span className="sr-only">View Invoice</span>
            <PreviewIcon />
          </button>

          <button
            className="hover:text-primary"
            onClick={() => {
              handleDeleteConform({
                _id: row.original._id,
                name: row.original.name,
              });
            }}
          >
            <span className="sr-only">Delete Invoice</span>
            <TrashIcon />
          </button>
        </div>
      ),
    }),
    columnHelper.display({
      id: "more",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleViewDetail(row.original._id)}
            >
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleDeleteConform({
                  _id: row.original._id,
                  name: row.original.name,
                });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ];

  const isFirstLoad = useRef(true); // 👈 đánh dấu lần render đầu tiên

  useEffect(() => {
    if (
      (!isFirstLoad.current && !isEqual(filterPage, filterInit)) ||
      (!isFirstLoad.current && hasDataChanged)
    ) {
      LoadData();
    } else {
      cachedStore ? setData(cachedStore as any[]) : LoadData();
      isFirstLoad.current = false;
      return;
    }
  }, [filterPage]);

  return (
    <>
      {/* <Breadcrumb pageName="Products" /> */}
      <AlertModal openAlert={openAlert} setOpenAlert={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you absolutely sure to delete ?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`Delete ${itemDelete?.name}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(itemDelete._id)}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertModal>
      <div className="flex justify-between items-center">
        <HD_Input
          name="search"
          placeholder="Search..."
          title=""
          iconPosition="left"
          icon={<SearchIcon />}
          initValue={keySearch}
          onChange={(value) => {
            setKeySearch(value);
            onDebounce(value);
          }}
        />
        <button
          onClick={() => {
            //handleSubmit();
            router.push("/products/add");
          }}
          className="my-2 px-4 py-2 bg-black text-white rounded-lg dark:bg-gray-800 text-white"
        >
          Add
        </button>
      </div>
      <div className="space-y-10">
        {isLoading ? (
          <LottieComponent />
        ) : (
          <>
            <HyperTodoTable_v2
              datas={data}
              columns={columns}
              onRowDoubleClick={(item) => router.push(`/products/${item._id}`)}
            />
            {!isLoading && (
              <MyPagination
                filterPage={filterPage}
                setFilterPage={setFilterPage}
                totalRecords={100}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
