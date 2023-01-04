// declare module 'fastify' {
//   interface FastifyReply {
//     blog<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
//     blog(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
//     admin<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
//     admin(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
//   }

//   interface FastifyInstance {
//     blog<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): Promise<string>;
//     blog(page: string, data?: object, opts?: RouteSpecificOptions): Promise<string>;
//     admin<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): Promise<string>;
//     admin(page: string, data?: object, opts?: RouteSpecificOptions): Promise<string>;
//   }
// }
