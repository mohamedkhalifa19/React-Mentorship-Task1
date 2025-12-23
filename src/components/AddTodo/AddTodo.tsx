import { X } from "lucide-react";
import { MyModal } from "../MyModal/MyModal";
import "./AddTodo.css";
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
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addNewTodo } from "@/app/features/Todos/todosSlice";
import { useForm } from "react-hook-form";
interface IProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
interface IInputs {
  description: string;
  Status: boolean;
  id: number;
}
function AddTodo({ isOpen, closeModal }: IProps) {
  const [status, setStatus] = useState("pending");
  const [desc, setDesc] = useState("");
  const [id, setID] = useState<number>(0);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IInputs>();
  const onSubmitHandler = async (data: IInputs) => {
    await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: Number(data.id),
        todo: data.description,
        completed: data.Status,
      }),
    }).then((res) => {
      if (res.status === 201) {
        dispatch(
          addNewTodo({
            userId: data.id,
            completed: data.Status,
            todo: data.description,
          })
        );
        reset();
        closeModal();
        toast("Todo added Successfuly ✅");
      }
    });
  };
  return (
    <MyModal isOpen={isOpen} className="p-2">
      {" "}
      <AlertDialogContent style={{ padding: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                onClick={closeModal}>
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
                  {...register("description", { required: true })}
                  id="task-desc"
                  placeholder="Task Description ..."
                />
                {errors.description ? (
                  <p className="text-red-700">Description is required</p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Brefiely describe what you need
                  </p>
                )}
              </div>
              <div className="text-[1rem] flex flex-col gap-2 overflow-hidden">
                <Label htmlFor="task-desc" className="font-bold text-black">
                  Assigne (User ID)
                </Label>
                <Input
                  type="text"
                  placeholder="User ID"
                  {...register("id", { required: true })}
                  style={{ padding: "1.2rem" }}
                />
                {errors.id ? (
                  <p className="text-red-700">Id is required</p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <Label className="font-bold text-black">Initial Status</Label>
                <div className="inputs-container flex items-center gap-3">
                  <div className="initial-status-box  rounded-lg w-full">
                    <input
                      type="radio"
                      {...register("Status", { required: true })}
                      className=" w-fit  hidden"
                      id="pending"
                    />
                    <label htmlFor={"pending"}>pending</label>
                  </div>
                  <div
                    className="initial-status-box rounded-lg w-full"
                    onClick={() => setStatus("completed")}>
                    <Input
                      type="radio"
                      {...register("Status", { required: true })}
                      className=" w-fit  hidden"
                      id="completed"
                    />
                    <label htmlFor={"completed"}>completed</label>
                  </div>
                </div>
                {errors.Status ? (
                  <p className="text-red-700 " style={{ marginTop: "1rem" }}>
                    Status is required
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter
            className="flex space-x-2 "
            style={{ marginTop: "1rem" }}>
            <Button
              onClick={closeModal}
              variant={"outline"}
              className="w-fit cursor-pointer rounded-3xl hover:bg-black hover:text-white"
              style={{ padding: "1rem 2rem" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-fit cursor-pointer rounded-3xl bg-violet-700"
              style={{ padding: "1rem 2rem" }}>
              Save Task
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </MyModal>
  );
}

export default AddTodo;
