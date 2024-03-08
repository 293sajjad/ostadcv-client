import { Link } from "react-router-dom";
import Panel from "../../layouts/PanelLayout";
import { Button } from "antd";

const Setting = () => {
  return (
    <>
      <Panel title="setting" description="صفحه ابتدایی ادمین پنل ostadcv">
        <h1>this is Setting</h1>
        <Button>
          <Link to={"/panel"}>overview</Link>
        </Button>
      </Panel>
    </>
  );
};

export default Setting;
