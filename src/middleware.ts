export { default } from "next-auth/middleware"

export const config = { matcher: ["/applications/(.*)", "/transactions/(.*)", "/api/crud/(.*)", "/api/transactions/(.*)"] }