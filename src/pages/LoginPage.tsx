import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Auth from "../layouts/AuthLayout";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["token"]);

  const onFinish = (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    setLoading(true);
    const url = import.meta.env.VITE_API_URL + "/api/auth/local";

    axios
      .post(url, {
        identifier: values.username,
        password: values.password,
      })
      .then((response) => {
        toast.success("ورود موفقیت آمیز بود", {
          style: { direction: "rtl", fontFamily: "Rubik" },
        });

        if (values.remember) {
          localStorage.setItem("identifier", values.username);
          localStorage.setItem("password", values.password);
        }
        setTimeout(() => {
          setCookie("token", response.data.jwt);
        }, 1400);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          toast.error("اطلاعات وارد شده اشتباه است", {
            style: { direction: "rtl", fontFamily: "Rubik" },
          });
        } else {
          toast.error("خطای ناشناخته", {
            style: { direction: "rtl", fontFamily: "Rubik" },
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Auth title="login" description="صفحه ورود به سایت ostadcv">
      <Toaster position="top-center" reverseOrder={false} />
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="auth-form"
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Link to={"/"}>
            <img src={logo} alt="" className="auth-logo" />
          </Link>
        </div>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: "!لطفا نام کاربری را خالی نگذارید" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username or Email"
            className="auth-input"
            defaultValue={localStorage.getItem("identifier") ?? ""}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "!لطفا رمز ورود را خالی نگذارید" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            className="auth-input"
            defaultValue={localStorage.getItem("password") ?? ""}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox
              style={{
                fontWeight: "bold",
                fontFamily: "Rubik",
                color: "#524E49",
              }}
              checked={false}
            >
              به یادداشتن
            </Checkbox>
          </Form.Item>

          <a
            className="auth-forgot"
            href="/"
            style={{ fontWeight: "bold", fontFamily: "Rubik" }}
          >
            فراموشی رمز
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="auth-button"
            style={{ fontFamily: "Rubik" }}
          >
            ورود
          </Button>
        </Form.Item>
      </Form>
    </Auth>
  );
};

export default Login;
