import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
export const MenuItems = () => {
  return (
    <>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        mode="inline"
        style={{ fontFamily: "Rubik" }}
      >
        <Menu.Item key="/panel" icon={<UserOutlined />}>
          <Link to="/panel" />
          اطلاعات اوستاد
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="/panel/setting" icon={<UploadOutlined />}>
          <Link to="/panel/setting" />
          Option 3
        </Menu.Item>
      </Menu>
    </>
  );
};
