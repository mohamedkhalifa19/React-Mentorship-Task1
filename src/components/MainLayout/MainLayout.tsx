import PagesRows from "../PagesRows/PagesRows";
import StatusActions from "../StatusActions/StatusActions";

function MainLayout() {
  return (
    <div
      className="flex items-center justify-center "
      style={{ margin: "1rem" }}>
      <div className="container flex justify-between items-center ">
        <StatusActions />
        <PagesRows />
      </div>
    </div>
  );
}

export default MainLayout;
