import { createContext, useEffect, useState } from "react";

export const initialContext = {
  loginStatus: false,
  updateLoginStatus: () => {},
  role: "public",
  updateRole: () => {},
  fullname: "",
  updateFullname: () => {},
  email: "",
  updateEmail: () => {},
  mechanicTypes: [],
  addMechanicType: () => {},
  deleteMechanicType: () => {},
  editMechanicType: () => {},
  updateMechanicTypes: () => {},
  mechanics: [],
  updateMechanics: () => {},
  steeringWheelSides: [],
}

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
  const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
  const [role, setRole] = useState(initialContext.role);
  const [fullname, setFullname] = useState(initialContext.fullname);
  const [email, setEmail] = useState(initialContext.email);
  const [mechanicTypes, setMechanicTypes] = useState(
    initialContext.mechanicTypes
  )
  const [mechanics, setMechanics] = useState(initialContext.mechanics)
  

  useEffect(() => {
    fetch("http://localhost:3001/api/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.user) {
          setLoginStatus(true);
          setRole(data.user.role);
          setFullname(data.user.fullname);
          setEmail(data.user.email);
        }
      })
      .catch(console.error)
  }, [])

  // Pradinis mechanic tipu masyvas
  useEffect(() => {
    fetch("http://localhost:3001/api/mechanic-types", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.list) {
          setMechanicTypes(data.list.map((t) => t.title))
        }
      })
      .catch(console.error)
  }, []);

  function updateLoginStatus(status) {
    setLoginStatus(status);
  }

  function updateRole(role) {
    const allowedRoles = ["public", "admin", "user"]
    if (allowedRoles.includes(role)) {
      setRole(role);
    }
  }

  function updateFullname(fullname) {
    setFullname(fullname);
  }

  function updateEmail(email) {
    setEmail(email)
  }

  function updateMechanicTypes(mechanicTypes) {
    setMechanicTypes(mechanicTypes)
  }

  function addMechanicType(mechanicType) {
    setMechanicTypes((pre) => [...pre, mechanicType])
  }

  function deleteMechanicType(mechanicType) {
    setMechanicTypes((pre) => pre.filter((title) => title !== mechanicType))
  }

  function editMechanicType(oldMechanicType, newMechanicType) {
    setMechanicTypes((pre) =>
      pre.map((title) =>
        title === oldMechanicType ? newMechanicType : title
      )
    )
  }

  function updateMechanics(mechanics) {
    setMechanics(mechanics)
  }

  const value = {
    loginStatus,
    updateLoginStatus,
    role,
    updateRole,
    fullname,
    updateFullname,
    email,
    updateEmail,
    mechanicTypes,
    addMechanicType,
    deleteMechanicType,
    editMechanicType,
    updateMechanicTypes,
    mechanics,
    updateMechanics,
  }

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
