import MyCheckBox from "@/components/MyCheckBox/MyCheckBox";
import TodoTitle from "@/components/TodoTitle/TodoTitle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/Types/Types";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, User } from "lucide-react";

interface IProps {
  isEditOpen: boolean;
  closeEditModal: () => void;
  openEditModal: () => void;
  setTodo: (t: Todo) => void;
  isDelOpen: boolean;
  closeDelModal: () => void;
  openDelModal: () => void;
}

export const columns = ({
  openEditModal,
  setTodo,
  openDelModal,
}: IProps): ColumnDef<Todo, any>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="cursor-pointer"
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllRowsSelected(value)
          }
        />
      ),

      cell: ({ row }) => {
        return <MyCheckBox row={row} />;
      },
    },
    {
      header: "task title",
      accessorKey: "todo",
      cell: ({ row, getValue }) => {
        return <TodoTitle row={row} value={getValue()} />;
      },
    },
    {
      header: "user id",
      accessorKey: "userId",
      cell: ({ getValue }) => (
        <div
          style={{ padding: ".1rem .3rem" }}
          className="flex items-center gap-1 cursor-pointer font-bold text-gray-300 w-fit  rounded-md bg-gray-500">
          <User size={15} />
          <span>{`User #${getValue()}`}</span>
        </div>
      ),
    },
    {
      header: "status",
      accessorKey: "completed",
      cell: ({ getValue, row }) => {
        const { completed } = row.original;
        const status = getValue() || completed ? "Completed" : "Pending";
        const color =
          status === "Pending"
            ? "bg-red-200 text-yellow-800 "
            : "bg-green-200 text-green-800";
        return (
          <span
            className={`cursor-pointer inline-flex w-25 justify-center rounded-full text-sm ${color}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => {
                  openEditModal();
                  setTodo(row.original);
                  console.log(row.original);
                }}>
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  openDelModal();
                  setTodo(row.original);
                  console.log(row.original);
                }}>
                <Trash2 />
              </Button>
            </div>
          </>
        );
      },
    },
  ];
};
