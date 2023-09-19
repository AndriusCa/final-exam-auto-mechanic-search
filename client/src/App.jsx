import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from "./layout/PublicLayout";
import { UserLayout } from "./layout/UserLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Users } from "./pages/users/Users";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { AdminMechanicsTypes } from "./pages/mechanic-types/AdminMechanicsTypes";
import { AdminNewMechanicType } from "./pages/mechanic-types/AdminNewMechanicType";
import { AdminEditMechanicType } from "./pages/mechanic-types/AdminEditMechanicType";
import { Mechanics } from "./pages/mechanics/Mechanics";


function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/mechanic-types" element={<AdminMechanicsTypes />}></Route>
            <Route path="/mechanic-types/new" element={<AdminNewMechanicType />}></Route>
            <Route
              path="/mechanic-types/:mechanicType/edit"
              element={<AdminEditMechanicType />}
            ></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/mechanics" element={<Mechanics />}></Route>
            {/* <Route path="/mechanics/new" element={<AddMechanic />}></Route>
            <Route path="/mechanics/:MechanicId/edit" element={<EditMechanic />}></Route> */}
          </Route>
          <Route Component={PublicLayout}>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  )
}

export default App;
