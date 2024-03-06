import axios from "axios";
import { useAtom } from "jotai";
import { FC, ReactNode, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { authInfo } from "../utils/store";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}

const Panel: FC<Props> = ({ children, title, description }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useAtom(authInfo);
  const cookie = new Cookies();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      })
      .then((response) => {
        setState({ singin: true, authInfo: response.data });
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        console.error("Error fetching user:", error);
        cookie.remove("token");
        navigate("/auth/login");
      });
  }, []); // Run only once when component mounts

  return (
    <>
      {loading ? (
        // Show loading indicator or any placeholder until data is fetched
        <div>Loading...</div>
      ) : (
        <HelmetProvider>
          <Helmet>
            <title> ostadcv Panel | {title}</title>
            <meta name="description" content={description} />
          </Helmet>
          {children}
        </HelmetProvider>
      )}
    </>
  );
};

export default Panel;
