import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export function Header() {
  const { role, updateEmail, updateFullname, updateLoginStatus, updateRole } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  function logMeOut() {
    fetch("http://localhost:3001/api/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        updateLoginStatus(false)
        updateEmail("")
        updateFullname("")
        updateRole("public")
        navigate("/")
      })
      .catch(console.error)
  }

  const publicLinks = (
    <>
      <div className="dropdown text-end">
        <div className="text-end">
          <Link to="Login" className="btn btn-primary me-2">
            Prisijungti
          </Link>
          <Link to="Register" className="btn btn-primary">
            Registruotis
          </Link>
        </div>
      </div>
    </>
  )

  const adminLinks = (
    <>
      <div className="dropdown text-end">
        <div className="text-end">
          <Link to="/dashboard" className="btn btn-primary me-2">
            Darbalaukis
          </Link>
          <Link to="/users" className="btn btn-primary me-2">
            Vartotojai
          </Link>
          <Link to="/mechanics" className="btn btn-primary me-2">
            Meistrai
          </Link>
          <Link to="/mechanic-types" className="btn btn-primary me-2">
            Tipai
          </Link>
          <button onClick={logMeOut} className="btn btn-primary" type="button">
            Atsijungti
          </button>
        </div>
      </div>
    </>
  )

  const userLinks = (
    <>
      <div className="dropdown text-end">
        <div className="text-end">
          <Link to="/dashboard" className="btn btn-primary me-2">
            Darbalaukis
          </Link>
          <Link to="/mechanics" className="btn btn-primary me-2">
            Meistrai
          </Link>
          <button onClick={logMeOut} className="btn btn-primary" type="button">
            Atsijungti
          </button>
        </div>
      </div>
    </>
  )

  let extraLinks = <></>
  if (role === "admin") {
    extraLinks = adminLinks
  } else if (role === "user") {
    extraLinks = userLinks
  } else {
    extraLinks = publicLinks
  }

  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            ></Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 link-secondary">
                  Pagrindinis
                </Link>
              </li>
            </ul>
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control"
                placeholder="Paieška..."
                aria-label="Search"
                autoComplete="on"
              />
            </form>
            <div>{extraLinks}</div>
          </div>
        </div>
      </header>
    </>
  );
}
