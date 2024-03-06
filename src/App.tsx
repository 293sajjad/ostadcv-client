import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { LoginOrRegister, PanelAuth } from "./Guard/Auth";
import { OverviewPanel, SettingPanel } from "./pages/PanelPage";

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
          <Route path="" Component={OverviewPanel} />
          <Route path="setting" Component={SettingPanel} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
