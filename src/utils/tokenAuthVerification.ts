import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(app: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  try{
    const accessToken = request.cookies.token as string;
    const unsignedAccessToken = request.unsignCookie(accessToken);

    if (!unsignedAccessToken.value) {
      return null;
    }

    return app.jwt.verify(unsignedAccessToken.value);
  } catch (err) {
    reply.code(500).send({ error: err });
  }
}
