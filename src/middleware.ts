export { default } from 'next-auth/middleware';

export const config = {
    matcher:['/dashboard/:path*']//protege todas las rutas que estan dentro de dashboards
}