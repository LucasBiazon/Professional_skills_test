import { FastifyInstance } from "fastify";
import { authenticate } from "../../../utils/tokenAuthVerification";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createSkillTest(app: FastifyInstance) {
  app.post('/skillTest', async (request, reply) => {
    const decodedToken = await authenticate(app, request, reply);
    if (!decodedToken) {
      return reply.status(401).send('Unauthorized')
    }

    const createSkillTestBody = z.object({
      title: z.string(),
      description: z.string(),
      questions: z.array(z.object({
        title: z.string(),
        description: z.string(),
        correctResponse: z.string(),
        questionOptions: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })),
      })),
    });

    const { title, description, questions } = createSkillTestBody.parse(request.body);

   
      const skillTest = await prisma.skillTest.create({
        data: {
          title,
          description,
          questions: {
            create: questions.map(quest => ({
              title: quest.title,
              description: quest.description,
              correctResponse: quest.correctResponse,
              questionOptions: {
                create: quest.questionOptions.map((option: { title: string; description: string }) => ({ 
                  title: option.title,
                  description: option.description,
                })),
              },
            })),
          },
        },
      });

      reply.code(201).send({skillTest, questions});
  });
}
