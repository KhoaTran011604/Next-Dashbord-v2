"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

const ProductPage = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="space-y-10">
        <InvoiceTable />
      </div>
    </>
  );
};

export default ProductPage;
