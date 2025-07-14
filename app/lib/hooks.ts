// React hooks for API calls and state management

import { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { auth } from './auth';
import { SUCCESS_MESSAGES } from './constants';
import type {
  AdminCredentials,
  RegistrationFormData,
  NotInterestedFormData,
  FeedbackFormData,
  BaseResponse,
  ApiError
} from './types';

export interface UseApiState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseFormSubmissionState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  successMessage: string | null;
}

/**
 * Hook for managing API call state
 */
export function useApiState<T = any>(initialData: T | null = null): UseApiState<T> & {
  setData: (data: T | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  reset: () => void;
} {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    success,
    setData,
    setLoading,
    setError,
    setSuccess,
    reset
  };
}

/**
 * Hook for admin authentication
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize authentication state on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(auth.isAuthenticated());
    }
  }, []);

  const login = useCallback(async (credentials: AdminCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.login(credentials);
      
      if (response.success && response.data) {
        auth.setToken(response.data);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    auth.logout();
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const verifyToken = useCallback(async (): Promise<boolean> => {
    if (!auth.isAuthenticated()) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const response = await api.verifyToken();
      const isValid = response.success;
      setIsAuthenticated(isValid);
      return isValid;
    } catch (err) {
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    verifyToken,
    tokenInfo: auth.getTokenInfo()
  };
}

/**
 * Hook for user registration
 */
export function useUserRegistration() {
  const [state, setState] = useState<UseFormSubmissionState>({
    isSubmitting: false,
    error: null,
    success: false,
    successMessage: null
  });

  const registerUser = useCallback(async (userData: RegistrationFormData): Promise<boolean> => {
    setState(prev => ({ ...prev, isSubmitting: true, error: null, success: false }));

    try {
      const response = await api.registerUser(userData);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.REGISTRATION_SUCCESS
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          error: response.message || 'Registration failed'
        }));
        return false;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);

  const registerCreator = useCallback(async (userData: RegistrationFormData): Promise<boolean> => {
    setState(prev => ({ ...prev, isSubmitting: true, error: null, success: false }));

    try {
      const response = await api.registerCreator(userData);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.REGISTRATION_SUCCESS
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          error: response.message || 'Registration failed'
        }));
        return false;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
      successMessage: null
    });
  }, []);

  return {
    ...state,
    registerUser,
    registerCreator,
    reset
  };
}

/**
 * Hook for not interested form submission
 */
export function useNotInterestedSubmission() {
  const [state, setState] = useState<UseFormSubmissionState>({
    isSubmitting: false,
    error: null,
    success: false,
    successMessage: null
  });

  const submit = useCallback(async (data: NotInterestedFormData): Promise<boolean> => {
    setState(prev => ({ ...prev, isSubmitting: true, error: null, success: false }));

    try {
      const response = await api.submitNotInterested(data);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.NOT_INTERESTED_SUCCESS
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          error: response.message || 'Submission failed'
        }));
        return false;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
      successMessage: null
    });
  }, []);

  return {
    ...state,
    submit,
    reset
  };
}

/**
 * Hook for feedback form submission
 */
export function useFeedbackSubmission() {
  const [state, setState] = useState<UseFormSubmissionState>({
    isSubmitting: false,
    error: null,
    success: false,
    successMessage: null
  });

  const submit = useCallback(async (data: FeedbackFormData): Promise<boolean> => {
    setState(prev => ({ ...prev, isSubmitting: true, error: null, success: false }));

    try {
      const response = await api.submitFeedback(data);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.FEEDBACK_SUCCESS
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          error: response.message || 'Submission failed'
        }));
        return false;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
      successMessage: null
    });
  }, []);

  return {
    ...state,
    submit,
    reset
  };
}

/**
 * Hook for fetching admin data (users, creators, feedback, analytics)
 */
export function useAdminData() {
  const usersState = useApiState();
  const creatorsState = useApiState();
  const feedbackState = useApiState();
  const notInterestedState = useApiState();
  const userAnalyticsState = useApiState();
  const feedbackAnalyticsState = useApiState();
  const statsState = useApiState();

  const fetchUsers = useCallback(async () => {
    usersState.setLoading(true);
    usersState.setError(null);

    try {
      const response = await api.getUsers();
      if (response.success) {
        usersState.setData(response.data);
        usersState.setSuccess(true);
      } else {
        usersState.setError(response.message || 'Failed to fetch users');
      }
    } catch (err) {
      const apiError = err as ApiError;
      usersState.setError(apiError.message);
    } finally {
      usersState.setLoading(false);
    }
  }, []);

  const fetchCreators = useCallback(async () => {
    creatorsState.setLoading(true);
    creatorsState.setError(null);

    try {
      const response = await api.getCreators();
      if (response.success) {
        creatorsState.setData(response.data);
        creatorsState.setSuccess(true);
      } else {
        creatorsState.setError(response.message || 'Failed to fetch creators');
      }
    } catch (err) {
      const apiError = err as ApiError;
      creatorsState.setError(apiError.message);
    } finally {
      creatorsState.setLoading(false);
    }
  }, []);

  const fetchFeedback = useCallback(async () => {
    feedbackState.setLoading(true);
    feedbackState.setError(null);

    try {
      const response = await api.getFeedback();
      if (response.success) {
        feedbackState.setData(response.data);
        feedbackState.setSuccess(true);
      } else {
        feedbackState.setError(response.message || 'Failed to fetch feedback');
      }
    } catch (err) {
      const apiError = err as ApiError;
      feedbackState.setError(apiError.message);
    } finally {
      feedbackState.setLoading(false);
    }
  }, []);

  const fetchNotInterested = useCallback(async () => {
    notInterestedState.setLoading(true);
    notInterestedState.setError(null);

    try {
      const response = await api.getNotInterestedResponses();
      if (response.success) {
        notInterestedState.setData(response.data);
        notInterestedState.setSuccess(true);
      } else {
        notInterestedState.setError(response.message || 'Failed to fetch not interested responses');
      }
    } catch (err) {
      const apiError = err as ApiError;
      notInterestedState.setError(apiError.message);
    } finally {
      notInterestedState.setLoading(false);
    }
  }, []);

  const fetchUserAnalytics = useCallback(async () => {
    userAnalyticsState.setLoading(true);
    userAnalyticsState.setError(null);

    try {
      const response = await api.getUserAnalytics();
      if (response.success) {
        userAnalyticsState.setData(response.data);
        userAnalyticsState.setSuccess(true);
      } else {
        userAnalyticsState.setError(response.message || 'Failed to fetch user analytics');
      }
    } catch (err) {
      const apiError = err as ApiError;
      userAnalyticsState.setError(apiError.message);
    } finally {
      userAnalyticsState.setLoading(false);
    }
  }, []);

  const fetchFeedbackAnalytics = useCallback(async () => {
    feedbackAnalyticsState.setLoading(true);
    feedbackAnalyticsState.setError(null);

    try {
      const response = await api.getFeedbackAnalytics();
      if (response.success) {
        feedbackAnalyticsState.setData(response.data);
        feedbackAnalyticsState.setSuccess(true);
      } else {
        feedbackAnalyticsState.setError(response.message || 'Failed to fetch feedback analytics');
      }
    } catch (err) {
      const apiError = err as ApiError;
      feedbackAnalyticsState.setError(apiError.message);
    } finally {
      feedbackAnalyticsState.setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    statsState.setLoading(true);
    statsState.setError(null);

    try {
      const response = await api.getStats();
      if (response.success) {
        statsState.setData(response.data);
        statsState.setSuccess(true);
      } else {
        statsState.setError(response.message || 'Failed to fetch stats');
      }
    } catch (err) {
      const apiError = err as ApiError;
      statsState.setError(apiError.message);
    } finally {
      statsState.setLoading(false);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchUsers(),
      fetchCreators(),
      fetchFeedback(),
      fetchNotInterested(),
      fetchUserAnalytics(),
      fetchFeedbackAnalytics(),
      fetchStats()
    ]);
  }, [fetchUsers, fetchCreators, fetchFeedback, fetchNotInterested, fetchUserAnalytics, fetchFeedbackAnalytics, fetchStats]);

  return {
    users: usersState,
    creators: creatorsState,
    feedback: feedbackState,
    notInterested: notInterestedState,
    userAnalytics: userAnalyticsState,
    feedbackAnalytics: feedbackAnalyticsState,
    stats: statsState,
    fetchUsers,
    fetchCreators,
    fetchFeedback,
    fetchNotInterested,
    fetchUserAnalytics,
    fetchFeedbackAnalytics,
    fetchStats,
    fetchAllData
  };
}

/**
 * Hook for health check
 */
export function useHealthCheck() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = useCallback(async () => {
    setIsChecking(true);

    try {
      const response = await api.healthCheck();
      setIsHealthy(response.status === 'healthy');
      setLastChecked(new Date());
    } catch (err) {
      setIsHealthy(false);
      setLastChecked(new Date());
    } finally {
      setIsChecking(false);
    }
  }, []);

  // Auto-check health on mount
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return {
    isHealthy,
    isChecking,
    lastChecked,
    checkHealth
  };
}
