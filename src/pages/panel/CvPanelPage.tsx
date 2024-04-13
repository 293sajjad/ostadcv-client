import ResumeForm from "../../components/myCvPanel";
import Panel from "../../layouts/PanelLayout";

const CvPanel = () => {
  return (
    <>
      <Panel title="myCv" description="ساخت رزومه در ostad cv">
        <ResumeForm />
      </Panel>
    </>
  );
};

export default CvPanel;
