// import configuration from "./data/configuration.json";
// import nonAuthConfiguration from "./data/nonAuthConfiguration.json";

// const DATA_LIST: any = {
//   "/auth/configurations/": {
//     auth: {
//       GET: configuration,
//     },
//     nonAuth: {
//       GET: nonAuthConfiguration,
//     },
//   },
// };

// export const renderLocalData = async ({
//   url,
//   method,
//   token,
// }: {
//   url: string;
//   method: string;
//   token: string | undefined;
// }) => {
//   const currentData = DATA_LIST[url];

//   if (!currentData) {
//     return undefined;
//   }

//   const methodType = token ? "auth" : "nonAuth";
//   const data = currentData[methodType][method];

//   // Simulate async delay, you can remove this if unnecessary
//   await new Promise((resolve) => setTimeout(resolve, 100));

//   return data;
// };
