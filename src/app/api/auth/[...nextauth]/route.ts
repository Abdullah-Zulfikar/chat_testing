import NextAuth from "next-auth";

import { authOptions } from "@/lib/authOptions";

// Define NextAuth configuration
const handler = NextAuth(authOptions)

// Use the handler as the default export
export { handler as GET, handler as POST };