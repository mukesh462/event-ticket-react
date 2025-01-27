import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BaseUrl  = import.meta.env.VITE_REACT_APP_URL;

  const request = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: BaseUrl + url,
        data,
        ...config,
      });

      setLoading(false);

      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data || "Something went wrong");

      return err?.response?.data;
    }
  }, []);

  return { request, loading, error };
};

export default useApi;