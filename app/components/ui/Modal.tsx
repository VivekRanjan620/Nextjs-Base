"use client";

// Modal.tsx — Reusable popup/dialog component
// Used for: Delete confirmation, Edit forms, Info popups
// Opens on top of the page with a dark overlay behind it

import { useEffect } from "react";
import Button from "@/app/components/ui/Button";

interface ModalProps {
  isOpen: boolean;          // Controls if modal is visible
  onClose: () => void;      // Called when user clicks outside or X button
  title: string;            // Modal heading
  children: React.ReactNode; // Content inside modal (form, message etc.)
  onConfirm?: () => void;   // Optional confirm button handler
  confirmLabel?: string;    // Confirm button text (default: "Confirm")
  confirmVariant?: "primary" | "danger" | "outline"; // Confirm button style
  isLoading?: boolean;      // Show loading on confirm button
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  confirmVariant = "primary",
  isLoading = false,
}: ModalProps) {

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Do not render anything if modal is closed
  if (!isOpen) return null;

  return (
    // Dark overlay behind the modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose} // Click outside = close
    >
      {/* Modal box — stop click from closing when clicking inside */}
      <div
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold text-lg">{title}</h3>

          {/* X close button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Modal Body — custom content goes here */}
        <div className="px-6 py-5 text-gray-300 text-sm leading-relaxed">
          {children}
        </div>

        {/* Modal Footer — buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">
          {/* Cancel always shown */}
          <Button label="Cancel" variant="ghost" onClick={onClose} />

          {/* Confirm — only shown if onConfirm is passed */}
          {onConfirm && (
            <Button
              label={confirmLabel}
              variant={confirmVariant}
              onClick={onConfirm}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// HOW TO USE:
// ─────────────────────────────────────────
//
// Step 1 — State to control open/close:
// const [isOpen, setIsOpen] = useState(false);
//
// Step 2 — Delete confirm modal:
// <Modal
//   isOpen={isOpen}
//   onClose={() => setIsOpen(false)}
//   title="Delete User"
//   onConfirm={handleDelete}
//   confirmLabel="Yes, Delete"
//   confirmVariant="danger"
// >
//   <p>Are you sure you want to delete this user? This cannot be undone.</p>
// </Modal>
//
// Step 3 — Info modal (no confirm button):
// <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="User Details">
//   <p>Name: John Doe</p>
//   <p>Email: john@example.com</p>
// </Modal>
//
// Step 4 — Edit form inside modal:
// <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Profile">
//   <Input label="Name" name="name" value={name} onChange={...} />
// </Modal>