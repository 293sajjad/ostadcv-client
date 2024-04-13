import { Menu } from "antd";
import { UserOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons";
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
          اطلاعات استاد
        </Menu.Item>
        <Menu.Item key="/panel/myCv" icon={<BookOutlined />}>
          <Link to="/panel/myCv" />
          رزومه من
        </Menu.Item>
        <Menu.Item key="/panel/setting" icon={<SettingOutlined />}>
          <Link to="/panel/setting" />
          تنظیمات
        </Menu.Item>
      </Menu>
    </>
  );
};
