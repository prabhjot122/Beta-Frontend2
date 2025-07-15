import { POPUP_STYLES } from "~/lib/utils";
import { useState } from "react";
import type { FeedbackFormData } from "~/lib/types";
import { RATING_SCALE, RATING_LABELS, YES_NO_OPTIONS, AI_TOOLS_FREQUENCY_OPTIONS } from "~/lib/types";
import { useFeedbackSubmission } from "~/lib/hooks";
import { useAnalytics } from "~/lib/useAnalytics";
import './rating-radio.css';

interface FeedbackFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function FeedbackForm({ onClose, onSuccess }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    user_email: '',
    digital_work_showcase_effectiveness: undefined,
    legal_persons_online_recognition: '',
    digital_work_sharing_difficulty: undefined,
    regular_blogging: '',
    ai_tools_blogging_frequency: '',
    blogging_tools_familiarity: undefined,
    core_platform_features: '',
    ai_research_opinion: '',
    ideal_reading_features: '',
    portfolio_presentation_preference: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submit, isSubmitting, error, success, successMessage, reset } = useFeedbackSubmission();
  const { trackEvent } = useAnalytics();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let processedValue: any = value;

    // Handle radio buttons for ratings
    if (type === 'radio' && name.includes('_rating')) {
      processedValue = parseInt(value);
    }

    // Handle empty strings for optional fields
    if (value === '' && !name.includes('_rating')) {
      processedValue = undefined;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.user_email?.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Track form validation error
      trackEvent('form_validation_error', {
        form_type: 'feedback',
        errors: Object.keys(errors)
      });
      return;
    }

    // Track form submission attempt
    trackEvent('form_submission_started', {
      form_type: 'feedback'
    });

    const success = await submit(formData);
    if (success) {
      // Track successful form submission
      trackEvent('form_submission_success', {
        form_type: 'feedback',
        has_digital_work_showcase_effectiveness: !!formData.digital_work_showcase_effectiveness,
        has_legal_persons_online_recognition: !!formData.legal_persons_online_recognition,
        has_digital_work_sharing_difficulty: !!formData.digital_work_sharing_difficulty,
        has_regular_blogging: !!formData.regular_blogging,
        has_ai_tools_blogging_frequency: !!formData.ai_tools_blogging_frequency,
        has_blogging_tools_familiarity: !!formData.blogging_tools_familiarity,
        has_core_platform_features: !!formData.core_platform_features,
        has_ai_research_opinion: !!formData.ai_research_opinion,
        has_ideal_reading_features: !!formData.ideal_reading_features,
        has_portfolio_presentation_preference: !!formData.portfolio_presentation_preference
      });
      onSuccess?.();
      // Keep form open to show success message
    } else {
      // Track form submission error
      trackEvent('form_submission_error', {
        form_type: 'feedback',
        error: error || 'Unknown error'
      });
    }
  };

  // Handle closing after success
  const handleClose = () => {
    reset();
    onClose();
  };

  const renderRatingQuestion = (
    name: string,
    label: string,
    questionNumber: number,
    commentsName?: string
  ) => (
    <div className="mb-6">
      <label className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
        {questionNumber}. {label}
      </label>
      <div className="custom-rating-radio-group">
        {RATING_SCALE.map(num => (
          <label
            key={num}
            className={`custom-rating-radio${formData[name as keyof FeedbackFormData] === num ? ' selected' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={num.toString()}
              checked={formData[name as keyof FeedbackFormData] === num}
              onChange={handleInputChange}
              className="custom-rating-radio-input"
            />
            <span className="custom-rating-radio-label">{num} - {RATING_LABELS[num as keyof typeof RATING_LABELS]}</span>
          </label>
        ))}
      </div>
      {commentsName && (
        <div className="mt-3">
          <label htmlFor={commentsName} className="block text-sm text-white/80 mb-2 font-montserrat drop-shadow-sm">
            Comments (Optional):
          </label>
          <textarea
            id={commentsName}
            name={commentsName}
            value={formData[commentsName as keyof FeedbackFormData] as string || ''}
            onChange={handleInputChange}
            rows={2}
            className={POPUP_STYLES.textarea}
            placeholder="Share your thoughts..."
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <h2 className={POPUP_STYLES.title}>
        We value your insights and would love to stay connected
      </h2>

      <p className="text-center text-gray-600 text-sm mb-3 font-source-sans-pro">
        <em>Estimated time: 3-5 minutes</em>
      </p>

      <p className="text-sm text-gray-600 mb-8 text-center leading-relaxed font-source-sans-pro">
        Your insights help us build a platform that truly serves the legal community. Please share your thoughts on digital presence, blogging, and platform expectations.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Email Field */}
        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="user_email" className={POPUP_STYLES.label}>
            Email Address *
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email || ''}
            onChange={handleInputChange}
            className={`${POPUP_STYLES.input} ${errors.user_email ? 'border-red-500' : ''}`}
            placeholder="Enter your email address"
            required
          />
          {errors.user_email && (
            <p className="text-red-500 text-sm mt-1">{errors.user_email}</p>
          )}
        </div>

        {/* Digital Presence Section */}
        <div className="border-b border-white/20 pb-6 mb-6">
          <h3 className="bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl mb-3 drop-shadow-lg">
            Digital Presence
          </h3>

          {renderRatingQuestion('digital_work_showcase_effectiveness', 'How effectively are you able to showcase your digital work online?', 1)}

          <div className={POPUP_STYLES.formGroup}>
            <fieldset>
              <legend className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
                2. Do you think legal persons are getting enough recognition online?
              </legend>
              <div className="flex gap-4 flex-wrap mb-3">
                {YES_NO_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center gap-1 cursor-pointer text-sm text-white/80 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10 hover:bg-white/10">
                    <input
                      type="radio"
                      name="legal_persons_online_recognition"
                      value={option.value}
                      checked={formData.legal_persons_online_recognition === option.value}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {renderRatingQuestion('digital_work_sharing_difficulty', 'What level of difficulty do you face while sharing your digital work online? (1: Least, 5: Most)', 3)}
        </div>

        {/* Blogging and Sharing Insights Section */}
        <div className="border-b border-white/20 pb-6 mb-6">
          <h3 className="bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl mb-3 drop-shadow-lg">
            Blogging and Sharing Insights
          </h3>

          <div className={POPUP_STYLES.formGroup}>
            <fieldset>
              <legend className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
                4. Do you write blogs regularly?
              </legend>
              <div className="flex gap-4 flex-wrap mb-3">
                {YES_NO_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center gap-1 cursor-pointer text-sm text-white/80 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10 hover:bg-white/10">
                    <input
                      type="radio"
                      name="regular_blogging"
                      value={option.value}
                      checked={formData.regular_blogging === option.value}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className={POPUP_STYLES.formGroup}>
            <fieldset>
              <legend className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
                5. How often do you use AI tools to assist in writing blogs?
              </legend>
              <div className="flex gap-4 flex-wrap mb-3">
                {AI_TOOLS_FREQUENCY_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center gap-1 cursor-pointer text-sm text-white/80 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10 hover:bg-white/10">
                    <input
                      type="radio"
                      name="ai_tools_blogging_frequency"
                      value={option.value}
                      checked={formData.ai_tools_blogging_frequency === option.value}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {renderRatingQuestion('blogging_tools_familiarity', 'How familiar are you with different blogging tools available in the market?', 6)}
        </div>

        {/* Expectations from Blogging Platform Section */}
        <div>
          <h3 className="bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl mb-3 drop-shadow-lg">
            Expectations from a Blogging Platform
          </h3>

          <div className={POPUP_STYLES.formGroup}>
            <label htmlFor="core_platform_features" className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
              7. What core features do you expect from a blogging platform, either as a creator or as a reader?
            </label>
            <textarea
              id="core_platform_features"
              name="core_platform_features"
              value={formData.core_platform_features || ''}
              onChange={handleInputChange}
              rows={3}
              className={POPUP_STYLES.textarea}
              placeholder="Describe the essential features you expect..."
            />
          </div>

          <div className={POPUP_STYLES.formGroup}>
            <label htmlFor="ai_research_opinion" className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
              8. What is your opinion on using AI for research during blog creation?
            </label>
            <textarea
              id="ai_research_opinion"
              name="ai_research_opinion"
              value={formData.ai_research_opinion || ''}
              onChange={handleInputChange}
              rows={3}
              className={POPUP_STYLES.textarea}
              placeholder="Share your thoughts on AI-assisted research..."
            />
          </div>

          <div className={POPUP_STYLES.formGroup}>
            <label htmlFor="ideal_reading_features" className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
              9. What features would your ideal blog reading platform include (e.g., listening mode, etc.)?
            </label>
            <textarea
              id="ideal_reading_features"
              name="ideal_reading_features"
              value={formData.ideal_reading_features || ''}
              onChange={handleInputChange}
              rows={3}
              className={POPUP_STYLES.textarea}
              placeholder="Describe your ideal reading experience..."
            />
          </div>

          <div className={POPUP_STYLES.formGroup}>
            <label htmlFor="portfolio_presentation_preference" className="block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm">
              10. How would you prefer to present your portfolio, and what type of content do you want to include to attract recruiters or relevant audiences?
            </label>
            <textarea
              id="portfolio_presentation_preference"
              name="portfolio_presentation_preference"
              value={formData.portfolio_presentation_preference || ''}
              onChange={handleInputChange}
              rows={3}
              className={POPUP_STYLES.textarea}
              placeholder="Describe your portfolio presentation preferences..."
            />
          </div>
        </div>

        {/* Success Message */}
        {success && successMessage && (
          <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 text-center">
            <p className="font-medium">{successMessage}</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 text-sm text-green-600 hover:text-green-800 underline"
            >
              Close
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 text-center">
            <p>{error}</p>
          </div>
        )}

        {!success && (
          <button
            type="submit"
            className={`${POPUP_STYLES.button} ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        )}
      </form>
    </div>
  );
}

export default FeedbackForm;
