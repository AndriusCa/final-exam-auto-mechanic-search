import { useContext } from "react";
import { AdminMechanics } from "./AdminMechanics";
import { UserMechanics } from "./UserMechanics";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { PublicMechanics } from "./PublicMechanics";

export function Mechanics() {
  const { role } = useContext(GlobalContext);

  if (role === 'admin') {
    return <AdminMechanics />;
  }

  if (role === "User") {
    return <UserMechanics />
  }

  if (role === "public")
    return <PublicMechanics/>

  return <Forbiden/>;
}
