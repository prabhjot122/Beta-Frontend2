import type { HeaderProps } from "~/lib/types";
import { ASSETS } from "~/lib/constants";

export function Header({ onViewMoreClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-transparent backdrop-blur-sm">
      <div className="flex items-center">
        <img
          src={ASSETS.LOGO}
          alt="LawVriksh Logo"
          className="h-12 sm:h-14 md:h-16 w-auto object-contain"
        />
      </div>

      <nav className="flex items-center">
        <button
          onClick={onViewMoreClick}
          className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-transparent text-[#D4AF37] font-montserrat font-medium text-sm sm:text-base md:text-lg rounded-[4px] border-[3px] border-[#D4AF37] cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 relative before:absolute before:inset-[-3px]  before:z-[-1] before:brightness-75 before:contrast-125"
        >
          Give Suggestions
        </button>
      </nav>
    </header>
  );
}

export default Header;
