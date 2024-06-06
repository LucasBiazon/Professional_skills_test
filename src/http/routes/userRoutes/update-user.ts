import { FastifyInstance } from "fastify";
import { authenticate } from "../../../utils/tokenAuthVerification";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateUser(app: FastifyInstance){
  app.put('/user/update', async (request, reply) => {
    try{
      const decodedToken = await authenticate(app, request, reply);
      if (!decodedToken) {
        return reply.status(401).send('Unauthorized');
      }

      const requestId = Object.entries(decodedToken)[0];
      const userId = requestId[1];

      const requestUpdateUserBody = z.object({
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        password: z.string().min(8).optional(),
        bio: z.string().optional(),
        avartarUrl: z.string().url().optional()
      }).strict();

      const requestUpdateUser = requestUpdateUserBody.safeParse(request.body);

      if (!requestUpdateUser.success) {
        return reply.status(400).send({ error: 'Invalid request body', details: requestUpdateUser.error.errors });
      }

      await prisma.user.update({
        where: {id: userId},
        data: {
          ...requestUpdateUser.data
        }
      });

      reply.status(200).send({message: 'Success'});
    }catch(err){
      reply.code(500).send({ error: err });
    }
  });
}