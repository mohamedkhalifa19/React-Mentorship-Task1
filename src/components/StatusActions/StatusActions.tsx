import "./StatusActions.css";
import StatusAction from "../StatusAction/StatusAction";

function StatusActions() {
  return (
    <div className="status-action-container flex gap-2 border-2  w-80 rounded-md bg-[#f1f4f9] justify-evenly items-center">
      <StatusAction status="all" />
      <StatusAction status="pending" />
      <StatusAction status="completed" />
    </div>
  );
}

export default StatusActions;
