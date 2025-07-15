import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/styles/lib/utils";

import { getInvoiceTableData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";
import { SearchIcon, TrashIcon } from "assets/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HD_Input from "../common/HD_Input";
import { ProductStatus } from "enum/productEnum";
import { HD_TableProps } from "types/MainType";

export function HD_Table({
  dataInit,
  viewCallback,
  deleteCallback,
}: HD_TableProps) {
  const router = useRouter();
  const [keySearch, setKeySearch] = useState("");
  const [data, setData] = useState([]);
  // const LoadData = async () => {
  //   const res = await getInvoiceTableData();
  //   setData(res);
  // };
  // console.log("dataInit", dataInit);

  // useEffect(() => {
  //   LoadData();
  // }, []);
  useEffect(() => {
    setData(dataInit);
  }, [dataInit]);
  const handleSubmit = () => {};

  return (
    <div>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-transparent dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-gray-700 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[155px] xl:pl-7.5">Info</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-gray-700"
                onDoubleClick={() => viewCallback(item._id)}
              >
                <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                  <img
                    src={
                      item.images.length > 0
                        ? item.images[0].imageAbsolutePath
                        : "/images/empty.png"
                    }
                    loading="lazy"
                    className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                    width={60}
                    height={50}
                    alt={"Image for product " + item.name}
                    role="presentation"
                  />
                  <div>{item.name}</div>
                </TableCell>
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{item.name}</h5>
                  <p className="mt-[3px] text-body-sm font-medium">
                    {`${item.price} VNĐ`}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">
                    {/* {dayjs(item.date).format("MMM DD, YYYY")} */}
                    {item.categoryId}
                  </p>
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      {
                        "bg-[#219653]/[0.08] text-[#219653]":
                          item.status === ProductStatus.inStock,
                        "bg-[#D34053]/[0.08] text-[#D34053]":
                          item.status === ProductStatus.outOfStock,
                        "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                          item.status === ProductStatus.pending,
                      }
                    )}
                  >
                    {item.status}
                  </div>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => viewCallback(item._id)}
                    >
                      <span className="sr-only">View Invoice</span>
                      <PreviewIcon />
                    </button>

                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        deleteCallback({
                          _id: item._id,
                          name: item.name,
                        });
                      }}
                    >
                      <span className="sr-only">Delete Invoice</span>
                      <TrashIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
