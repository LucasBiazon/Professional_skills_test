import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { authenticate } from "../../../utils/tokenAuthVerification";

export async function getUserResponses(app: FastifyInstance){
  app.get('/user/response', async (request, reply) => {
   try{
    const decodedToken = await authenticate(app, request, reply);
    if (!decodedToken) {
      return reply.status(401).send('Unauthorized');
    }
    
      const requestId = (Object.entries(decodedToken)[0]);
      const userId = requestId[1] as string;

      if(!userId){
        return reply.status(404).send({message: "User not found"});
      }
      const response = await prisma.questionResponse.findMany({
        where: {userId: userId},
          select: {
            questionOption: true
          }
      });
      
      if(!response){
        return reply.status(404).send({message: "Response not found"});
      }

      reply.status(200).send({response: response});
      
   }catch(err){}
  })
}