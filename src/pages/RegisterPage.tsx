import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Auth from "../layouts/AuthLayout";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: {
    username: string;
    password: string;
    email: string;
  }) => {
    setLoading(true);
    // Simulating login process, replace with actual login logic
    setTimeout(() => {
      console.log("Received values:OK", values);
      setLoading(false);
    }, 1000);
  };

  return (
    <Auth title="register" description="صفحه ثبت نام در سایت ostadcv">
      <Form name="register-form" onFinish={onFinish} className="auth-form">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Link to={"/"}>
            <img src={logo} alt="" className="auth-logo" />
          </Link>
        </div>
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
          rules={[
            { required: true, message: "!لطفا رمز ورود را خالی نگذارید" },
          ]}
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
