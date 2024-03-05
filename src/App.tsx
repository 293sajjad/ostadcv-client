import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { LoginOrRegister } from "./Guard/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/auth" element={<LoginOrRegister />}>
          <Route path="login" Component={Login} />
          <Route path="register" Component={Register} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
