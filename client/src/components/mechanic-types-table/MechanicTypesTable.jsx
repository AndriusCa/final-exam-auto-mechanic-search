import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function MechanicTypesTable() {
  const { mechanicTypes, deleteMechanicType } = useContext(GlobalContext);

  function deleteMechanicTypeHandler(title) {
    fetch("http://localhost:3001/api/mechanic-types/" + title, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          deleteMechanicType(title);
        }
      })
      .catch(console.error)
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipas</th>
            <th className="text-end" scope="col">
              Veiksmas
            </th>
          </tr>
        </thead>
        <tbody>
          {mechanicTypes.map((mechanicType, index) => (
            <tr key={mechanicType}>
              <td>{index + 1}</td>
              <td>{mechanicType}</td>
              <td className="d-flex gap-2 justify-content-end">
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/mechanic-types/${mechanicType}/edit`}
                >
                  Redaguoti
                </Link>
                <button
                  onClick={() => deleteMechanicTypeHandler(mechanicType)}
                  className="btn btn-danger btn-sm"
                  type="button"
                >
                  Ištrinti
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
