import { CircleCheckBig } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2 flex-1 cursor-pointer">
      <CircleCheckBig color="blue" />
      <span className="font-bold text-xl">TaskFlow</span>
    </div>
  );
}

export default Logo;
