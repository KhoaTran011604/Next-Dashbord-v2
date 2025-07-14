"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useParams } from "next/navigation";

const ProductDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  return (
    <div>
      <Breadcrumb pageName="Product Detail" />
      <div>{`Product Detail Page - ID: ${id}`}</div>
    </div>
  );
};

export default ProductDetailPage;
