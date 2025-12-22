import { X } from "lucide-react";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editTodos } from "@/app/features/Todos/todosSlice";
import { MyModal } from "../MyModal/MyModal";
import type { Todo } from "@/Types/Types";
import { useForm, type SubmitHandler } from "react-hook-form";
interface IProps {
  isEditOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  todo?: Todo;
}
interface IInputs {
  description: string;
  Status: boolean;
}
function EditTodo({ closeEditModal, isEditOpen, todo }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();

  const dispatch = useDispatch();

  const onSubmitHandler: SubmitHandler<IInputs> = async (data) => {
    console.log(data);
    console.log("Errors");
    console.log(String(data.Status) === "completed");
    await fetch(`https://dummyjson.com/todos/${todo?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: Number(todo?.userId),
        todo: data.description,
        completed: String(data.Status) === "completed",
      }),
    }).then((res) => {
      if (res.status === 200) {
        dispatch(
          editTodos({
            userId: todo?.userId || 0,
            completed: String(data.Status) === "completed",
            todo: data.description || "",
          })
        );
        closeEditModal();
        toast("Todo Edited Successfuly ✅");
      }
    });
  };
  return (
    <MyModal isOpen={isEditOpen}>
      <AlertDialogContent style={{ padding: "1rem" }}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmitHandler)}
          className="space-y-2">
          <AlertDialogHeader>
            <div className="flex items-center justify-between border-b">
              <div>
                <AlertDialogTitle>Add New Task</AlertDialogTitle>
                <span className="text-[.8rem] text-gray-400">
                  Create a new task for your team
                </span>
              </div>
              <Button
                variant={"ghost"}
                className="cursor-pointer"
                onClick={closeEditModal}>
                <X />
              </Button>
            </div>
            <AlertDialogDescription className="p-2  flex flex-col gap-4">
              <div className="text-[1rem] flex flex-col gap-2 overflow-hidden">
                <Label htmlFor="task-desc" className="font-bold text-black">
                  Task description
                </Label>
                <Textarea
                  style={{
                    padding: "1rem",
                    resize: "none",
                    width: "450px",
                  }}
                  {...register("description", {
                    required: true,
                    value: todo?.todo,
                  })}
                  defaultValue={todo?.todo}
                  id="task-desc"
                  placeholder="Task Description ..."
                />
                {!errors.description ? (
                  <p className="text-muted-foreground text-sm">
                    Brefiely describe what you need
                  </p>
                ) : (
                  <p className="text-sm text-red-700">
                    Description is required
                  </p>
                )}
              </div>
              <div className="text-[1rem] flex flex-col gap-2 overflow-hidden">
                <Label htmlFor="task-desc" className="font-bold text-black">
                  Assigne (User ID)
                </Label>
                <Input
                  type="text"
                  value={todo?.userId}
                  disabled
                  placeholder="User ID"
                  style={{ padding: "1.2rem" }}
                />
              </div>
              <div>
                <Label className="font-bold text-black">Initial Status</Label>
                <div className="inputs-container flex items-center gap-3">
                  <div className="initial-status-box  rounded-lg w-full">
                    <input
                      type="radio"
                      value={"pending"}
                      defaultChecked={!todo?.completed}
                      {...register("Status", {
                        required: true,
                      })}
                      className=" w-fit  hidden"
                      id="pending"
                    />
                    <label htmlFor={"pending"}>pending</label>
                  </div>
                  <div className="initial-status-box rounded-lg w-full">
                    <Input
                      type="radio"
                      value={"completed"}
                      defaultChecked={todo?.completed}
                      {...register("Status", {
                        required: true,
                      })}
                      className=" w-fit  hidden"
                      id="completed"
                    />
                    <label htmlFor={"completed"}>completed</label>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter
            className="flex space-x-2 mt-2 "
            style={{ marginTop: "1.5rem" }}>
            <Button
              onClick={closeEditModal}
              variant={"outline"}
              className="w-fit cursor-pointer rounded-3xl hover:bg-black hover:text-white"
              style={{ padding: "1rem 2rem" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-fit cursor-pointer rounded-3xl bg-violet-700"
              style={{ padding: "1rem 2rem" }}>
              Edit Task
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </MyModal>
  );
}

export default EditTodo;
