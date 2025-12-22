import { useSelector } from "react-redux";
import { PaginationDemo } from "../Pagination/PaginationDemo";

function Footer() {
  const { total, skip, limit } = useSelector((state: any) => state.todos);
  return (
    <div
      className="flex justify-between items-center  gap-2"
      style={{ padding: "1rem" }}>
      <div>
        <p className="text-gray-400 font-medium">
          Showing of{"  "}
          <span className="text-black font-bold">
            {skip + 1}-{limit + skip}
          </span>
          {"    "}
          of {"    "}
          <span className="text-black font-bold">{total}</span> results
        </p>
      </div>
      <PaginationDemo />
    </div>
  );
}

export default Footer;
