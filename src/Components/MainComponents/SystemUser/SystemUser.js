import React from "react";
import "./SystemUser.css";
import UserInfo from "./UserInfo/UserInfo";
import UsersFilial from "./FilialUser/FilialUser";

const SystemUser = ({ user }) => {
  const isAdmin = user.system_role;
  let tableForAdmin;

  if (isAdmin === "Администратор") {
    tableForAdmin = <UsersFilial />;
  }
  return (
    <>
      <UserInfo id_user={user.id_user} />
      {tableForAdmin}
    </>
  );
};

export default SystemUser;
