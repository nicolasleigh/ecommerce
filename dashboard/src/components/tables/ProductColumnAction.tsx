import { ExternalLink, Eye, Loader, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import DialogItem from "./DialogItem";

export default function ProductColumnAction({ productId }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  // const focusRef = useRef(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [busy, setBusy] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchLatestUploads();
  // }, []);

  // const handleUIUpdate = () => fetchLatestUploads();

  // function handleDialogItemSelect() {
  //   focusRef.current = dropdownTriggerRef.current;
  // }

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
    // const { error, message } = await deleteMovie(movieId);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    setBusy(false);

    // if (error) return toast.error(t(error));
    // toast.success(t(message));
    setOpenDialog(false);
    // handleUIUpdate();
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
      <DropdownMenuContent
        align='end'
        // hidden={hasOpenDialog}
        // hidden={openEditDialog || openDeleteDialog}
        // onCloseAutoFocus={(event) => {
        //   if (focusRef.current) {
        //     focusRef.current.focus();
        //     focusRef.current = null;
        //     event.preventDefault();
        //   }
        // }}
      >
        <DropdownMenuItem className='p-0'>
          <div
            onClick={() => navigate(`/seller/dashboard/product/details/${productId}`)}
            className='flex items-center gap-3 w-full py-[6px] px-2'
          >
            <Eye strokeWidth={0.9} size={20} />
            <span>{t("Details")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <div
            onClick={() => navigate(`/seller/dashboard/edit-product/${productId}`)}
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
            <DialogDescription>{t("This action will remove this movie permanently!")}</DialogDescription>
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
