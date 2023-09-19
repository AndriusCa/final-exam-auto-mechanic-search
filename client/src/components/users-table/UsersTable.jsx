import { useState, useEffect } from "react";
import { formatDate } from "../../lib/formatDate";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function UsersTable() {
  const [users, setUsers] = useState([]);
  const { email } = useContext(GlobalContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setUsers(data.list)
        }
      })
      .catch(console.error);
  }, [])

  function handleStatusChange(email, status) {
    fetch("http://localhost:3001/api/users/" + email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ newStatus: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setUsers((pre) =>
            pre.map((user) =>
              user.email === email ? { ...user, is_blocked: status } : user
            )
          )
        }
      })
      .catch(console.error)
  }

  const Blokuoti = ({ userEmail }) => (
    <button
      onClick={() => handleStatusChange(userEmail, true)}
      className="btn btn-outline-danger btn-sm"
      disabled={email === userEmail}
    >
      Blokuoti
    </button>
  )
  const Atblokuoti = ({ userEmail }) => (
    <button
      onClick={() => handleStatusChange(userEmail, false)}
      className="btn btn-outline-primary btn-sm"
    >
      Atblokuoti
    </button>
  )

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Vardas</th>
            <th scope="col">El. pašto adresas</th>
            <th scope="col">Rolė</th>
            <th scope="col">Statusas</th>
            <th scope="col">Registruotas</th>
            <th className="text-end" scope="col">
              Veiksmas
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.email}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.is_blocked ? (
                  <span className="badge text-bg-danger rounded-pill">
                    Uzblokuotas
                  </span>
                ) : (
                  <span className="badge text-bg-success rounded-pill">
                    Aktyvus
                  </span>
                )}
              </td>
              <td>{formatDate(user.created)}</td>
              <td className="d-flex gap-2 justify-content-end">
                {user.is_blocked ? (
                  <Atblokuoti userEmail={user.email} />
                ) : (
                  <Blokuoti userEmail={user.email} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
