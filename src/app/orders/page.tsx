import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderList from "./OrderList";

const OrderPage = () => {
  return (
    <>
      <Breadcrumb pageName="Orders" />
      <OrderList />
    </>
  );
};

export default OrderPage;
