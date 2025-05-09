import axios from "axios";
import { AxiosError } from "axios";

export const login = async (email: string, password: string) => {
    const payload = {
        username: email,
        password: password,
    };

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signin/`, payload);
        // console.log("response in signin:", response)
        if(response?.status === 200){
            localStorage.setItem("access_token", response?.data?.tokens?.access);
            localStorage.setItem("refresh_token", response?.data?.tokens?.refresh);
            // console.log("local storage set");
            // console.log("access_token:", localStorage.getItem("access_token"));
            // console.log("refresh_token:", localStorage.getItem("refresh_token"));
        }
        return response;
    }
    catch (err) {
        console.log("error in signin:", err as AxiosError)
        return err as AxiosError;
    }
};