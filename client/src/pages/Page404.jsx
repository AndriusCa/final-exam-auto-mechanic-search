import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div className="container">
      <div className="row">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-1 fw-bold text-body-emphasis">404</h1>
          <h2 className="h4">Puslapis nerastas...</h2>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Puslapis kurio ieškojote neegzistuoja.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/" className="btn btn-primary btn-lg px-4 gap-3">
                Pagrindinis puslapis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
