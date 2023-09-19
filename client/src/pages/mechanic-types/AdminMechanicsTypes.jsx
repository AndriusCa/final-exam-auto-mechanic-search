import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { MechanicTypesTable } from "../../components/mechanic-types-table/MechanicTypesTable";
import { Title } from "../Title";

export function AdminMechanicsTypes() {

  const { role } = useContext(GlobalContext);

    if (role !== "admin") {
      return <Forbiden />;
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Specializacijos tipai" uri="/mechanic-types/new" />
        </div>
        <div className="col-12"><MechanicTypesTable /></div>
      </div>
    </div>
  )
}