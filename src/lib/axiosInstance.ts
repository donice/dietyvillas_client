import axios from 'axios';

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/core',
});

axiosInstance.interceptors.request.use(
  (config) => {
    let userData = null;
    if (typeof window !== 'undefined') {
      userData = window.sessionStorage.getItem('USER_DATA');
    }
    config.headers['Authorization'] = axios.defaults.headers.common['Authorization'];
    config.headers['lang'] = 'en';
    config.headers['UserType'] = '1';
    config.headers['userId'] = userData ? `${JSON.parse(userData).email}` : '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;


interface FetchOptions extends RequestInit {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
}
interface CustomError extends Error {
  data?: unknown;
}
export async function https<T>(
  url: string = base_url as string,
  options: FetchOptions,
  params?: Record<string, string>
): Promise<T> {
  if (params) {
    if (options.method === "GET" || options.method === "HEAD") {
      const urlParams = new URLSearchParams(params);
      url += `?${urlParams.toString()}`;
    }
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      // Optionally handle non-2xx responses
      const error: CustomError = new Error(`HTTP error! status: ${res.status}`);
      error.data = await res.json();
      throw error;
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    // Improved error handling
    if (error instanceof Error) {
      // console.log({ u: error.stack });
      // console.error(`Fetch error: ${error.message}`);
      throw error;
    }
    console.error("Unknown error: error");
    throw new Error("Unknown error occurred during fetch");
  }
}