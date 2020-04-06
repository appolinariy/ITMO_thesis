import React from "react";
import SystemUsers from "./SystemUsers/SystemUsers";

const Adminka = ({ user }) => {
  const isAdmin = user.system_role;
  let tableForAdmin;

  if (isAdmin === "Администратор") {
    tableForAdmin = <SystemUsers />;
  }
  return <>{tableForAdmin}</>;
};

export default Adminka;
