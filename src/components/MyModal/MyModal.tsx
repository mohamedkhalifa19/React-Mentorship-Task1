import { AlertDialog } from "../ui/alert-dialog";
import { type ReactNode } from "react";
interface IProps {
  isOpen: boolean;
  className?: string;
  children: ReactNode;
}
export function MyModal({ children, isOpen, className }: IProps) {
  return (
    <div>
      <div className={className}>
        <AlertDialog open={isOpen}>{children}</AlertDialog>
      </div>
    </div>
  );
}
