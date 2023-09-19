import { Link, useNavigate } from "react-router-dom";
import style from "./Auth.module.css";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const [fullnameValid, setFullnameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [repass, setRepass] = useState("");
  const [repassErr, setRepassErr] = useState("");
  const [repassValid, setRepassValid] = useState(false);

  function updateFullname(e) {
    setFullname(e.target.value);
  }

  function updateEmail(e) {
    setEmail(e.target.value);
  }

  function updatePass(e) {
    setPass(e.target.value);
  }

  function updateRepass(e) {
    setRepass(e.target.value);
  }

  function isValidFullname() {
    const minFullnameSize = 2;

    if (fullname.length < minFullnameSize) {
      setFullnameErr(
        `Vardas per trumpas. Minimum ${minFullnameSize} simbloliai.`
      )
      setFullnameValid(false);
    } else {
      setFullnameErr(false);
      setFullnameValid(true);
    }
  }

  function isValidEmail() {
    const minEmailSize = 6;

    if (email.length < minEmailSize) {
      setEmailErr(
        `El. pašto adresas per trumpas. Minimum ${minEmailSize} simboliai.`
      )
      setEmailValid(false);
    } else {
      setEmailErr(false);
      setEmailValid(true);
    }
  }

  function isValidPassword() {
    const minPassSize = 6;

    if (pass.length < minPassSize) {
      setPassErr(`Slaptažodis per trumpas. Minimum ${minPassSize} simboliai.`)
      setPassValid(false);
    } else {
      setPassErr(false);
      setPassValid(true);
    }
  }

  function isValidRepeatPassword() {
    if (pass !== repass) {
      setRepassErr("Passwords do not match.")
      setRepassValid(false);
    } else {
      setRepassErr(false);
      setRepassValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (fullnameValid && emailValid && passValid && repassValid) {
      fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "err-list") {
            for (const item of data.errors) {
              if (item.input === "fullname") {
                setFullnameErr(item.msg);
              }
              if (item.input === "email") {
                setEmailErr(item.msg);
              }
              if (item.input === "password") {
                setPassErr(item.msg);
              }
            }
          }
          if (data.status === "ok") {
            return navigate("/login");
          }
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className={`form-signin w-100 m-auto ${style.formSignin}`}>
      <form onSubmit={handleSubmit}>
        <h1 className="h1 mb-3 fw-normal">Registracija</h1>

        <div className="form-floating mb-3">
          <input
            onChange={updateFullname}
            onBlur={isValidFullname}
            type="text"
            id="fullname"
            className={`form-control ${fullnameErr ? "is-invalid" : ""} ${fullnameValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="fullname">Vardas, Pavardė</label>
          <div className="invalid-feedback">{fullnameErr}</div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={updateEmail}
            onBlur={isValidEmail}
            type="email"
            id="email"
            autoComplete="family-name"
            className={`form-control ${emailErr ? "is-invalid" : ""} ${emailValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="email">El. paštas</label>
          <div className="invalid-feedback">{emailErr}</div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={updatePass}
            onBlur={isValidPassword}
            type="password"
            id="password"
            autoComplete="off"
            className={`form-control ${passErr ? "is-invalid" : ""} ${passValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="password">Slaptažodis</label>
          <div className="invalid-feedback">{passErr}</div>
        </div>
        <div className="form-floating">
          <input
            onChange={updateRepass}
            onBlur={isValidRepeatPassword}
            type="password"
            id="repass"
            autoComplete="off"
            className={`form-control ${repassErr ? "is-invalid" : ""} ${repassValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="repass">Pakartokite slaptažodį</label>
          <div className="invalid-feedback">{repassErr}</div>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Sutikti su <Link to="/terms">Privatumo politika</Link>
          </label>
        </div>
        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={!fullnameValid || !emailValid || !passValid || !repassValid}
        >
          Registruotis
        </button>
        <p className="my-3 text-center text-body-secondary">or</p>
        <Link to="/login" className="btn btn-outline-primary w-100 py-2">
          Prisijungti
        </Link>
      </form>
    </div>
  );
}
