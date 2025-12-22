import { useState } from "react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setLimit } from "@/app/features/Todos/todosSlice";

function PagesRows() {
  const [rows, setRows] = useState(5);
  const dispatch = useDispatch();
  return (
    <div className="flex  items-center gap-2 ">
      <span className="block text-sm text-gray-500">Rows per page:</span>
      <Input
        type="number"
        max={10}
        min={1}
        defaultValue={5}
        value={rows}
        onChange={(e) => {
          setRows(Number(e.target.value));
          dispatch(setLimit(Number(e.target.value)));
        }}
        placeholder="10"
        className="w-fit text-center bg-white"
      />
    </div>
  );
}

export default PagesRows;
