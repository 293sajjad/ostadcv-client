import axios from "axios";
import { FC, ReactNode } from "react";
import { Cookies } from "react-cookie";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}

const Panel: FC<Props> = ({ children, title, description }) => {
  // eslint-disable-next-line prefer-const
  let navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookie = new Cookies();

  axios
    .get(import.meta.env.VITE_API_URL + "/api/users/me", {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("error", error);

      console.error("Error fetching user:", error);
      cookie.remove("token");
      navigate("/auth/login");
    });
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title> ostadcv Panel | {title}</title>
          <meta name="description" content={description} />
        </Helmet>
        {children}
      </HelmetProvider>
    </>
  );
};

export default Panel;
