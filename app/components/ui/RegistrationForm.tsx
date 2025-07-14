import type { UserType, RegistrationFormData, Gender, Profession } from "~/lib/types";
import { POPUP_STYLES } from "~/lib/utils";
import { GENDER_OPTIONS, PROFESSION_OPTIONS } from "~/lib/types";
import { useState } from "react";
import { useUserRegistration } from "~/lib/hooks";
import { useAnalytics } from "~/lib/useAnalytics";

interface RegistrationFormProps {
  userType: UserType;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RegistrationForm({ userType, onClose, onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone_number: '',
    gender: undefined,
    profession: undefined,
    interest_reason: '',
    user_type: userType
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { registerUser, registerCreator, isSubmitting, error, success, successMessage, reset } = useUserRegistration();
  const { trackEvent } = useAnalytics();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Track form validation error
      trackEvent('form_validation_error', {
        form_type: 'registration',
        user_type: userType,
        errors: Object.keys(errors)
      });
      return;
    }

    // Track form submission attempt
    trackEvent('form_submission_started', {
      form_type: 'registration',
      user_type: userType
    });

    let success = false;
    if (userType === 'user') {
      success = await registerUser(formData);
    } else {
      success = await registerCreator(formData);
    }

    if (success) {
      // Track successful form submission
      trackEvent('form_submission_success', {
        form_type: 'registration',
        user_type: userType,
        has_gender: !!formData.gender,
        has_profession: !!formData.profession,
        has_interest_reason: !!formData.interest_reason
      });
      onSuccess?.();
      // Keep form open to show success message
    } else {
      // Track form submission error
      trackEvent('form_submission_error', {
        form_type: 'registration',
        user_type: userType,
        error: error || 'Unknown error'
      });
    }
  };

  // Handle closing after success
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="w-full">
      <h2 className={POPUP_STYLES.title}>
        Join as {userType}
      </h2>
      
      <form onSubmit={handleSubmit} className={POPUP_STYLES.form}>
        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="name" className={POPUP_STYLES.label}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${POPUP_STYLES.input} ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter your name"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="email" className={POPUP_STYLES.label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${POPUP_STYLES.input} ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter your email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="phone_number" className={POPUP_STYLES.label}>
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className={`${POPUP_STYLES.input} ${errors.phone_number ? 'border-red-500' : ''}`}
            placeholder="Enter your phone number"
            required
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
          )}
        </div>

        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="gender" className={POPUP_STYLES.label}>
            Gender (Optional)
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ''}
            onChange={handleInputChange}
            className={POPUP_STYLES.select}
          >
            {GENDER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="profession" className={POPUP_STYLES.label}>
            Profession (Optional)
          </label>
          <select
            id="profession"
            name="profession"
            value={formData.profession || ''}
            onChange={handleInputChange}
            className={POPUP_STYLES.select}
          >
            {PROFESSION_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={POPUP_STYLES.formGroup}>
          <label htmlFor="interest_reason" className={POPUP_STYLES.label}>
            Why are you interested? (Optional)
          </label>
          <textarea
            id="interest_reason"
            name="interest_reason"
            value={formData.interest_reason || ''}
            onChange={handleInputChange}
            rows={3}
            className={POPUP_STYLES.textarea}
            placeholder="Tell us what interests you about LawVriksh..."
          />
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
            {isSubmitting ? 'Submitting...' : 'Join Waiting List'}
          </button>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;
