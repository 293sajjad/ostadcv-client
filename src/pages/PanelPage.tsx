import { Button } from "antd";
import Panel from "../layouts/PanelLayout";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { authInfo } from "../utils/store";

export const OverviewPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useAtom(authInfo);
  return (
    <>
      <Panel title="overview" description="صفحه ابتدایی ادمین پنل ostadcv">
        <h1>this is overview {state.authInfo.username}</h1>
      </Panel>
    </>
  );
};

export const SettingPanel = () => {
  return (
    <>
      <Panel title="overview" description="صفحه ابتدایی ادمین پنل ostadcv">
        <h1>this is Setting</h1>
        <Button>
          <Link to={"/panel"}>overview</Link>
        </Button>
      </Panel>
    </>
  );
};
