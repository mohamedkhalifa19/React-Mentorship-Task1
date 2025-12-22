import { setSkip } from "@/app/features/Todos/todosSlice";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function PaginationDemo() {
  const dispatch = useDispatch();
  const { limit } = useSelector((state: any) => state.todos);
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(setSkip((page - 1) * limit));
  }, [dispatch, limit, page]);
  return (
    <Pagination className=" w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="bg-[#4a1392] text-white"
            onClick={() => {
              if (page > 1) setPage((s) => s - 1);
              else setPage(5);
            }}>
            <ArrowLeft />
          </PaginationLink>
        </PaginationItem>
        {Array.from({ length: 5 }).map((t, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              href="#"
              isActive={page === idx + 1}
              onClick={() => {
                setActive(true);
                setPage((s) => idx + 1);
              }}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            className="bg-[#4a1392] text-white"
            onClick={() => {
              if (page < 5) setPage((s) => s + 1);
              else setPage(1);
            }}>
            <ArrowRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
