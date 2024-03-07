import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
export const MenuItems = () => {
  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Option 3
        </Menu.Item>
      </Menu>
    </>
  );
};
