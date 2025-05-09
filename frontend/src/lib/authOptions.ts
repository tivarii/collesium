// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";
// import { jwtDecode } from "jwt-decode";
// import GoogleProvider from "next-auth/providers/google";
// import LinkedIn from "next-auth/providers/linkedin";
// import FacebookProvider from "next-auth/providers/facebook";

// const LINKEDIN_CLIENT_ID = "86ixejmlseq24g";
// const LINKEDIN_CLIENT_SECRET = "WPL_AP1.E1TDp4cQ4B8MiJrm.dkve5g==";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

// const FACEBOOK_CLIENT_ID = "356913660774012";
// const FACEBOOK_CLIENT_SECRET = "196dd0e5879e85ce643a8a19b45d65d7";

// async function refreshAccessToken(refreshToken: string) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh-token`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refresh: refreshToken }),
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to refresh token");
//     }

//     const data = await res.json();
//     return {
//       accessToken: data.token,
//       refreshToken: data.refresh_token ?? refreshToken, // Use new refreshToken if provided
//     };
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     return null;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       async profile(profile) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/social-login/`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: profile.email,
//               provider: "google",
//             }),
//           }
//         );

//         const data = await res.json();

//         return {
//           id: profile.sub, // Explicitly set 'id' from 'sub'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           accessToken: data.token,
//           refreshToken: data.refresh_token,
//           isAdmin: data.is_admin,
//         };
//       },
//     }),
//     LinkedIn({
//       clientId: LINKEDIN_CLIENT_ID,
//       clientSecret: LINKEDIN_CLIENT_SECRET,
//       authorization: {
//         url: "https://www.linkedin.com/oauth/v2/authorization",
//         params: { scope: "openid profile email" },
//       },
//       token: "https://www.linkedin.com/oauth/v2/accessToken",
//       userinfo: "https://api.linkedin.com/v2/userinfo",
//       issuer: "https://www.linkedin.com/oauth",
//       jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
//       async profile(profile) {
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/social-login/`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 email: profile.email,
//                 provider: "linkedin",
//               }),
//             }
//           );

//           if (!res.ok) {
//             throw new Error(`Failed to authenticate: ${res.statusText}`);
//           }

//           const data = await res.json();

//           return {
//             id: profile.sub, // LinkedIn OpenID Connect uses 'sub' as a unique identifier
//             name:
//               profile.name ??
//               profile.localizedFirstName + " " + profile.localizedLastName,
//             email: profile.email,
//             image:
//               profile.picture ??
//               "https://cdn-icons-png.flaticon.com/512/174/174857.png",
//             accessToken: data.token || null,
//             refreshToken: data.refresh_token || null,
//             isAdmin: data.is_admin ?? false,
//           };
//         } catch (error) {
//           console.error("Error in LinkedIn profile function:", error);
//           return {
//             id: profile.sub,
//             name: profile.name ?? "LinkedIn User",
//             email: profile.email,
//             image:
//               profile.picture ??
//               "https://cdn-icons-png.flaticon.com/512/174/174857.png",
//             accessToken: null,
//             refreshToken: null,
//             isAdmin: false,
//           };
//         }
//       },
//     }),
//     FacebookProvider({
//       clientId: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       async profile(profile) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/social-login/`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: profile.email,
//               provider: "facebook",
//             }),
//           }
//         );

//         const data = await res.json();
//         return {
//           ...profile,
//           accessToken: data.token,
//           refreshToken: data.refresh_token,
//           isAdmin: data.is_admin,
//         };
//       },
//     }),
//     CredentialsProvider({
//       name: "Email",
//       credentials: {
//         identifier: {
//           label: "Username",
//           type: "text",
//           placeholder: "your-email@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_URL}/noauth/api/login-via-email/password/`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 username: credentials?.identifier,
//                 password: credentials?.password,
//               }),
//             }
//           );

//           // console.log("credentials", credentials);

//           // console.log("res", res);

//           if (!res.ok) {
//             throw new Error("Invalid credentials");
//           }

//           const user = await res.json();

//           if (user.token) {
//             const accessTokenDecode = jwtDecode(user.token);
//             const refreshTokenDecode = jwtDecode(user.token);
//             return {
//               id: accessTokenDecode.user_id.toString(),
//               name: accessTokenDecode.email,
//               email: credentials?.identifier,
//               accessToken: user.token,
//               refreshToken: user.refresh_token,
//               isAdmin: user.is_admin,
//             };
//           }

//           return null;
//         } catch (error) {
//           console.error("Login error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, trigger, session, account }) {
//       if (
//         account &&
//         "access_token" in account &&
//         account?.provider === "google"
//       ) {
//         return {
//           ...token,
//           ...user,
//           ...{ token: account.access_token, loginProvider: "google" },
//         };
//       }
//       if (
//         account &&
//         "access_token" in account &&
//         account?.provider === "linkedin"
//       ) {
//         return {
//           ...token,
//           ...user,
//           ...{ token: account.access_token, loginProvider: "linkedin" },
//         };
//       }
//       if (
//         account &&
//         "access_token" in account &&
//         account?.provider === "facebook"
//       ) {
//         return {
//           ...token,
//           ...user,
//           ...{ token: account.access_token, loginProvider: "facebook" },
//         };
//       }

//       if (user) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//         token.isAdmin = user.isAdmin;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.user.accessToken = token.accessToken as string;
//       session.user.refreshToken = token.refreshToken as string;
//       session.user.isAdmin = token.isAdmin as boolean;
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       return `${baseUrl}/dashboard`; // Redirect after login
//     },
//   },
//   pages: {
//     signIn: "/auth/login", // Redirect users to a custom sign-in page
//   },
//   events: {
//     // async signOut({ token }) {
//     //   // Handle user logout (optional)
//     // },
//   },
//   session: {
//     strategy: "jwt",
//   },

//   // secret: process.env.NEXTAUTH_SECRET,
//   secret: process.env.NEXTAUTH_SECRET,
// };
