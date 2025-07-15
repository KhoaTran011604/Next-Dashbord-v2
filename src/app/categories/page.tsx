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
import {
  DeleteCategory,
  GetAllCategory,
  SaveCategory,
  UpdateCategory,
} from "api/categoryService";
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
import { Modal } from "@/components/common/Modal";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/styles/components/ui/dialog";
import HyperFormWrapper from "@/components/HyperFormWrapper";
import { categorySchema } from "shemas/categorySchema";
import { HD_Button } from "@/components/common/HD_Button";
const filterInit = {
  keySearch: "",
  sort: {},
  page: 1,
  pageSize: 10,
  sessionCode: Math.random().toString(),
};
const categoryInit = { _id: "", name: "" };
const initData = {
  name: "",
};
const CategoryPage = () => {
  const router = useRouter();
  const zustand = useStore();
  const queryClient = useQueryClient();
  const cachedStore = queryClient.getQueryData(["#categoryList"]);
  const { isLoading, setIsLoading, openAlert, setOpenAlert, open, setOpen } =
    zustand;
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(categoryInit);
  const [filterPage, setFilterPage] = useState<Filter>(filterInit);
  const [keySearch, setKeySearch] = useState<string>("");

  const [itemDelete, setItemDelete] = useState({ name: "", _id: "" });
  const LoadData = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    GetAllCategory(filterPage)
      .then((response) => {
        if (response.success) {
          setData(response.data);
          const queryClient = useQueryClient();
          const cachedStore = queryClient.getQueryData(["#categoryList"]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleSaveCategory = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    SaveCategory({ name: category.name })
      .then((res) => {
        if (res.success) {
          toast.success("Create Success!", {
            position: "bottom-right",
          });
          setOpen(false);
          LoadData();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleUpdateCategory = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    UpdateCategory(category._id, category)
      .then((res) => {
        if (res.success) {
          toast.success("Update Success!", {
            position: "bottom-right",
          });
          setOpen(false);
          LoadData();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleViewDetail = (id) => {
    setOpen(true);
    //router.push(`/categories/${id}`);
  };
  const handleDeleteConform = (item) => {
    setItemDelete(item);
    setOpenAlert(true);
  };
  const handleDelete = (id) => {
    DeleteCategory(id, {}).then((res) => {
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
  const handleSubmit = () => {
    console.log("submit");

    category._id.length > 0 ? handleUpdateCategory() : handleSaveCategory();
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
      header: (info) => <DefaultHeader info={info} name="Name" />,
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      id: "actions",
      enableSorting: false,
      header: (info) => <DefaultHeader info={info} name="Actions" />,
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-x-3.5">
          <button
            className="hover:text-primary"
            onClick={() => {
              setCategory(row.original);
              setOpen(true);
            }}
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
  console.log("cachedStore", cachedStore);

  useEffect(() => {
    if (!isFirstLoad.current) {
      LoadData();
    } else {
      cachedStore ? setData(cachedStore as []) : LoadData();
      return;
    }
    // Sau lần đầu tiên render
    isFirstLoad.current = false;
  }, [filterPage]);

  return (
    <>
      <Breadcrumb pageName="Categories" />
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
      <Modal open={open} setOpen={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {category._id.length > 0 ? "Update Product" : "Add Product"}
            </DialogTitle>
            {/* <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription> */}
          </DialogHeader>
          <div className="">
            <HyperFormWrapper
              schema={categorySchema}
              defaultValues={initData}
              onSubmit={(e) => {
                handleSubmit();
              }}
              className="mx-auto max-w-md"
            >
              <HD_Input
                title="Name"
                name="name"
                placeholder="Press product name"
                type="text"
                isItemForm={true}
                initValue={category.name}
                onChange={(value) =>
                  setCategory({
                    ...category,
                    name: value,
                  })
                }
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCategory(categoryInit);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={() => {}}>
                  {category._id.length > 0 ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </HyperFormWrapper>
          </div>
        </DialogContent>
      </Modal>
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
            setCategory(categoryInit);
            setOpen(true);
          }}
          className="my-2 px-4 py-2 bg-black text-white rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="space-y-10">
        {isLoading ? (
          <LottieComponent />
        ) : (
          <HyperTodoTable_v2
            datas={data}
            columns={columns}
            onRowDoubleClick={(item) => {
              setCategory(item);
              setOpen(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default CategoryPage;
