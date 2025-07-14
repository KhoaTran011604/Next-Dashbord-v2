import { Button } from '@/styles/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/components/ui/dialog';
import { Input } from '@/styles/components/ui/input';
import { Label } from '@/styles/components/ui/label';

export function Modal({ open, setOpen, children }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        {/* <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>New Task</Button>
        </DialogTrigger> */}
        {children}
      </div>
    </Dialog>
  );
}
