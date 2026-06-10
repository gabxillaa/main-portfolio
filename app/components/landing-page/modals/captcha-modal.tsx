import HCaptcha from "@hcaptcha/react-hcaptcha";
import React, { useRef, useEffect } from "react";
import Modal from "@/app/components/ui/modals";
interface CaptchaModalProps {
  isOpen: boolean;
  onVerify: (token: string) => void;
  onClose: () => void;
}

export default function CaptchaModal({ isOpen, onVerify, onClose }: CaptchaModalProps) {
  const captchaRef = useRef<HCaptcha>(null);

  // Reset captcha every time modal opens
  useEffect(() => {
    if (isOpen) {
      captchaRef.current?.resetCaptcha();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    heading="One quick check"
    subtext="Just making sure you're human before sending your message :>">

      <div className="rounded-[2rem] p-8 flex flex-col items-center gap-5">
            {/* hCaptcha widget */}
            <HCaptcha
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
              onVerify={(token) => {
                onVerify(token);
                onClose();
              }}
              theme="light"
            />
          </div>
    </Modal>
  );
}