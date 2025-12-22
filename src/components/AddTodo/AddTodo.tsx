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
interface IProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
function AddTodo({ isOpen, closeModal }: IProps) {
  const [status, setStatus] = useState("pending");
  const [desc, setDesc] = useState("");
  const [id, setID] = useState<number>(0);
  const dispatch = useDispatch();
  return (
    <MyModal isOpen={isOpen} className="p-2">
      {" "}
      <AlertDialogContent style={{ padding: "1rem" }}>
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                id="task-desc"
                placeholder="Task Description ..."
              />
              <p className="text-muted-foreground text-sm">
                Brefiely describe what you need
              </p>
            </div>
            <div className="text-[1rem] flex flex-col gap-2 overflow-hidden">
              <Label htmlFor="task-desc" className="font-bold text-black">
                Assigne (User ID)
              </Label>
              <Input
                type="text"
                value={id}
                onChange={(e) => setID(Number(e.target.value))}
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
                    name="status"
                    value={"pending"}
                    onClick={() => setStatus("pending")}
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
                    name="status"
                    value={"completed"}
                    className=" w-fit  hidden"
                    id="completed"
                  />
                  <label htmlFor={"completed"}>completed</label>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex space-x-2">
          <Button
            onClick={closeModal}
            variant={"outline"}
            className="w-fit cursor-pointer rounded-3xl hover:bg-black hover:text-white"
            style={{ padding: "1rem 2rem" }}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await fetch("https://dummyjson.com/todos/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  userId: Number(id),
                  todo: desc,
                  completed: status === "completed",
                }),
              }).then((res) => {
                if (res.status === 201) {
                  dispatch(
                    addNewTodo({
                      userId: id,
                      completed: status === "completed",
                      todo: desc,
                    })
                  );
                  setDesc("");
                  setID(0);
                  setStatus("pending");
                  closeModal();
                  toast("Todo added Successfuly ✅");
                }
              });
            }}
            className="w-fit cursor-pointer rounded-3xl bg-violet-700"
            style={{ padding: "1rem 2rem" }}>
            Save Task
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </MyModal>
  );
}

export default AddTodo;
