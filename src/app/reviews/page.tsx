import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReviewList from "./ReviewList";

const ReviewPage = () => {
  return (
    <>
      <Breadcrumb pageName="Reviews" />
      <ReviewList />
    </>
  );
};

export default ReviewPage;
