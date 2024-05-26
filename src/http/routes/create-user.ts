import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function createUser(app: FastifyInstance){
  app.post('/user/register', async (request, reply) => {
    try{
      const createUserBody = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        bio: z.string(),
        avartarUrl: z.string().url()
      });

      const { 
        name,
        email,
        password,
        bio,
        avartarUrl
      } = createUserBody.parse(request.body);

      const user = await prisma.user.create({
        data:{
          name,
          email,
          password,
          bio,
          avartarUrl
        }
      });

      return reply.status(201).send({message: "User created!", user: user});
      
    }catch(err){
      
    }
  });
}