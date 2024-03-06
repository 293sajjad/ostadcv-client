import { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Auth from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { strongPassValidation } from "../utils/test";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

const Register = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const onFinish = (values: {
    username: string;
    password: string;
    email: string;
    name: string;
    familyName: string;
  }) => {
    setLoading(true);
    const url = import.meta.env.VITE_API_URL + "/api/auth/local/register";

    axios
      .post(url, {
        username: values.username,
        email: values.email,
        password: values.password,
        name: values.name,
        family: values.familyName,
      })
      .then((response) => {
        toast.success("ثبت نام موفقیت آمیز بود", {
          style: { direction: "rtl", fontFamily: "Rubik" },
        });

        setTimeout(() => {
          setCookie("token", response.data.jwt);
          navigate("/panel");
        }, 1200);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          toast.error("کاربری بااین ایمیل یانام کاربری ازقبل وجود دارد", {
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
    <Auth title="register" description="صفحه ثبت نام در سایت ostadcv">
      <Toaster position="top-center" reverseOrder={false} />
      <Form name="register-form" onFinish={onFinish} className="auth-form">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Link to={"/"}>
            <img src={logo} alt="" className="auth-logo" />
          </Link>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "!لطفا نام را خالی نگذارید" },
                { max: 10, message: "نام نمی تواند بیشتر از 10 کارکتر باشد" },
                { min: 3, message: "نام نمیتواند کمتر از 3 کارکتر باشد" },
              ]}
            >
              <Input placeholder="Name" className="auth-input" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="familyName"
              rules={[
                {
                  required: true,
                  message: "!لطفا نام خانوادگی را خالی نگذارید",
                },
                {
                  max: 25,
                  message: "نام خانوادگی نمی تواند بیشتر از 25 حرف باشد",
                },
                {
                  min: 3,
                  message: "نام خانوادگی نمی تواند کمتر از 3 حرف باشد",
                },
              ]}
            >
              <Input placeholder="Family Name" className="auth-input" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "!لطفا ایمیل را خالی نگذارید" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="em@il"
            className="auth-input"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "!لطفا نام کاربری را خالی نگذارید" },
            {
              max: 20,
              message: "نام کاربری نمی تواند بیشتر از 20 حرف باشد",
            },
            {
              min: 4,
              message: "نام کاربری نمی تواند کمتر از 4 حرف باشد",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="auth-input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ validator: strongPassValidation }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            className="auth-input"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="auth-button"
            style={{ fontFamily: "Rubik" }}
          >
            ثبت نام
          </Button>
        </Form.Item>
      </Form>
    </Auth>
  );
};

export default Register;
