import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/styles/components/ui/alert-dialog';
import { Button } from '@/styles/components/ui/button';

export function AlertModal({ openAlert, setOpenAlert, children }) {
  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
      {children}
    </AlertDialog>
  );
}
