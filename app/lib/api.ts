// API client service for backend integration

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from './constants';
import { auth } from './auth';
import type {
  BaseResponse,
  AdminCredentials,
  AdminTokenResponse,
  RegistrationFormData,
  NotInterestedFormData,
  FeedbackFormData,
  UserResponse,
  NotInterestedResponse,
  FeedbackResponse
} from './types';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth header
    this.client.interceptors.request.use(
      (config) => {
        const authHeader = auth.getAuthHeader();
        if (authHeader) {
          config.headers.Authorization = authHeader;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError = this.handleError(error);
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Handle API errors and convert to standardized format
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 401:
          auth.logout(); // Clear invalid token
          return {
            message: ERROR_MESSAGES.UNAUTHORIZED,
            status,
            code: 'UNAUTHORIZED'
          };
        case 422:
          return {
            message: data?.detail || ERROR_MESSAGES.VALIDATION_ERROR,
            status,
            code: 'VALIDATION_ERROR'
          };
        case 500:
          return {
            message: ERROR_MESSAGES.SERVER_ERROR,
            status,
            code: 'SERVER_ERROR'
          };
        default:
          return {
            message: data?.message || ERROR_MESSAGES.UNKNOWN_ERROR,
            status,
            code: 'API_ERROR'
          };
      }
    } else if (error.request) {
      // Network error
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        code: 'NETWORK_ERROR'
      };
    } else {
      // Other error
      return {
        message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
        code: 'UNKNOWN_ERROR'
      };
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<any> {
    const response = await this.client.get(API_ENDPOINTS.HEALTH_CHECK);
    return response.data;
  }

  // Authentication endpoints
  /**
   * Admin login
   */
  async adminLogin(credentials: AdminCredentials): Promise<BaseResponse> {
    const response = await this.client.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
    return response.data;
  }

  /**
   * Verify admin token
   */
  async verifyAdminToken(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.ADMIN_VERIFY);
    return response.data;
  }

  // User management endpoints
  /**
   * Register user
   */
  async registerUser(userData: RegistrationFormData): Promise<BaseResponse> {
    const response = await this.client.post(API_ENDPOINTS.REGISTER_USER, userData);
    return response.data;
  }

  /**
   * Register creator
   */
  async registerCreator(userData: RegistrationFormData): Promise<BaseResponse> {
    const response = await this.client.post(API_ENDPOINTS.REGISTER_CREATOR, userData);
    return response.data;
  }

  /**
   * Submit not interested feedback
   */
  async submitNotInterested(data: NotInterestedFormData): Promise<BaseResponse> {
    const response = await this.client.post(API_ENDPOINTS.SUBMIT_NOT_INTERESTED, data);
    return response.data;
  }

  /**
   * Submit feedback
   */
  async submitFeedback(data: FeedbackFormData): Promise<BaseResponse> {
    const response = await this.client.post(API_ENDPOINTS.SUBMIT_FEEDBACK, data);
    return response.data;
  }

  // Admin-only endpoints
  /**
   * Get all registered users (Admin only)
   */
  async getUsers(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.GET_USERS);
    return response.data;
  }

  /**
   * Get all registered creators (Admin only)
   */
  async getCreators(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.GET_CREATORS);
    return response.data;
  }

  /**
   * Get all feedback (Admin only)
   */
  async getFeedback(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.GET_FEEDBACK);
    return response.data;
  }

  /**
   * Get user analytics (Admin only)
   */
  async getUserAnalytics(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.USER_ANALYTICS);
    return response.data;
  }

  /**
   * Get feedback analytics (Admin only)
   */
  async getFeedbackAnalytics(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.FEEDBACK_ANALYTICS);
    return response.data;
  }

  /**
   * Get feedback summary (Admin only)
   */
  async getFeedbackSummary(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.FEEDBACK_SUMMARY);
    return response.data;
  }

  /**
   * Download all data (Admin only)
   */
  async downloadData(): Promise<BaseResponse> {
    const response = await this.client.post(API_ENDPOINTS.DOWNLOAD_DATA, {});
    return response.data;
  }

  /**
   * Export data as JSON (Admin only)
   */
  async exportDataJson(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.EXPORT_JSON);
    return response.data;
  }

  /**
   * Get comprehensive statistics (Admin only)
   */
  async getStats(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.GET_STATS);
    return response.data;
  }

  /**
   * Get all not interested responses (Admin only)
   */
  async getNotInterestedResponses(): Promise<BaseResponse> {
    const response = await this.client.get('/api/users/notintdata');
    return response.data;
  }

  /**
   * Export not interested data (Admin only)
   */
  async exportNotInterestedData(): Promise<BaseResponse> {
    const response = await this.client.get(API_ENDPOINTS.EXPORT_NOT_INTERESTED);
    return response.data;
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Convenience functions for common operations
export const api = {
  // Health check
  healthCheck: () => apiClient.healthCheck(),

  // Authentication
  login: (credentials: AdminCredentials) => apiClient.adminLogin(credentials),
  verifyToken: () => apiClient.verifyAdminToken(),

  // Public endpoints
  registerUser: (data: RegistrationFormData) => apiClient.registerUser(data),
  registerCreator: (data: RegistrationFormData) => apiClient.registerCreator(data),
  submitNotInterested: (data: NotInterestedFormData) => apiClient.submitNotInterested(data),
  submitFeedback: (data: FeedbackFormData) => apiClient.submitFeedback(data),

  // Admin endpoints
  getUsers: () => apiClient.getUsers(),
  getCreators: () => apiClient.getCreators(),
  getFeedback: () => apiClient.getFeedback(),
  getUserAnalytics: () => apiClient.getUserAnalytics(),
  getFeedbackAnalytics: () => apiClient.getFeedbackAnalytics(),
  getFeedbackSummary: () => apiClient.getFeedbackSummary(),
  downloadData: () => apiClient.downloadData(),
  exportDataJson: () => apiClient.exportDataJson(),
  getStats: () => apiClient.getStats(),
  getNotInterestedResponses: () => apiClient.getNotInterestedResponses(),
  exportNotInterestedData: () => apiClient.exportNotInterestedData(),
};
