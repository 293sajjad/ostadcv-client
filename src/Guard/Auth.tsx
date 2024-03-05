import { Cookies, useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const LoginOrRegister = () => {
  const [cookie] = useCookies(["token"]);

  return !cookie.token ? <Outlet /> : <Navigate to={"/"} />;
};

export const PanelAuth = () => {
  const cookie = new Cookies();
  console.log("step1", cookie.get("token"));

  return cookie.get("token") ? <Outlet /> : <Navigate to={"/auth/login"} />;
};
