import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function loginUser(app: FastifyInstance){
  app.post('/login', async (request, reply) => {
    const loginUserBody = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    });

    const {email, password} = loginUserBody.parse(request.body);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password
      }
    });

    if(!user){
      return reply.status(404).send({message: 'Not found user!'});
    }

    const token = app.jwt.sign({id: user.id, role: user.role });

    reply.setCookie('token', token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 7,
      signed: true
    }).status(200).send({ message: 'Login successful', token });
  })
}