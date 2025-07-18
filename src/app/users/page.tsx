"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AlertModal } from "@/components/common/AlertModal";
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
  ChangePassword,
  ChangeStatus,
  DeleteUser,
  GetAllUser,
} from "api/userService";
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
import { cn } from "@/styles/lib/utils";
import isEqual from "lodash/isEqual";
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
import { UserStatus } from "enum/userEnum";
import { Modal } from "@/components/common/Modal";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/styles/components/ui/dialog";
import HyperFormWrapper from "@/components/HyperFormWrapper";
import { changePasswordSchema } from "shemas/changePasswordSchema";
const filterInit = {
  keySearch: "",
  sort: {},
  page: 1,
  pageSize: 10,
  sessionCode: Math.random().toString(),
};
const requestInit = {
  _id: "",
  password: "",
  status: "Actice",
};
const UserPage = () => {
  const router = useRouter();
  const zustand = useStore();
  const queryClient = useQueryClient();
  const cachedStore = queryClient.getQueryData(["#userList"]);
  const {
    isLoading,
    setIsLoading,
    open,
    setOpen,
    openAlert,
    setOpenAlert,
    hasDataChanged,
    setHasDataChanged,
  } = zustand;
  const [data, setData] = useState([]);
  const [filterPage, setFilterPage] = useState<Filter>(filterInit);
  const [keySearch, setKeySearch] = useState<string>("");
  const [itemDelete, setItemDelete] = useState({ name: "", _id: "" });
  const [request, setRequest] = useState(requestInit);
  const LoadData = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    GetAllUser(filterPage)
      .then((response) => {
        if (response.success) {
          setData(response.data);
          queryClient.setQueryData(["#userList"], () => {
            return response.data; // thêm mới
          });
          setHasDataChanged(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleViewDetail = (id) => {
    router.push(`/users/${id}`);
  };
  const handleDeleteConform = (item) => {
    setItemDelete(item);
    setOpenAlert(true);
  };
  const handleDelete = (id) => {
    DeleteUser(id, {}).then((res) => {
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
    columnHelper.accessor("fullName", {
      header: (info) => <DefaultHeader info={info} name="Info" />,
      cell: (info) => {
        return (
          <div className="flex min-w-fit items-center gap-3  justify-start">
            {/* <img
              src={
                info.row.original.images.length > 0
                  ? info.row.original.images[0].imageAbsolutePath
                  : "/images/empty.png"
              }
              loading="lazy"
              className="aspect-[6/5] w-15 rounded-[5px] object-cover"
              width={60}
              height={50}
              alt={"Image for user " + info.row.original.name}
              role="presentation"
            /> */}
            <div>{info.row.original.fullName}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("phone", {
      header: (info) => <DefaultHeader info={info} name="Phone" />,
      cell: (info) => {
        return info.getValue() || "_";
      },
    }),
    columnHelper.accessor("role", {
      header: (info) => <DefaultHeader info={info} name="Role" />,
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
                  info.row.original.status === UserStatus.active,
                "bg-[#D34053]/[0.08] text-[#D34053]":
                  info.row.original.status === UserStatus.unAcitive,
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
        <div className="flex items-center justify-start gap-x-3.5">
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
                setRequest(row.original);
                setOpen(true);
              }}
            >
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleChangeStatus(
                  row.original._id,
                  row.original.status === UserStatus.active
                    ? UserStatus.unAcitive
                    : UserStatus.active
                );
              }}
            >
              {row.original.status === UserStatus.active
                ? UserStatus.unAcitive
                : UserStatus.active}
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

  const handleChangePassword = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    ChangePassword(request._id, { password: request.password })
      .then((res) => {
        if (res.success) {
          toast.success("Change Success!", {
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

  const handleChangeStatus = (_id, status) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    ChangeStatus(_id, {
      status,
    })
      .then((res) => {
        if (res.success) {
          toast.success("Change Success!", {
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
      <Breadcrumb pageName="Users" />
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
            <DialogTitle>{"Update Password"}</DialogTitle>
          </DialogHeader>
          <div className="">
            <HyperFormWrapper
              schema={changePasswordSchema}
              defaultValues={request}
              onSubmit={() => {
                handleChangePassword();
              }}
              className="mx-auto max-w-md"
            >
              <HD_Input
                title="Password"
                name="password"
                placeholder="Press password"
                type="text"
                isItemForm={true}
                initValue={request.password}
                onChange={(value) =>
                  setRequest({
                    ...request,
                    password: value,
                  })
                }
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRequest(requestInit);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">{"Save"}</Button>
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
            router.push("/users/add");
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
          <HyperTodoTable_v2
            datas={data}
            columns={columns}
            onRowDoubleClick={(item) => router.push(`/users/${item._id}`)}
          />
        )}
      </div>
    </>
  );
};

export default UserPage;
