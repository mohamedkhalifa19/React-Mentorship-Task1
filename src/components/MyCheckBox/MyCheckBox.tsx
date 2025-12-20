import { useDispatch } from "react-redux";
import { Checkbox } from "../ui/checkbox";
import { editTodos } from "@/app/features/Todos/todosSlice";
interface IProps {
  row: any;
}
function MyCheckBox({ row }: IProps) {
  const dispatch = useDispatch();
  const { completed } = row.original;
  return (
    <Checkbox
      className="cursor-pointer "
      defaultChecked={completed}
      onCheckedChange={async (value: boolean) => {
        const { id } = row.original;
        dispatch(editTodos({ ...row.original, completed: value }));
        const res = await fetch(`https://dummyjson.com/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...row.original, completed: value }),
        });
        console.log(await res.json());
      }}
    />
  );
}

export default MyCheckBox;
