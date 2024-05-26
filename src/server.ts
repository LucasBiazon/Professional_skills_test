import fastify from 'fastify';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { createUser } from './http/routes/create-user';
import fastifyCookie from '@fastify/cookie';
import { loginUser } from './http/routes/login-user';
import { createSkillTest } from './http/routes/create-skillTest';

export const app = fastify({
  logger: true
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: '',
      description: 'Especificações da API para o back-end da aplicação professional_skills_test.',
      version: '1.0.0'
    },
  },
})

app.register(fastifySwaggerUI, {
  routePrefix: '/documentation'
});

app.register(import('@fastify/jwt'), {
  secret: 'professionalSkillsTestSecret'
})


app.register(fastifyCookie, {
  secret: 'professionalSkillsTestSecret',
  hook: 'onRequest'
})

app.get('/hello', async () => {
  return {hello: "world"}
});

app.register(createUser);
app.register(loginUser);
app.register(createSkillTest)

const start = async () => {
  try {
    await app.listen({ 
      port: 3000 
    })
    console.log("Server started!")
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();