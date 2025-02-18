import "next-auth";

declare module "next-auth"{
    interface User {
        id: string;
        username: string;
        full_name: string;
        address: string;
        role: string;
        phone_number: string;
      }
    
      interface Session {
        user: User;
      }
}