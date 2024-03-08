import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { LoginOrRegister, PanelAuth } from "./Guard/Auth";
import Overview from "./pages/panel/OverviewPage";
import Setting from "./pages/panel/SettingPage";
import EditOverview from "./pages/panel/EditOverviewPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/auth" element={<LoginOrRegister />}>
          <Route path="login" Component={Login} />
          <Route path="register" Component={Register} />
        </Route>
        <Route path="/panel" element={<PanelAuth />}>
          <Route path="" Component={Overview} />
          <Route path="setting" Component={Setting} />
          <Route path="edit-overview" Component={EditOverview} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
