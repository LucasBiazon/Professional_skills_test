import fastify, { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authenticateAdmin } from "../../../utils/tokenAuthVerificationAdmin";

export async function deleteUser(app: FastifyInstance){
  app.delete('/delete/user', async (request, reply) => {
    try{

      authenticateAdmin(app, request, reply);

      const requestDeleteBody = z.object({
       userId: z.string().uuid()
      });

      const {userId }= requestDeleteBody.parse(request.body);

      if (!userId) {
        return reply.status(400).send({ error: 'Invalid request body'});
      }

      await prisma.user.delete({
        where: {id: userId},
      });

      reply.status(200).send({message: 'Sucess'});
      
    }catch(err){
      reply.code(500).send({ error: err });
    }
  })
}