import { MechanicsTable } from "../../components/mechanics-table/MechanicsTable";
import { Title } from "../Title";
import { GlobalContext } from "../../context/GlobalContext";
import { useState, useContext} from "react";

export function UserMechanics() {
  const { mechanicTypes } = useContext(GlobalContext);
  const [selectedMechanicType, setSelectedMechanicType] = useState("Visi");
  const [title, setTitle] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="My Mechanics listed" uri="/Mechanics/new" />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-6 col-sm-4 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setSelectedMechanicType(e.target.value)}
              >
                <option value="Visi">Visi</option>
                {mechanicTypes.map((jt) => (
                  <option key={jt} value={jt}>
                    {jt}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <MechanicsTable
            filterMechanicType={selectedMechanicType}
            filterTitle={title.toLowerCase()}
          />
        </div>
      </div>
    </div>
  )
}
