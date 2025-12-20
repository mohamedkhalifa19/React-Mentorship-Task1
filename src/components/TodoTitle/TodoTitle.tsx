interface IProps {
  row: any;
  value: string;
}
function TodoTitle({ row, value }: IProps) {
  const { completed } = row.original;
  return (
    <span
      className={`font-bold ${completed ? "line-through text-gray-400" : ""}`}>
      {value}
    </span>
  );
}

export default TodoTitle;
