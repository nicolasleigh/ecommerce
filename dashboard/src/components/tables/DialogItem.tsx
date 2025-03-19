import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function DialogItem(props) {
  const { triggerChildren, children, onSelect, onOpenChange, open, className, ...itemProps } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          className={className}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
