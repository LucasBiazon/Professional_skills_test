import { FastifyInstance } from "fastify";
import { authenticate } from "../../../utils/tokenAuthVerification";
import { prisma } from "../../../lib/prisma";


export async function getManySkillTest(app: FastifyInstance) {
  app.get('/skillTest/list', async (request, reply) => {
    try{
      const decodedToken = await authenticate(app, request, reply);
      if(!decodedToken){
        return reply.status(401).send('Unauthorized');
      }

      const  skillTests = await prisma.skillTest.findMany();

      return reply.status(200).send({
        message:"Success",
        skillTests
      });

    }catch(err){
      return reply.status(500).send(err);
    }
  });
}