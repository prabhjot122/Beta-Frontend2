import { useEffect } from "react";
import type { PopupProps } from "~/lib/types";
import { POPUP_STYLES } from "../../lib/utils";
import RegistrationForm from "./RegistrationForm";
import NotInterestedForm from "./NotInterestedForm";
import FeedbackForm from "./FeedbackForm";
import FeaturesContent from "./FeaturesContent";
import ViewMoreContent from "./ViewMoreContent";
import ThankYouContent from "./ThankYouContent";

export function Popup({
  isOpen,
  onClose,
  type,
  userType = 'user',
  isNotInterested = false,
  feedbackSubmitted = false,
  onFeaturesClick,
  onFeedbackClick,
  onAdminClick
}: PopupProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPopupContent = () => {
    switch (type) {
      case 'form':
        return (
          <RegistrationForm
            userType={userType}
            onClose={onClose}
          />
        );
      
      case 'notinterested':
        return (
          <NotInterestedForm
            onClose={onClose}
          />
        );
      
      case 'feedback':
        return (
          <FeedbackForm
            onClose={onClose}
          />
        );
      
      case 'features':
        return (
          <FeaturesContent
            onClose={onClose}
          />
        );
      
      case 'viewmore':
        return (
          <ViewMoreContent
            onClose={onClose}
            onFeaturesClick={onFeaturesClick}
            onFeedbackClick={onFeedbackClick}
            onAdminClick={onAdminClick}
          />
        );
      
      case 'thankyou':
        return (
          <ThankYouContent
            onClose={onClose}
            isNotInterested={isNotInterested}
            feedbackSubmitted={feedbackSubmitted}
            userType={userType}
          />
        );
      
      default:
        return null;
    }
  };

  const isLargePopup = type === 'feedback';

  return (
    <div
      className={POPUP_STYLES.overlay}
      onClick={handleOverlayClick}
      role="presentation"
      tabIndex={-1}
    >
      <div
        className={`${POPUP_STYLES.container} ${POPUP_STYLES.containerBorder} ${
          isLargePopup ? 'max-w-4xl max-h-[95vh] sm:max-h-[90vh]' : ''
        } max-h-[70vh] sm:max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
        tabIndex={-1}
      >
        <button 
          className={POPUP_STYLES.close}
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>
        
        {getPopupContent()}
      </div>
    </div>
  );
}

export default Popup;
