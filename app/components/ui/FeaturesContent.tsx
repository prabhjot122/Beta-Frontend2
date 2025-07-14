import { POPUP_STYLES } from "~/lib/utils";
import { FEATURES } from "~/lib/types";

interface FeaturesContentProps {
  onClose: () => void;
}

export function FeaturesContent({ onClose }: FeaturesContentProps) {
  return (
    <div className="w-full text-left">
      <h2 className={POPUP_STYLES.title}>
        Our Features
      </h2>
      
      <div className="flex flex-col gap-6 my-8">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-law-gold/40 hover:-translate-y-2 hover:shadow-2xl shadow-xl"
          >
            <h3 className="bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl leading-tight mb-4 drop-shadow-lg">
              {feature.title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed m-0 font-source-sans-pro drop-shadow-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      <button 
        className={POPUP_STYLES.button}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

export default FeaturesContent;
