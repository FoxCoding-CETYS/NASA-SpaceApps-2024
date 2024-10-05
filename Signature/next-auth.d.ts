import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    cel: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      mayor: string;
      cel: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
    cel: string;
  }
}
