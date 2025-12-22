import { X } from "lucide-react";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { delTodo } from "@/app/features/Todos/todosSlice";
import { MyModal } from "../MyModal/MyModal";
import type { Todo } from "@/Types/Types";
interface IProps {
  isDelOpen: boolean;
  openEditModal: () => void;
  closeDelModal: () => void;
  todo?: Todo;
}

function DelTodo({ closeDelModal, isDelOpen, todo }: IProps) {
  const [status, setStatus] = useState("pending");
  const [desc, setDesc] = useState(todo?.todo);
  const [id, setID] = useState<number>(Number(todo?.userId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!todo) return;
    setDesc(todo.todo);
    setID(todo.userId);
    setStatus(`${todo?.completed ? "completed" : "pending"}`);
  }, [todo]);
  return (
    <MyModal isOpen={isDelOpen}>
      <AlertDialogContent style={{ padding: "1rem" }}>
        <AlertDialogHeader>
          <div className="flex items-center justify-between border-b">
            <div>
              <AlertDialogTitle className="text-red-700">
                Delete this Todo
              </AlertDialogTitle>
            </div>
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={closeDelModal}>
              <X />
            </Button>
          </div>
          <AlertDialogDescription className="p-2  flex flex-col gap-4">
            <p>Are you sure you want to delete this todo?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex space-x-2">
          <Button
            onClick={closeDelModal}
            variant={"outline"}
            className="w-fit cursor-pointer rounded-3xl hover:bg-black hover:text-white"
            style={{ padding: "1rem 2rem" }}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await fetch(`https://dummyjson.com/todos/${todo?.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }).then((res) => {
                if (res.status === 200) {
                  console.log(res.json());
                  dispatch(
                    delTodo({
                      userId: id,
                      completed: status === "completed",
                      todo: desc || "",
                    })
                  );
                  closeDelModal();
                  toast.success("Todo Deleted Successfuly ✅");
                }
              });
            }}
            className="w-fit cursor-pointer rounded-3xl bg-red-700"
            style={{ padding: "1rem 2rem" }}>
            Delete Task
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </MyModal>
  );
}

export default DelTodo;
