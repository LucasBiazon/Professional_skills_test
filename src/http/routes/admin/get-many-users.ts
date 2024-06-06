import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authenticateAdmin } from "../../../utils/tokenAuthVerificationAdmin";


export async function getAdminUsers(app: FastifyInstance){
  app.get('/admin/users', async (request, reply) => {
   try{
      authenticateAdmin(app, request, reply);
      const users = await prisma.user.findMany();
      reply.status(200).send({users: users});
   }catch(err){
    reply.code(500).send({ error: err });
   }
  })
}