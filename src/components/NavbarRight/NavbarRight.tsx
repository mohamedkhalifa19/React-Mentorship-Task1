import { BellDot, Plus } from "lucide-react";
import { Button } from "../ui/button";
import AddTodo from "../AddTodo/AddTodo";
import { useState } from "react";

function NavbarRight() {
  const [isOpen, setIsopen] = useState(false);
  const openModal = () => {
    setIsopen(true);
  };
  const closeModal = () => {
    setIsopen(false);
  };
  return (
    <>
      <div className="flex items-center justify-center flex-1">
        <BellDot
          color="gray"
          className="flex-1 cursor-pointer"
          size={"1.6rem"}
        />
        <Button
          variant={"default"}
          onClick={() => setIsopen(true)}
          className="bg-blue-900 rounded-full flex items-center flex-2 cursor-pointer">
          <Plus />
          New Task
        </Button>
      </div>
      {/* Add new Todo */}
      <AddTodo isOpen={isOpen} closeModal={closeModal} openModal={openModal} />
    </>
  );
}

export default NavbarRight;
