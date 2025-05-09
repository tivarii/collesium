import axios, { AxiosError } from "axios";

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
  }
  
export const register = async (username: string, email: string, password: string) => {
  
    const payload: RegisterPayload = {
      username: username,
      email: email,
      password: password,
    };
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup/`, payload);
      console.log("response in register:",response)
      return response;
    }
    catch(err){
      // console.log("error in register:",err as AxiosError)
      return err as AxiosError;
    }
  };