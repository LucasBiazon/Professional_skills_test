import fastify from 'fastify';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCookie from '@fastify/cookie';
import { createUser } from './http/routes/userRoutes/create-user';
import { loginUser } from './http/routes/login-user';
import { getUser } from './http/routes/userRoutes/get-user';
import { updateUser } from './http/routes/userRoutes/update-user';
import { getUserResponses } from './http/routes/userRoutes/get-user-response';
import { createSkillTest } from './http/routes/skillTestRoutes/create-skillTest';
import { getManySkillTest } from './http/routes/skillTestRoutes/get-many-skillTests';
import { responseSkillTest } from './http/routes/userRoutes/response-skillTest';
import { getSkillTest } from './http/routes/skillTestRoutes/get-skillTest';
import { getAdminUsers } from './http/routes/admin/get-many-users';
import { promote } from './http/routes/admin/promote';
import { deleteUser } from './http/routes/admin/delete-user';
import { deleteSkillTest } from './http/routes/admin/delete-skillTest';

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
});

app.register(fastifySwaggerUI, {
  routePrefix: '/documentation'
});

app.register(import('@fastify/jwt'), {
  secret: 'professionalSkillsTestSecret'
});


app.register(fastifyCookie, {
  secret: 'professionalSkillsTestSecret',
  hook: 'onRequest'
});

app.get('/hello', async () => {
  return {hello: "world"}
});

app.register(createUser);
app.register(loginUser);
app.register(getUser);
app.register(updateUser);
app.register(getUserResponses)

app.register(createSkillTest);
app.register(getManySkillTest);
app.register(getSkillTest);
app.register(responseSkillTest);


app.register(getAdminUsers);
app.register(promote);
app.register(deleteUser);
app.register(deleteSkillTest);

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