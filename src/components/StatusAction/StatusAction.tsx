type statusAction = "pending" | "all" | "completed";
interface IProps {
  status: statusAction;
}
function StatusAction({ status }: IProps) {
  const allActionFunc = async () => {};
  const pendingActionFunc = async () => {};
  const completeActionFunc = async () => {};
  return (
    <div className="status-box rounded-lg">
      <input
        type="radio"
        name="status"
        className=" w-fit  hidden"
        id={`${status}-act`}
        defaultChecked={status === "all"}
      />
      <label htmlFor={`${status}-act`}>{status}</label>
    </div>
  );
}

export default StatusAction;
