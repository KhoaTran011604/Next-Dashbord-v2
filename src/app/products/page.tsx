import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductList from "./ProductList";

const ProductPage = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />
      <ProductList />
    </>
  );
};

export default ProductPage;
