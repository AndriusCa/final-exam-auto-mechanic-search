import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function MechanicsTable({ filterMechanicType, filterTitle }) {
  const { mechanics, updateMechanics } = useContext(GlobalContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/mechanics/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          updateMechanics(data.list);
        }
      })
      .catch(console.error);
  }, []);

  const imageStyle = {
    width: 100,
    height: 50,
    objectFit: "container",
    objectPosition:"center",
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Vardas</th>
            <th scope="col">Pavarde</th>
            <th scope="col">Miestas</th>
            <th scope="col">Tipas</th>
            <th className="text-end" scope="col">
              Veiksmas
            </th>
          </tr>
        </thead>
        <tbody>
          {mechanics
            .filter(mechanic =>
              filterMechanicType === "Visi" ? true : mechanic.mechanicType === filterMechanicType
          )
            .filter(mechanic => filterTitle === "" ? true : mechanic.title.toLowerCase().includes(filterTitle))
            .map((mechanic, index) => (
              <tr key={mechanic.title + index}>
                <td>{index + 1}</td>
                <td>
                  <img style={imageStyle} src={mechanic.image} alt="mechanic" />
                </td>
                <td>{mechanic.title}</td>
                <td>{mechanic.price}</td>
                <td>{mechanic.location}</td>
                <th>{mechanic.mechanicType}</th>
                <td>
                  <div className="d-flex gap-2 justify-content-end">
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/Mechanics/${mechanic.title}/edit`}
                    >
                      Edit
                    </Link>
                    {/* <button
                          onClick={() => deletemechanicHandler(mechanic)}
                          className="btn btn-danger btn-sm"
                          type="button"
                        >
                          Delete
                        </button> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
