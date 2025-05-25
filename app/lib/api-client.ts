import { ApiError } from '@/types/TPost';
import axios, { AxiosInstance, AxiosError } from 'axios';



class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 30000, // Increased to 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add retry logic
    this.client.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        const config = error.config;
        

        const apiError: ApiError = {
          message: error.message || 'An error occurred',
          status: error.response?.status || 500,
          data: error.response?.data
        };
        return Promise.reject(apiError);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Generic GET method
  async get<T>(endpoint: string, params?: object): Promise<T> {
    try {
      return await this.client.get(endpoint, { params });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic POST method
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      return await this.client.post(endpoint, data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): ApiError {
    if (error.status) return error; // Already formatted by interceptor
    return {
      message: 'An unexpected error occurred',
      status: 500,
      data: error
    };
  }
}

export const apiClient = ApiClient.getInstance();