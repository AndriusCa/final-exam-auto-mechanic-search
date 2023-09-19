
import { Mechanics } from "../pages/mechanics/Mechanics";

export function Home() {
  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Meistrai</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <Mechanics />
      </div>
    </div>
  );
}
