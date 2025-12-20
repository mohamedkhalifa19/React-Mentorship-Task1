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
import { useEffect } from "react";
import { setTodos } from "@/App/features/Todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";
function DataTable() {
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/todos").then((res) =>
        res.json()
      );
      dispatch(setTodos(data.todos));
    };
    fetchData();
  }, [dispatch]);
  const table = useReactTable({
    columns,
    data: todos,
    getCoreRowModel: getCoreRowModel(),
  });
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
