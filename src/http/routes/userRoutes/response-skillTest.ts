import { FastifyInstance } from "fastify";
import { authenticate } from "../../../utils/tokenAuthVerification";
import { prisma } from "../../../lib/prisma";
import z from "zod";


export async function responseSkillTest(app: FastifyInstance){
  app.post('/skillTest/:skillTestId/response', async (request, reply) => {
      try {
        const decodedToken = await authenticate(app, request, reply);

        if(!decodedToken){
          return reply.status(401).send('Unauthorized');
        }

        const requestId = (Object.entries(decodedToken)[0]);
        const userId = requestId[1];

        const requestParams = z.object({
          skillTestId: z.string().uuid(),
        });

        const {skillTestId }= requestParams.parse(request.params);

        const skillTest = await prisma.skillTest.findUnique({
          where: {id: skillTestId },
        });

        if (!skillTest) {
          return reply.status(404).send({ error: 'Skill test not found' });
        }

        const requestBody = z.object({
          questionId: z.string().uuid(),
          questionOptionId: z.string().uuid()
        });

        const {questionId, questionOptionId} = requestBody.parse(request.body);
        if(!questionId){
          return reply.status(404).send({ error: 'Question not found' });
        }
        if(!questionOptionId){
          return reply.status(404).send({ error: 'Question option not found' });
        }

        const existingResponse = await prisma.questionResponse.findFirst({
          where: {
            userId: userId,
            questionId: questionId,
          },
        });
  
        if (existingResponse) {
          return reply.status(403).send({ error: 'You have already answered this question.' });
        }

        const responseSkillTest = await prisma.questionResponse.create({
          data: {
            questionId: questionId,
            questionOptionId: questionOptionId,
            userId: userId
          }
        });

        await prisma.questionOption.update({
          where: { id: questionOptionId },
          data: {
            count: {
              increment: 1,
            },
          },
        });


        return reply.status(201).send({
          message: "Success",
          responseSkillTest: responseSkillTest
        });

      }catch(err){
        return reply.status(500).send(err);
      }
  });
}