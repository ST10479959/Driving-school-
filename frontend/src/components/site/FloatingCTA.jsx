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
      className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 flex items-center justify-center shadow-lg transition-colors"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2.25} />
    </a>
  );
};

export default FloatingCTA;
