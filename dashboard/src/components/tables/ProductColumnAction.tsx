import { Eye, Loader, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DialogItem from "./DialogItem";

export default function ProductColumnAction({ productId }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [busy, setBusy] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleOpenDelete(open) {
    // setHasOpenDialog(open);
    setOpenDeleteDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  const handleDelete = async (setOpenDialog) => {
    setBusy(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.error(t("You have no right to delete a product"));
    setBusy(false);
    setOpenDialog(false);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-3 w-3 sm:w-8 sm:h-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='p-0'>
          <div
            onClick={() => navigate(`/product/details/${productId}`)}
            className='flex items-center gap-3 w-full py-[6px] px-2'
          >
            <Eye strokeWidth={0.9} size={20} />
            <span>{t("Details")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <div
            onClick={() => navigate(`/edit-product/${productId}`)}
            className='flex items-center gap-3 w-full py-[6px] px-2'
          >
            <Pencil strokeWidth={0.9} size={20} />
            <span>{t("Edit")}</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Trash2 strokeWidth={0.9} size={20} />
              <span>{t("Delete")}</span>
            </div>
          }
          onOpenChange={handleOpenDelete}
          open={openDeleteDialog}
          className='w-[500px]'
        >
          <DialogHeader>
            <DialogTitle>{t("Are you sure?")}</DialogTitle>
            <DialogDescription>{t("This action will remove this product permanently!")}</DialogDescription>
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
              {t("Cancel")}
            </Button>
            <Button
              onClick={() => {
                handleDelete(setOpenDeleteDialog);
                setDropdownOpen(false);
              }}
              variant='destructive'
              disabled={busy}
            >
              <span className='w-12 flex items-center justify-center'>
                {busy ? <Loader className='animate-spin' /> : t("Delete")}
              </span>
            </Button>
          </DialogFooter>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
