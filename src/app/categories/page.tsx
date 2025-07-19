import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CategoryList from "./categoryList";
const CategoryPage = () => {
  return (
    <>
      <Breadcrumb pageName="Categories" />
      <CategoryList />
    </>
  );
};

export default CategoryPage;
