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

export function InvoiceTable() {
  //const data = await getInvoiceTableData();
  const router = useRouter();
  const [keySearch, setKeySearch] = useState("");
  const [data, setData] = useState([]);
  const LoadData = async () => {
    const res = await getInvoiceTableData();
    setData(res);
  };
  useEffect(() => {
    LoadData();
  }, []);
  const handleSubmit = () => {};
  return (
    <div>
      <div className="flex justify-between items-center">
        <HD_Input
          name="search"
          placeholder="Search..."
          title=""
          iconPosition="left"
          icon={<SearchIcon />}
          initValue={keySearch}
          onChange={setKeySearch}
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="my-2 px-4 py-2 bg-black text-white rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[155px] xl:pl-7.5">Image</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                  <Image
                    src={"/images/product/product-01.png"}
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
                    ${item.price}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">
                    {/* {dayjs(item.date).format("MMM DD, YYYY")} */}
                    11/11/2020
                  </p>
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      {
                        "bg-[#219653]/[0.08] text-[#219653]":
                          item.status === "Paid",
                        "bg-[#D34053]/[0.08] text-[#D34053]":
                          item.status === "Unpaid",
                        "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                          item.status === "Pending",
                      }
                    )}
                  >
                    {item.status}
                  </div>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-between gap-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => router.push(`/products/${index}`)}
                    >
                      <span className="sr-only">View Invoice</span>
                      <PreviewIcon />
                    </button>

                    <button className="hover:text-primary">
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
