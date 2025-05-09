// "use server";
// import { apiCalling, getCurrentToken } from "./utils";

// export const serverActions = async (prop: Array<ServerActionsType>) => {
//   const token = await getCurrentToken();
//   const data = prop.map((item: any) => {
//     return apiCalling({ url: item.url, id: item.id, method: item.method, data: item.data, token: token });
//   });
//   const tempData = await Promise.all(data);

//   let newData = {};
//   tempData?.forEach((item: any) => {
//     if (item) {
//       const key = Object.keys(item)?.[0];
//       const value = Object.values(item)?.[0];
//       newData = { ...newData, [key]: value };
//     }
//   });

//   return newData;
// };
