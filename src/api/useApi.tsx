import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const useApi = <T,>(initialUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (
    url: string = initialUrl,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: any = null,
    headers: AxiosHeaders | undefined = undefined 
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios({
        url,
        method,
        data: body,
        headers, 
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setData(response.data.data);
      }
    } catch (err: any) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, apiCall };
};

export default useApi;
