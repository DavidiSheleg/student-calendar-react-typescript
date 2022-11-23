import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../app/hooks";

type reqType = {
  method: string,
  url: string,
  baseURL: string,
  headers?: {}
}
export const useAxios = (url: string, method: string) => {

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const { access_token } = useAppSelector((state) => state.auth.user);

  const req: reqType = {
    method,
    url,
    baseURL: 'http://localhost:4000/',
  };

  if (access_token)
    req.headers = {
      'Authorization': `Bearer ${access_token}`
    }

  const axiosReq = async (payload: any = null, customURL: string | null = null) => {
    setError('');
    try {
      if (customURL)
        req.url = customURL;

      const response = await axios.request({
        ...req,
        data: payload
      });
      //console.log(response);
      setData(response.data);
    } catch (error: any) {
      if (error.response?.data?.error)
        setError(error.response.data.error);
      else
        setError(error.message);
    } finally {
      setLoaded(true);
    }
  };


  return { data, error, loaded, axiosReq };
};