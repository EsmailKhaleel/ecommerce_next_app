const BASE_URL = 'https://lackadaisical-quintessential-racer.glitch.me';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { timeout = 5000, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  get<T>(endpoint: string, options?: FetchOptions) {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, data: { [key: string]: unknown }, options?: FetchOptions) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: { [key: string]: unknown }, options?: FetchOptions) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string, options?: FetchOptions) {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient(BASE_URL);

// Example

// const fetchSingleProduct = async (id: string) => {
//   return await api.get<Product>(`/products/${id}`);
// };

// const createProduct = async (product: Omit<Product, 'id'>) => {
//   return await api.post<Product>('/products', product);
// };

// const updateProduct = async (id: string, updates: Partial<Product>) => {
//   return await api.put<Product>(`/products/${id}`, updates);
// };

// const deleteProduct = async (id: string) => {
//   return await api.delete(`/products/${id}`);
// };