import { FastifyInstance } from "fastify";
import { authenticate } from "../../../utils/tokenAuthVerification";
import z from "zod";
import { prisma } from "../../../lib/prisma";


export async function getSkillTest(app: FastifyInstance) {
  app.get('/skillTest/:skillTestId', async (request, reply) => {
    try{
      const decodedToken = await authenticate(app, request, reply);
      if(!decodedToken){
        return reply.status(401).send('Unauthorized');
      }

      const requestParams = z.object({
        skillTestId: z.string().uuid(),
      });

      const {skillTestId }= requestParams.parse(request.params);

      const skillTest = await prisma.skillTest.findUnique({
        where: {id: skillTestId },
        include: { 
          questions: {
            include: {
              questionOptions: true,
            },
          }}
      });

      return reply.status(200).send({
        skillTest
      })

    }catch(err){}
  })
}