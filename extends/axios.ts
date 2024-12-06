import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders, AxiosRequestHeaders } from 'axios';

class CustomAxios {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND, // Assuming this is your base URL
        });

        // Add a request interceptor to automatically add JWT token to headers
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers = ({
                        ...(config.headers),
                        Authorization: `Bearer ${token}`
                    } as AxiosRequestHeaders);
                }
                return config;
            },
            (error: AxiosError<any>) => {
                return Promise.reject(error);
            }
        );

        // You can also add response interceptors if needed
        // this.instance.interceptors.response.use(...)
    }

    // Methods to make HTTP requests
    public async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.post(url, data, config);
    }

    public async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.get(url, config);
    }

    public async put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.put(url, data, config);
    }

    // Add other HTTP methods as needed
}

// Create a singleton instance of CustomAxios
const customAxios = new CustomAxios();

export default customAxios;
