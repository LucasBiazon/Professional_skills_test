import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authenticate } from "../../../utils/tokenAuthVerification";

export async function getUser(app: FastifyInstance){
  app.get('/user', async (request, reply) => {
   try{
    const decodedToken = await authenticate(app, request, reply);
    if (!decodedToken) {
      return reply.status(401).send('Unauthorized');
    }
    
      const requestId = (Object.entries(decodedToken)[0]);
      const userId = requestId[1];

      
      const user = await prisma.user.findUnique({
        where: {id: userId},
          select: {
            id: false,
            name: true,
            email: true,
            password: true,
            bio: true,
            avartarUrl: true,
            creatAt: true,
            updateAt: true
          } 
      });
      
      if(!user){
        return reply.status(404).send({message: "User not found"});
      }

      reply.status(200).send({user: user});
      
   }catch(err){}
  })
}