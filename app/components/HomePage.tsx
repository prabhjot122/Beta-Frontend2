import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import Header from "./Header";
import Popup from "./ui/Popup";
import Footer from "./ui/Footer";
import { ASSETS, Z_INDEX } from "../lib/constants";
import type {
  UserType,
  PopupType
} from "~/lib/types";
import { useAnalytics } from "../lib/useAnalytics";

export function HomePage() {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>('form');
  const [userType, setUserType] = useState<UserType>('user');
  const [isNotInterested, setIsNotInterested] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Animation state for subtitle text switching
  const [currentText, setCurrentText] = useState('us');
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect for text switching
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentText(prev => prev === 'us' ? 'AI' : 'us');
      }, 250); // Quarter of animation duration for text change

      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Half of animation duration for reveal

    }, 3000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  // Event handlers with useCallback for performance optimization
  const handleUserTypeClick = useCallback((type: UserType) => {
    // Track user type selection
    trackEvent('user_type_selected', {
      user_type: type
    });
    
    setUserType(type);
    setPopupType('form');
    setShowPopup(true);
  }, [trackEvent]);

  const handleNotInterestedClick = useCallback(() => {
    // Track not interested button click
    trackEvent('not_interested_clicked');
    
    setIsNotInterested(true);
    setPopupType('notinterested');
    setShowPopup(true);
  }, [trackEvent]);

  const handleFeaturesClick = useCallback(() => {
    // Track features button click
    trackEvent('features_button_clicked');
    
    setPopupType('features');
    setShowPopup(true);
  }, [trackEvent]);

  const handleFeedbackClick = useCallback(() => {
    // Track feedback button click
    trackEvent('feedback_button_clicked');
    
    setPopupType('feedback');
    setShowPopup(true);
  }, [trackEvent]);

  const handleViewMoreClick = useCallback(() => {
    // Track view more button click
    trackEvent('view_more_clicked');
    
    setPopupType('feedback');
    setShowPopup(true);
  }, [trackEvent]);

  const handleAdminClick = useCallback(() => {
    // Track admin button click
    trackEvent('admin_button_clicked');
    
    navigate('/admin');
  }, [navigate, trackEvent]);

  const closePopup = useCallback(() => {
    // Track popup close
    trackEvent('popup_closed', {
      popup_type: popupType
    });
    
    setShowPopup(false);
    setIsNotInterested(false);
    setFeedbackSubmitted(false);
  }, [trackEvent, popupType]);

  return (
    <>
      {/* Background Video - Full Screen */}
      <video
        autoPlay
        muted
        loop
        className={`fixed top-0 left-0 w-full h-full object-cover z-[${Z_INDEX.BACKGROUND}]`}
        src={ASSETS.VIDEO}
      />

      {/* Background Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-law-dark/30 z-0 pointer-events-none" />

      {/* Page Layout Container */}
      <div className="video-layout-container relative w-full font-sans">
        {/* Header */}
        <Header onViewMoreClick={handleViewMoreClick} />

        {/* Main Content - Takes up available space */}
        <main className="video-layout-main flex w-full justify-center relative items-center z-10 pt-24 lg:pt-32 pb-8">
          <section className="w-full max-w-fit px-4 sm:px-8 md:px-12 lg:px-16 py-0 flex flex-col justify-center items-center z-20 relative">
            {/* Title Container */}
            <div className="mb-8 text-center">
              <h1 className="text-white font-merriweather text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight m-0 w-full max-w-[600px] lg:max-w-[650px] text-center px-4">
                <span>Join the LawVriksh Beta</span>
              </h1>
            </div>

            {/* Subtitle Container */}
            <div className="mb-6 text-center w-full">
              <p className="text-white font-normal italic text-base align-middle sm:text-xl leading-relaxed m-0 text-center w-full px-4">
                build your legal digital presence with{' '}
                <span className="relative inline align-baseline" style={{ verticalAlign: 'baseline' }}>
                  <span
                    className={`text-[#D4AF37] font-medium transition-all duration-500 ease-in-out ${
                      isAnimating
                        ? 'opacity-0 transform -translate-y-3 scale-90 blur-sm'
                        : 'opacity-100 transform translate-y-0 scale-100 blur-none'
                    }`}
                    style={{
                      display: 'inline',
                      transformOrigin: 'center baseline',
                      filter: isAnimating ? 'blur(2px)' : 'blur(0px)',
                      verticalAlign: 'baseline',
                      lineHeight: 'inherit',
                    }}
                  >
                    {currentText}
                  </span>
                  {/* Stagger effect overlay */}
                  <span
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      isAnimating
                        ? 'opacity-20 transform translate-y-1'
                        : 'opacity-0 transform translate-y-0'
                    }`}
                    style={{
                      background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.3), rgba(255, 255, 255, 0.1))',
                      filter: 'blur(1px)',
                    }}
                  />
                </span>
              </p>
            </div>

            {/* Description Container */}
            <div className="mb-10">
              <p className="text-white font-source-sans-pro font-light text-sm sm:text-sm leading-relaxed m-0 text-center w-full max-w-[620px] px-4">
              Lawvriksh isn&apos;t just a platform—it&apos;s your breakthrough. Dive into the law with passion and purpose, turning curiosity into confidence and letting your voice amplify justice. Share your work, build a powerful digital presence, and join a movement where every insight sparks change. This is where learners rise, leaders shine, and your impact begins.
              </p>
            </div>

            {/* Waiting List Section */}
            <div className="flex flex-col items-center gap-6 max-w-fit w-full">
              <h2 className="bg-gold-texture bg-cover bg-center bg-clip-text text-transparent font-montserrat font-normal text-xl sm:text-2xl md:text-3xl leading-tight m-0 text-center w-full px-4">
                Join Our Waiting List :
              </h2>

              <div className="flex flex-col items-center gap-5 w-full">
                {/* User Type Row */}
                <div className="flex flex-row items-center gap-3 sm:gap-4 justify-center w-full">
                  <button
                    className="flex w-40 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-11 md:h-12 px-4 sm:px-6 items-center justify-center rounded-[4px]  bg-[#D4AF37] text-[#1B1B1B] font-montserrat font-medium text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105 relative before:absolute before:inset-[-3px] before:rounded-full before:z-[-1] before:brightness-100 before:contrast-125"
                    onClick={() => handleUserTypeClick('user')}
                  >
                    User
                  </button>
                  <button
                    className="flex w-40 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-11 md:h-12 px-4 sm:px-6 items-center justify-center rounded-[4px]  bg-[#D4AF37] text-[#1B1B1B] font-montserrat font-medium text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105 relative before:absolute before:inset-[-3px] before:rounded-full before:z-[-1] before:brightness-100 before:contrast-125"
                    onClick={() => handleUserTypeClick('creator')}
                  >
                    Creator
                  </button>
                </div>

           

                {/* Not Interested Button */}
                <button
                  className="flex w-48 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-11 md:h-12 px-4 sm:px-6 items-center justify-center rounded-[4px] bg-[#1B1B1B]  text-[#D4AF37] font-montserrat font-medium text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105"
                  onClick={handleNotInterestedClick}
                >
                  Not found Interest
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer - Positioned after main content */}
        <Footer className="video-layout-footer" />
      </div>

      {/* Floating Features Button */}
      <button
        onClick={handleFeaturesClick}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-law-gold to-law-gold/90 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="View Features"
      >
        <svg
          className="w-6 h-6 transition-transform group-hover:rotate-12"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>

      {/* Popup */}
      <Popup
        isOpen={showPopup}
        onClose={closePopup}
        type={popupType}
        userType={userType}
        isNotInterested={isNotInterested}
        feedbackSubmitted={feedbackSubmitted}
        onUserTypeClick={handleUserTypeClick}
        onNotInterestedClick={handleNotInterestedClick}
        onFeaturesClick={handleFeaturesClick}
        onFeedbackClick={handleFeedbackClick}
        onAdminClick={handleAdminClick}
      />
    </>
  );
}

export default HomePage;
