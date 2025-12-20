import { Input } from "../ui/input";

function PagesRows() {
  return (
    <div className="flex  items-center gap-2 ">
      <span className="block text-sm text-gray-500">Rows per page:</span>
      <Input
        type="number"
        max={10}
        min={1}
        placeholder="10"
        className="w-fit text-center bg-white"
      />
    </div>
  );
}

export default PagesRows;
