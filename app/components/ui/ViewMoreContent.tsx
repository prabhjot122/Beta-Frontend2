import { POPUP_STYLES } from "~/lib/utils";

interface ViewMoreContentProps {
  onClose: () => void;
  onFeaturesClick?: () => void;
  onFeedbackClick?: () => void;
  onAdminClick?: () => void;
}

export function ViewMoreContent({ 
  onClose, 
  onFeaturesClick, 
  onFeedbackClick, 
  onAdminClick 
}: ViewMoreContentProps) {
  return (
    <div className="w-full text-center relative min-h-[200px]">
      <h2 className={POPUP_STYLES.title}>
        Explore More
      </h2>
      
      <div className="flex flex-col gap-6 mt-8">
        <button 
          className={POPUP_STYLES.button}
          onClick={onFeedbackClick}
        >
          Give Suggestions
        </button>
      </div>
      
      {/* Admin Access Link */}
      <div className="absolute bottom-5 right-5">
        <button
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white/60 text-xs cursor-pointer px-3 py-2 transition-all hover:text-white hover:bg-white/20 font-montserrat"
          onClick={onAdminClick}
        >
          admin
        </button>
      </div>
    </div>
  );
}

export default ViewMoreContent;
