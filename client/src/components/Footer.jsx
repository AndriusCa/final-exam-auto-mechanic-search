// import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <footer className="py-5">
        <div className="row">
          <div className="col-md-4 offset-md-4 mb-3">
            <form>
              <h5>Užsiprenumeruokite mūsų naujienlaiškį</h5>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Jūsų el. pašto adresas"
                />
                <button className="btn btn-primary" type="button">
                  Prenumeruoti
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>Visos teisės saugomos © {currentYear}</p>
        </div>
      </footer>
    </div>
  );
}
