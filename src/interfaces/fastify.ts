import { FastifyInstance, FastifyReply, RouteSpecificOptions } from 'fastify';

// Temporary workaround for https://github.com/fastify/point-of-view/issues/301
export interface FastifyReplyWithView extends FastifyReply {
  view: never;
  blog<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
  blog(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
  admin<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
  admin(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
}

// Temporary workaround for https://github.com/fastify/point-of-view/issues/301
export interface FastifyInstanceWithView extends FastifyInstance {
  view: never;
  blog<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): Promise<string>;
  blog(page: string, data?: object, opts?: RouteSpecificOptions): Promise<string>;
  admin<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): Promise<string>;
  admin(page: string, data?: object, opts?: RouteSpecificOptions): Promise<string>;
}
