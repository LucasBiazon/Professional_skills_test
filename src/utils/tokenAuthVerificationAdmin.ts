import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { authenticate } from "./tokenAuthVerification";

export async function authenticateAdmin(app: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  try{
    const decodedToken = await authenticate(app, request, reply);
    if (!decodedToken) {
      return reply.status(401).send('Unauthorized');
    }
    
    const requestRole = (Object.entries(decodedToken)[1]);
    const admin = requestRole[1];

    if(admin != "admin"){
        return reply.status(403).send('Unauthorized');
    }
      
  } catch (err) {
    reply.code(500).send({ error: err });
  }
}
