import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserList from "./UserList";

const UserPage = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />
      <UserList />
    </>
  );
};

export default UserPage;
