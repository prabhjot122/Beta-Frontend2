import type { UserType } from "~/lib/types";
import { POPUP_STYLES } from "~/lib/utils";

interface ThankYouContentProps {
  onClose: () => void;
  isNotInterested?: boolean;
  feedbackSubmitted?: boolean;
  userType?: UserType;
}

export function ThankYouContent({ 
  onClose, 
  isNotInterested = false, 
  feedbackSubmitted = false, 
  userType = 'user'
}: ThankYouContentProps) {
  const getMessage = () => {
    if (isNotInterested) {
      return "No problem if you are not interested. Thank you for giving your time!";
    }
    
    if (feedbackSubmitted) {
      return "Thank you for your valuable feedback! Your input helps us improve our platform to better serve your legal needs.";
    }
    
    return `Thank you for joining our waiting list as a ${userType}! We'll be in touch soon.`;
  };

  return (
    <div className="w-full text-center">
      <h2 className={POPUP_STYLES.title}>
        Thank You!
      </h2>
      
      <p className="text-base text-white/90 my-6 mx-0 leading-relaxed font-source-sans-pro drop-shadow-sm">
        {getMessage()}
      </p>
      
      <button 
        className={POPUP_STYLES.button}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

export default ThankYouContent;
