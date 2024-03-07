/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Spin, Layout } from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Cookies } from "react-cookie";
import axios from "axios";
import { authInfo } from "../utils/store";
import { MenuItems } from "../components/Sidebar";
import { LoadingScreen } from "../components/Load";

const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}

const Panel: React.FC<Props> = ({ children, title, description }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [_state, setState] = useAtom(authInfo);
  const cookie = new Cookies();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me?populate=avatar", {
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
    <HelmetProvider>
      <Helmet>
        <title> ostadcv Panel | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="logo" />
          <MenuItems />
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {loading ? <LoadingScreen /> : children}
          </Content>
        </Layout>
      </Layout>
    </HelmetProvider>
  );
};

export default Panel;
