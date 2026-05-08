import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const FloatingCTA = () => {
  return (
    <a
      href={BUSINESS.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#7dd3fc] text-[#0a0a0a] flex items-center justify-center border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
    </a>
  );
};

export default FloatingCTA;
