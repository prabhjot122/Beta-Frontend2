// Type definitions for the LawVriksh application

export type UserType = 'user' | 'creator';

export type PopupType = 'form' | 'thankyou' | 'features' | 'feedback' | 'viewmore' | 'notinterested';

// Backend enum types matching Pydantic models
export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';
export type Profession = 'Student' | 'Lawyer' | 'Other';
export type NotInterestedReason = 'Too complex' | 'Not relevant' | 'Other';
export type FollowUpConsent = 'yes' | 'no';

// User registration data matching backend UserData model
export interface RegistrationFormData {
  name: string;
  email: string;
  phone_number: string;
  gender?: Gender;
  profession?: Profession;
  interest_reason?: string;
  user_type: UserType;
}

// Not interested data matching backend NotInterestedData model
export interface NotInterestedFormData {
  name: string;
  email: string;
  phone_number: string;
  gender?: Gender;
  profession?: Profession;
  not_interested_reason?: NotInterestedReason;
  improvement_suggestions?: string;
  interest_reason?: string;
}

// Feedback data matching backend FeedbackData model
export interface FeedbackFormData {
  user_email?: string;

  // Digital Presence Questions
  digital_work_showcase_effectiveness?: number; // 1-5 scale
  legal_persons_online_recognition?: string; // Yes/No
  digital_work_sharing_difficulty?: number; // 1-5 scale

  // Blogging and Sharing Insights
  regular_blogging?: string; // Yes/No
  ai_tools_blogging_frequency?: string; // Never/Rarely/Sometimes/Often/Always
  blogging_tools_familiarity?: number; // 1-5 scale

  // Expectations from Blogging Platform
  core_platform_features?: string;
  ai_research_opinion?: string;
  ideal_reading_features?: string;
  portfolio_presentation_preference?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Component Props Interfaces
export interface HeaderProps {
  onViewMoreClick: () => void;
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: PopupType;
  userType?: UserType;
  isNotInterested?: boolean;
  feedbackSubmitted?: boolean;
  onUserTypeClick?: (type: UserType) => void;
  onNotInterestedClick?: () => void;
  onFeaturesClick?: () => void;
  onFeedbackClick?: () => void;
  onAdminClick?: () => void;
}

export interface FormComponentProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitError: string;
}

export interface RegistrationFormProps extends FormComponentProps {
  formData: RegistrationFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  userType: UserType;
}

export interface NotInterestedFormProps extends FormComponentProps {
  formData: NotInterestedFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface FeedbackFormProps extends FormComponentProps {
  formData: FeedbackFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface AdminLoginProps {
  onLogin: () => void;
}

export interface AdminDashboardProps {
  onLogout: () => void;
}

// Feature data interface
export interface Feature {
  title: string;
  description: string;
}

// Constants
export const FEATURES: Feature[] = [
  {
    title: "Profit-Oriented Credit System",
    description: "Empower legal bloggers with a structured, revenue-generating credit and reward system."
  },
  {
    title: "AI-Assisted Blog Reader Tools",
    description: "Smart Listener converts blog posts into audio for hands-free reading. AI Summarizer provides concise summaries of long legal blogs. Content Highlighter automatically highlights key legal points, references, and arguments."
  },
  {
    title: "AI-Powered Blog Writing Assistance",
    description: "SEO Optimizer enhances blog visibility with AI-driven SEO recommendations. Humanizer refines AI-generated content to sound more natural and personal. Outline Generator creates structured blog outlines based on legal topics."
  },
  {
    title: "Research Mode for Legal Blog Writing",
    description: "Integrated AI tools to conduct topic-specific legal research and cite authoritative sources while writing."
  },
  {
    title: "Digital Presence Enhancement",
    description: "Multiple Themes – Choose from customizable themes tailored for legal professionals. Profile Management – Manage, update, and showcase your legal blogging profile. AI-Powered Profile Writer – Automatically drafts compelling bios and profile descriptions."
  },
  {
    title: "Build & Grow Your Legal Blogging Community",
    description: "Writer Interaction – Connect, follow, and engage with your favorite legal authors. Get Noticed – Boost visibility within the community through quality content and engagement."
  }
];

// Backend response types
export interface BaseResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  gender?: string;
  profession?: string;
  interest_reason?: string;
  created_at: string;
}

export interface NotInterestedResponse {
  id: number;
  name: string;
  email: string;
  not_interested_reason?: string;
  improvement_suggestions?: string;
  created_at: string;
}

export interface FeedbackResponse {
  id: number;
  user_email?: string;
  created_at: string;
}

export interface AdminTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Form options matching backend enums
export const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' }
];

export const PROFESSION_OPTIONS = [
  { value: '', label: 'Select Profession' },
  { value: 'Student', label: 'Student' },
  { value: 'Lawyer', label: 'Lawyer' },
  { value: 'Other', label: 'Other' }
];

export const NOT_INTERESTED_REASON_OPTIONS = [
  { value: '', label: 'Select Reason' },
  { value: 'Too complex', label: 'Too complex' },
  { value: 'Not relevant', label: 'Not relevant' },
  { value: 'Other', label: 'Other' }
];

// Options for new feedback questions
export const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
];

export const AI_TOOLS_FREQUENCY_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'often', label: 'Often' },
  { value: 'always', label: 'Always' }
];

export const RATING_SCALE = [1, 2, 3, 4, 5];

export const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
};
