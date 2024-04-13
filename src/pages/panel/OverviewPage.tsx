import { useAtom } from "jotai";
import Panel from "../../layouts/PanelLayout";
import { CardBox } from "../../components/PanelOverviewComponent";
import { authInfo } from "../../utils/store";

const Overview = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, _setState] = useAtom(authInfo);

  return (
    <>
      <Panel title="overview" description="صفحه ابتدایی ادمین پنل ostadcv">
        <div
          style={{ padding: "24px", display: "flex", justifyContent: "center" }}
        >
          <CardBox
            id={state.authInfo.id}
            username={state.authInfo.username}
            email={state.authInfo.email}
            provider={state.authInfo.provider}
            confirmed={state.authInfo.confirmed}
            blocked={state.authInfo.blocked}
            createdAt={state.authInfo.createdAt}
            updatedAt={state.authInfo.updatedAt}
            name={state.authInfo.name}
            family={state.authInfo.family}
            googel_scolar={state.authInfo.googel_scolar}
            access={state.authInfo.access}
            college={state.authInfo.college}
            science_ranking={state.authInfo.science_ranking}
            phone={state.authInfo.phone}
            office={state.authInfo.office}
            website={state.authInfo.website}
            avatar={state.authInfo.avatar}
          />
        </div>
      </Panel>
    </>
  );
};

export default Overview;
