import { setFilter, setTodos } from "@/app/features/Todos/todosSlice";
import type { Todo } from "@/Types/Types";

import { useDispatch, useSelector } from "react-redux";
type statusAction = "pending" | "all" | "completed";
interface IProps {
  status: statusAction;
}
function StatusAction({ status }: IProps) {
  const filter = useSelector((state: any) => state.todos.filter);
  console.log(filter);
  const dispatch = useDispatch();
  return (
    <div
      className="status-box rounded-lg"
      onClick={() => dispatch(setFilter(status))}>
      <input
        type="radio"
        name="status"
        className=" w-fit  hidden"
        id={`${status}-act`}
        defaultChecked={status === "all"}
      />
      <label htmlFor={`${status}-act`}>{status}</label>
    </div>
  );
}

export default StatusAction;
