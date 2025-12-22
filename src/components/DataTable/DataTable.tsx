import { columns } from "@/Data/Columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { setTodos, setTotal } from "@/app/features/Todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import EditTodo from "../EditTodo/EditTodo";
import type { Todo } from "@/Types/Types";
import DelTodo from "../DelTodo/DelTodo";
import SkeletonDemo from "../SkeletonDemo/SkeletonDemo";
function DataTable() {
  const { todos, limit, skip } = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
      ).then((res) => res.json());
      console.log(data);
      dispatch(setTodos(data.todos));
      dispatch(setTotal(data.total));
    };
    fetchData();
  }, [dispatch, limit, skip]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [todo, setTodo] = useState<Todo>();
  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);
  const openDelModal = () => setIsDelOpen(true);
  const closeDelModal = () => setIsDelOpen(false);
  const table = useReactTable({
    columns: columns({
      isEditOpen,
      openEditModal,
      closeEditModal,
      setTodo,
      openDelModal,
      closeDelModal,
      isDelOpen,
    }),
    data: todos,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(todos);
  return (
    <div
      className="w-[90%] border  border-[#ddd] m-auto rounded-2xl"
      style={{
        margin: "auto",
      }}>
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((thg) => (
            <TableRow key={thg.id}>
              {thg.headers.map((thead) => (
                <TableHead
                  style={{ padding: "1rem" }}
                  key={thead.id}
                  className="uppercase font-bold font-sans">
                  {thead.isPlaceholder
                    ? null
                    : flexRender(
                        thead.column.columnDef.header,
                        thead.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ padding: "1rem" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, idx) => {
                return (
                  <TableRow className="w-full" key={idx}>
                    <TableCell
                      colSpan={5}
                      className="h-15 w-full  text-center  "
                      style={{ padding: "0 1rem" }}>
                      <SkeletonDemo />
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
      <EditTodo
        isEditOpen={isEditOpen}
        closeEditModal={closeEditModal}
        openEditModal={openEditModal}
        todo={todo}
      />
      <DelTodo
        isDelOpen={isDelOpen}
        closeDelModal={closeDelModal}
        openEditModal={openDelModal}
        todo={todo}
      />
    </div>
  );
}

export default DataTable;
