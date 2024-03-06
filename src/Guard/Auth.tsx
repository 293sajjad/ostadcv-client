import { Cookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
const cookie = new Cookies();
export const LoginOrRegister = () => {
  const token = cookie.get("token");

  return !token ? <Outlet /> : <Navigate to={"/"} />;
};

export const PanelAuth = () => {
  return cookie.get("token") ? <Outlet /> : <Navigate to={"/auth/login"} />;
};
