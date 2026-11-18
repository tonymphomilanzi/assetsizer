import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  APP_NAME,
  FREE_ASSET_LIMIT,
  PRO_MONTHLY_PRICE,
  PRO_YEARLY_PRICE,
} from "@/lib/constants";

interface PaywallDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function PaywallDialog({ isOpen, onClose }: PaywallDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogTitle>{APP_NAME} Pro</DialogTitle>
        <DialogDescription>
          Free gives you {FREE_ASSET_LIMIT} images per export. Pro gives you
          all of them, every time.
        </DialogDescription>

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-100 text-2xl font-medium">
              {PRO_MONTHLY_PRICE}
            </p>
            <p className="text-zinc-500 text-xs mt-1">Billed monthly</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-100 text-2xl font-medium">
              {PRO_YEARLY_PRICE}
            </p>
            <p className="text-zinc-500 text-xs mt-1">Save 35%</p>
          </div>
        </div>

        <ul className="list-disc pl-5">
          <li className="text-zinc-300 text-sm py-1">
            Unlimited image exports
          </li>
          <li className="text-zinc-300 text-sm py-1">
            All platforms and sizes
          </li>
          <li className="text-zinc-300 text-sm py-1">No watermarks</li>
        </ul>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            {/* TODO: Stripe checkout link */}
            <a href="#" onClick={(event) => event.preventDefault()}>
              Start Pro
            </a>
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PaywallDialog;
