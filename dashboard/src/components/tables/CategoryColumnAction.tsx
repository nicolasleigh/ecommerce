import EditCategory from "@/views/seller/EditCategory";
import { Loader, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { forwardRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function CategoryColumnAction({ id, category }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [busy, setBusy] = useState(false);

  function handleOpenEdit(open) {
    // setHasOpenDialog(open);
    setOpenEditDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  function handleOpenDelete(open) {
    // setHasOpenDialog(open);
    setOpenDeleteDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  const handleDelete = async (setOpenDialog) => {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.error("Not authorized to perform this operation");
    setBusy(false);
    setOpenDialog(false);
    setDropdownOpen(false);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-3 w-3 sm:w-8 sm:h-8 p-0'
          // ref={dropdownTriggerRef}
        >
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' hidden={openEditDialog || openDeleteDialog}>
        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Pencil strokeWidth={0.9} size={20} />
              <span>{"Edit"}</span>
            </div>
          }
          onOpenChange={handleOpenEdit}
          open={openEditDialog}
          className='w-[350px] sm:w-[500px] '
        >
          <DialogTitle>{"Edit Category"}</DialogTitle>
          <EditCategory
            initialState={{ name: category.name, image: category.image, id: id }}
            setVisible={handleOpenEdit}
          />
        </DialogItem>

        <DropdownMenuSeparator />
        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Trash2 strokeWidth={0.9} size={20} />
              <span>{"Delete"}</span>
            </div>
          }
          // onSelect={handleDialogItemSelect}
          onOpenChange={handleOpenDelete}
          open={openDeleteDialog}
          // open={hasOpenDialog}
          className='w-[350px] sm:w-[500px]'
        >
          <DialogHeader>
            <DialogTitle>{"Are you sure?"}</DialogTitle>
            <DialogDescription>{"This action will remove this category permanently!"}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={busy}
              onClick={() => {
                setOpenDeleteDialog(false);
                setDropdownOpen(false);
              }}
              variant='secondary'
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={() => {
                handleDelete(setOpenDeleteDialog);
              }}
              variant='destructive'
              disabled={busy}
            >
              <span className='w-12 flex items-center justify-center'>
                {busy ? <Loader className='animate-spin' /> : "Delete"}
              </span>
            </Button>
          </DialogFooter>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DialogItem = forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, open, className, ...itemProps } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          // ref={forwardedRef}
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
});
