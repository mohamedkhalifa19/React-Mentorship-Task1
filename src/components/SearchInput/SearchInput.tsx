import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTodos } from "@/app/features/Todos/todosSlice";
import type { Todo } from "@/Types/Types";

function SearchInput() {
  const [searchTxt, setSearchTxt] = useState("");
  const dispatch = useDispatch();
  const { allTodos } = useSelector((state: any) => state.todos);
  useEffect(() => {
    console.log(searchTxt);
    const arr = allTodos.filter((s: Todo) =>
      s.todo.toLowerCase().trim().includes(searchTxt.toLowerCase().trim())
    );
    dispatch(setFilteredTodos(searchTxt.length > 0 ? arr : allTodos));
  }, [dispatch, searchTxt]);
  return (
    <form
      action="#"
      className="search-box flex  border   bg-[#f1f4f9]  rounded-full outline-none flex-2">
      <Button
        onClick={() => {
          const arr = allTodos.filter((s: Todo) =>
            s.todo.toLowerCase().trim().includes(searchTxt.toLowerCase().trim())
          );
          dispatch(setFilteredTodos(searchTxt.length > 0 ? arr : allTodos));
          setSearchTxt("");
        }}
        type="submit"
        variant={"ghost"}
        size={"icon"}
        className="hover:bg-transparent">
        <Search />
      </Button>
      <Input
        placeholder="Search Tasks..."
        type="text"
        value={searchTxt}
        onChange={(e) => {
          setSearchTxt(e.target.value);
        }}
        className={cn(
          "border-none",
          "focus-visible:border-transparent focus-visible:ring-0 focus-visible:shadow-none"
        )}
      />
    </form>
  );
}

export default SearchInput;
