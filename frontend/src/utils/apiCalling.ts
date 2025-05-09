// import { authOptions } from "@/lib/authOptions";
// import { mockApiEndpoint } from "./constants";
// import { getServerSession } from "next-auth";
// import { signOut } from "next-auth/react";
// export type MethodType = "GET" | "POST" | "OPTIONS" | "PATCH" | "DELETE";
// export type HeaderType = Record<string, string>;

// export type ConfigType = {
//   method: MethodType;
//   headers: HeaderType;
//   body?: any;
//   cache: "no-store";
//   timeout?: number;
// };

// export type ServerActionsType = {
//   url: string;
//   id: string;
//   method: MethodType;
//   data?: any;
//   token?: string;
// };
// export type IsApiCallingOverriddenType = {
//   url: string;
//   id: string;
//   method: MethodType;
// };

// const LOCAL_NEXT_PUBLIC_API_URL = process.env.LOCAL_NEXT_PUBLIC_API_URL;
// const LIVE_NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// const isApiCallingOverridden = ({
//   url,
//   id,
//   method,
// }: IsApiCallingOverriddenType) => {
//   const responseData = mockApiEndpoint.find(
//     (item: IsApiCallingOverriddenType) =>
//       item.url === url && item.method === method
//   );

//   if (responseData) {
//     return true;
//   }
//   return false;
// };

// export async function apiCalling({
//   url,
//   id,
//   method,
//   data,
//   token,
// }: ServerActionsType) {
//   const session: any = await getServerSession(authOptions);
//   let isTokenExist = undefined;
//   try {
//     const headers: HeaderType = {
//       "Content-Type": "application/json",
//     };

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//       isTokenExist = token;
//     }

//     if (session?.user?.loginProvider === "google" && session?.user?.email) {
//       const masterToken = process.env.NEXT_AUTH_TOKEN;
//       headers["Authorization"] = `Bearer ${masterToken}`;
//       isTokenExist = masterToken;
//     }
//     if (data && data instanceof FormData) {
//       delete headers["Content-Type"];
//     }

//     //Init Api Parameter
//     const config: ConfigType = {
//       method: method,
//       headers: headers,
//       cache: "no-store",
//       timeout: 3000,
//     };

//     if (session?.user?.email) {
//       headers["user_email"] = session?.user?.email;
//     }

//     //Add Data if Data Available
//     if (data) {
//       //Check If data contains Any one upload
//       if (data instanceof FormData) {
//         config.body = data;
//       } else {
//         config.body = JSON.stringify(data);
//       }
//     }

//     //render API IP Address
//     const BASE_URL = isApiCallingOverridden({ url, id, method })
//       ? LOCAL_NEXT_PUBLIC_API_URL
//       : LIVE_NEXT_PUBLIC_API_URL;

//     //Check if url is full url or only entity name
//     const NEXT_PUBLIC_API_URL =
//       url.startsWith("http://") || url.startsWith("https://")
//         ? url
//         : `${BASE_URL}${url}`;
//     const localData = await renderLocalData({
//       url: url,
//       method: method,
//       token: isTokenExist,
//     });

//     if (localData) {
//       return { [id]: { success: localData } };
//     }
//     const startTime = performance.now();
//     const response = await fetch(NEXT_PUBLIC_API_URL, config);

//     const endTime = performance.now();
//     const elapsedTime = endTime - startTime;

//     console.log(
//       `API Request: ${method} ${NEXT_PUBLIC_API_URL}, Elapsed Time: ${elapsedTime.toFixed(
//         2
//       )} ms`
//     );
//     //Check API Error
//     if (!response.ok) {
//       //Logout If TOken Expired
//       if (response.status === 403 || response.status === 401) {
//         await signOut();
//       }
//       const error: any = {
//         type: response.type,
//         url: response.url,
//         status: response.status,
//         statusText: response.statusText,
//         error: true,
//       };

//       //Set Validation Error
//       if (response.status === 400) {
//         const formError = await response.json();
//         error["formError"] = formError;
//       }

//       // Return Error
//       return { [id]: { error: error } };
//     }

//     // Check API Response Type

//     const contentType = await response?.headers
//       ?.get("Content-Type")
//       ?.includes("json");

//     if (method === "DELETE" && response?.status === 204) {
//       return { [id]: { message: "Success" } };
//     }

//     if (contentType) {
//       return {
//         [id]: {
//           success:
//             method === "DELETE"
//               ? { message: "success" }
//               : await response.json(),
//         },
//       };
//     } else {
//       return { [id]: { success: await response.blob() } };
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
