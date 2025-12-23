import { useSelector } from "react-redux";
import { PaginationDemo } from "../Pagination/PaginationDemo";
import { Skeleton } from "../ui/skeleton";

function Footer() {
  const { total, skip, limit, todos } = useSelector(
    (state: any) => state.todos
  );
  console.log(todos);
  return (
    <div
      className="flex justify-between items-center  gap-2"
      style={{ padding: "1rem" }}>
      {todos.length ? (
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
      ) : (
        <Skeleton className="w-150 h-6 bg-[#ddd]" style={{ margin: "1rem" }} />
      )}

      <PaginationDemo />
    </div>
  );
}

export default Footer;
