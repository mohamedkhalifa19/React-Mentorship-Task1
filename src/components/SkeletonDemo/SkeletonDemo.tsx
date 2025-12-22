import { Skeleton } from "../ui/skeleton";

function SkeletonDemo() {
  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="flex flex-1 items-center gap-2 ">
        <Skeleton className="h-7 w-7 rounded-full bg-[#ddd]" />
        <Skeleton className="h-5 w-full bg-[#ddd]" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="bg-[#ddd] w-65.5 h-7" />
        <Skeleton className="bg-[#ddd] w-65.5 h-7" />
        <Skeleton className="bg-[#ddd] w-65.5 h-7" />
      </div>
    </div>
  );
}

export default SkeletonDemo;
