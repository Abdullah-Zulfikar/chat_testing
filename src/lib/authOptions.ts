
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

// Define NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
    
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Optionally check if this is the user's first sign in
      // (for example, by sending a request to your Django endpoint
      // and checking if the user already exists)

      // Send user info to your Django backend
      await fetch(`${process.env.DJANGO_BACKEND_URL || "http://localhost:8000"}/api/auth/first-signin/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account?.provider
          // add more properties as needed
        })
      });
      return true;
    },
                // This callback controls where to redirect the user after sign in.
      async redirect({ baseUrl }) {
        // Redirect to the dashboard page regardless of the callbackUrl parameter
        return `${baseUrl}/register`;
      }

  }
}; 

// Use the handler as the default export