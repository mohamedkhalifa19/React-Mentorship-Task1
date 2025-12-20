import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

function SearchInput() {
  return (
    <form
      action="#"
      className="search-box flex  border   bg-[#f1f4f9]  rounded-full outline-none flex-2">
      <Button
        onClick={() => {
          alert("success");
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
        className={cn(
          "border-none",
          "focus-visible:border-transparent focus-visible:ring-0 focus-visible:shadow-none"
        )}
      />
    </form>
  );
}

export default SearchInput;
