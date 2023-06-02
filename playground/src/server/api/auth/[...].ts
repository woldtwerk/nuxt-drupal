import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt_decode from "jwt-decode"

// declare module "next-auth" {
//   interface Session {
//     user?: DefaultSession["user"] & {
//       id?: string
//       username?: string
//     }
//   }
// }

type DecodedUserInfo = {
  id: string
  email: string
  username: string
  field_name: string
}

const runtimeConfig = useRuntimeConfig()

// export default NuxtAuthHandler({
//   // secret needed to run nuxt-auth in production mode (used to encrypt data)
//   secret: process.env.NUXT_SECRET,
//   providers: [
//       // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
//       // GithubProvider.default({
//       //     clientId: process.env.GITHUB_CLIENT_ID,
//       //     clientSecret: process.env.GITHUB_CLIENT_SECRET
//       // }),
//       // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
//       CredentialsProvider.default({
//           // The name to display on the sign in form (e.g. 'Sign in with...')
//           name: 'Credentials',
//           // The credentials is used to generate a suitable form on the sign in page.
//           // You can specify whatever fields you are expecting to be submitted.
//           // e.g. domain, username, password, 2FA token, etc.
//           // You can pass any HTML attribute to the <input> tag through the object.
//           credentials: {
//             username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
//             password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
//           },
//           authorize (credentials: any) {
//             // You need to provide your own logic here that takes the credentials
//             // submitted and returns either a object representing a user or value
//             // that is false/null if the credentials are invalid.
//             // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

//             const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2', image: 'https://avatars.githubusercontent.com/u/25911230?v=4' }

//             if (credentials?.username === user.username && credentials?.password === user.password) {
//               // Any object returned will be saved in `user` property of the JWT
//               return user
//             } else {
//               // eslint-disable-next-line no-console
//               console.error('Warning: Malicious login attempt registered, bad credentials provided')

//               // If you return null then an error will be displayed advising the user to check their details.
//               return null

//               // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//             }
//           }
//       })
//   ]
// })

export default NuxtAuthHandler({
    providers: [
        // CredentialsProvider({
        //   name: "Credentials",
        //   credentials: {
        //     username: { label: "Username", type: "text", placeholder: "Username" },
        //     password: { label: "Password", type: "password" },
        //   },
        //   async authorize(credentials) {
        //     const formData = new URLSearchParams()

        //     formData.append("grant_type", "password")
        //     formData.append("client_id", runtimeConfig.OAUTH_CLIENT_ID)
        //     formData.append("client_secret", runtimeConfig.OAUTH_CLIENT_SECRET)
        //     formData.append("username", credentials.username)
        //     formData.append("password", credentials.password)

        //     const response = await fetch(
        //       `${runtimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
        //       {
        //         method: "POST",
        //         body: formData,
        //         headers: {
        //           "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //       }
        //     )

        //     const data = await response.json()

        //     if (response.ok && data?.access_token) {
        //       return data
        //     }

        //     return null
        //   },
        // }),
        {
          id: "drupal",
          name: "Next.js for Drupal",
          type: "oauth",
          version: "2.0",
          token: `${runtimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
          authorization: {
            url: `${runtimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/authorize`,
            params: { grant_type: "authorization_code", scope: "authenticated" },
          },
          // idToken: true,
          userinfo: `${runtimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/userinfo`,
          async profile(profile) {
            return {
              id: profile.sub,
              username: profile.preferred_username,
              name: profile.field_name,
              email: profile.email,
            }
          },
          clientId: runtimeConfig.OAUTH_CLIENT_ID,
          clientSecret: runtimeConfig.OAUTH_CLIENT_SECRET,
        },
    ],
    // secret: runtimeConfig.NEXTAUTH_SECRET,
    // callbacks: {
    //   async jwt({ token, user }) {
    //     // Forward the access token, refresh token and expiration date from user.
    //     // We'll use to handle token refresh.
    //     if (user) {
    //       token.accessToken = user.access_token
    //       token.accessTokenExpires =
    //         Date.now() + (user.expires_in as number) * 1000
    //       token.refreshToken = user.refresh_token
    //     }

    //     // If token has not expired, return it,
    //     if (Date.now() < token.accessTokenExpires) {
    //       return token
    //     }

    //     // Otherwise, refresh the token.
    //     return refreshAccessToken(token)
    //   },
    //   async session({ session, token }) {
    //     if (token?.accessToken) {
    //       session.accessToken = token.accessToken

    //       // Decode token and pass info to session.
    //       // This is used for the Password Grant.
    //       const decoded = jwt_decode<DecodedUserInfo>(token.accessToken as string)
    //       session.user.id = decoded.id
    //       session.user.email = decoded.email
    //       session.user.username = decoded.username
    //       session.user.name = decoded.field_name
    //       session.error = token.error
    //     }
    //     return session
    //   },
    // },
})

// Helper to obtain a new access_token from a refresh token.
// async function refreshAccessToken(token) {
//   try {
//     const formData = new URLSearchParams()

//     formData.append("grant_type", "refresh_token")
//     formData.append("client_id", runtimeConfig.OAUTH_CLIENT_ID)
//     formData.append("client_secret", runtimeConfig.OAUTH_CLIENT_SECRET)
//     formData.append("refresh_token", token.refreshToken)

//     const response = await fetch(
//       `${runtimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
//       {
//         method: "POST",
//         body: formData,
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     )

//     const data = await response.json()

//     if (!response.ok) {
//       throw new Error()
//     }

//     return {
//       ...token,
//       accessToken: data.access_token,
//       accessTokenExpires: Date.now() + data.expires_in * 1000,
//       refreshToken: data.refresh_token ?? token.refreshToken,
//     }
//   } catch (error) {
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     }
//   }
// }
