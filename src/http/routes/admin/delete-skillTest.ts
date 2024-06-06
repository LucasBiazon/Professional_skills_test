import fastify, { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authenticateAdmin } from "../../../utils/tokenAuthVerificationAdmin";

export async function deleteSkillTest(app: FastifyInstance){
  app.delete('/delete/skillTest', async (request, reply) => {
    try{

      authenticateAdmin(app, request, reply);

      const requestSkillTestBody = z.object({
       skillTestId: z.string().uuid()
      });

      const {skillTestId }= requestSkillTestBody.parse(request.body);

      if (!skillTestId) {
        return reply.status(400).send({ error: 'Invalid request body'});
      }
      await prisma.questionResponse.deleteMany({
        where: { questionOption: { question: { skillTestId: skillTestId } } }
      });

      await prisma.questionOption.deleteMany({
        where: { question: { skillTestId: skillTestId } }
      });

      await prisma.question.deleteMany({
        where: { skillTestId: skillTestId }
      });

      await prisma.skillTest.delete({
        where: { id: skillTestId }
      });

      reply.status(200).send({message: 'Sucess'});
      
    }catch(err){
      reply.status(400).send({message: err});
    }
  });
}