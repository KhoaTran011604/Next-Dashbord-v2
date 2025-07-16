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
  DeleteReview,
  GetAllReview,
  SaveReview,
  UpdateReview,
} from "api/reviewService";
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
//import { reviewSchema } from "shemas/reviewSchema";
import { HD_Button } from "@/components/common/HD_Button";
import { reviewSchema } from "shemas/reviewSchema";
import HD_TextArea from "@/components/common/HD_TextArea";

const filterInit = {
  keySearch: "",
  sort: {},
  page: 1,
  pageSize: 10,
  sessionCode: Math.random().toString(),
};
const initData = {
  _id: "",
  productId: "",
  userId: "",
  comment: "",
  rating: 0,
};
const ReviewPage = () => {
  const router = useRouter();
  const zustand = useStore();
  const queryClient = useQueryClient();
  const cachedStore = queryClient.getQueryData(["#reviewList"]);
  const { isLoading, setIsLoading, openAlert, setOpenAlert, open, setOpen } =
    zustand;
  const [data, setData] = useState([]);
  const [review, setReview] = useState(initData);
  const [filterPage, setFilterPage] = useState<Filter>(filterInit);
  const [keySearch, setKeySearch] = useState<string>("");

  const [itemDelete, setItemDelete] = useState({ name: "", _id: "" });
  const LoadData = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    GetAllReview(filterPage)
      .then((response) => {
        if (response.success) {
          setData(response.data);
          queryClient.setQueryData(["#reviewList"], () => {
            return response.data; // thêm mới
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleSaveReview = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    SaveReview(review)
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
  const handleUpdateReview = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    UpdateReview(review._id, review)
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
    DeleteReview(id, {}).then((res) => {
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
    review._id.length > 0 ? handleUpdateReview() : handleSaveReview();
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
    columnHelper.accessor("userName", {
      header: (info) => <DefaultHeader info={info} name="Name" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rating", {
      header: (info) => <DefaultHeader info={info} name="Rating" />,
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
              setReview(row.original);
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

  useEffect(() => {
    if (!isFirstLoad.current && !isEqual(filterPage, filterInit)) {
      LoadData();
    } else {
      cachedStore ? setData(cachedStore as any[]) : LoadData();
      isFirstLoad.current = false;
      return;
    }
    // Sau lần đầu tiên render
  }, [filterPage]);

  return (
    <>
      <Breadcrumb pageName="Reviews" />
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
              {review._id.length > 0 ? "Update Review" : "Add Review"}
            </DialogTitle>
            {/* <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription> */}
          </DialogHeader>
          <div className="">
            <HyperFormWrapper
              schema={reviewSchema}
              defaultValues={initData}
              onSubmit={(e) => {
                handleSubmit();
              }}
              className="mx-auto max-w-md"
            >
              <HD_Input
                title="Comment"
                name="rating"
                placeholder="Press rating"
                type="number"
                isItemForm={true}
                initValue={review.rating?.toString()}
                onChange={(value) =>
                  setReview({
                    ...review,
                    rating: parseInt(value),
                  })
                }
              />
              <HD_TextArea
                title="Comment"
                name="comment"
                placeholder="Press comment"
                type="text"
                isItemForm={true}
                initValue={review.comment}
                onChange={(value) =>
                  setReview({
                    ...review,
                    comment: value,
                  })
                }
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setReview(initData);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={() => {}}>
                  {review._id.length > 0 ? "Update" : "Add"}
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
      </div>
      <div className="space-y-10">
        {isLoading ? (
          <LottieComponent />
        ) : (
          <HyperTodoTable_v2
            datas={data}
            columns={columns}
            onRowDoubleClick={(item) => {
              setReview(item);
              setOpen(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ReviewPage;
