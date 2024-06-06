import { FastifyInstance } from "fastify";
import { authenticate } from "../../../utils/tokenAuthVerification";
import z from "zod";
import { prisma } from "../../../lib/prisma";


export async function getManySkillTest(app: FastifyInstance) {
  app.get('/skillTest/list', async (request, reply) => {
    try{
      const decodedToken = await authenticate(app, request, reply);
      if(!decodedToken){
        return reply.status(401).send('Unauthorized');
      }

      const  skillTests = await prisma.skillTest.findMany()

      return reply.status(200).send({
        skillTests
      })

    }catch(err){}
  })
}