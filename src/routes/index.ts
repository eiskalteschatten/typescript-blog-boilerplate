import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.blog('home.ejs');
  });
};
