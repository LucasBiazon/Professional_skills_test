import fastify, { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authenticateAdmin } from "../../../utils/tokenAuthVerificationAdmin";

export async function promote(app: FastifyInstance){
  app.patch('/promote', async (request, reply) => {
    try{

      authenticateAdmin(app, request, reply);

      const requestPromoteBody = z.object({
       userId: z.string().uuid()
      });

      const {userId }= requestPromoteBody.parse(request.body);

      if (!userId) {
        return reply.status(400).send({ error: 'Invalid request body'});
      }

      await prisma.user.update({
        where: {id: userId},
        data: {
          role: "admin"
        }
      });

      reply.status(200).send({message: 'Sucess'});
    }catch(err){
        reply.code(500).send({ error: err });
    }
  });
}