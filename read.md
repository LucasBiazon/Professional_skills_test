# Project Documentation

## Introduction

This project is a sample API for managing professional skill tests. It allows users to take tests in various fields and submit their answers for evaluation.

###

Este projeto é uma API para gerenciar testes de habilidades profissionais. Ele permite que os usuários realizem testes de várias áreas e enviem suas respostas.

## Technologies Used

- Docker Compose: For container orchestration and easing the development environment.
- Fastify: A lightweight and efficient web framework for Node.js, used to build the API.
- Prisma: A modern ORM tool for Node.js and TypeScript, used to interact with the PostgreSQL database.
- PostgreSQL: A relational database management system used to store application data.

###

- Docker Compose: Para orquestração de contêineres e facilitar o ambiente de desenvolvimento.
- Fastify: Um framework web leve e eficiente para Node.js, usado para construir a API.
- Prisma: Uma ferramenta ORM moderna para Node.js e TypeScript, usada para interagir com o banco de dados PostgreSQL.
- PostgreSQL: Um sistema de gerenciamento de banco de dados relacional usado para armazenar os dados da aplicação.

## Project Structure

The project is structured as follows:

```
project/
│
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.json
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
├── src/
│   ├── server.ts
│   ├── http/
│   │   ├── routes/
│   │   │   ├── skillTestRoutes/
│   │   │   │    ├── create-skillTest.ts
│   │   │   │    ├── get-many-skillTests.ts
│   │   │   │    ├── get-skillTest.ts
│   │   │   ├── userRoutes/
│   │   │   │    ├── create-user.ts
│   │   │   │    ├── get-user.ts
│   │   │   │    ├── update-user.ts
│   │   │   │    ├── response-skillTest.ts
│   │   │   │    ├── get-user-response.ts
│   │   │   ├── admin/
│   │   │   │    ├── delete-user.ts
│   │   │   │    ├── delete-skillTest.ts
│   │   │   │    ├── get-many-users.ts
│   │   │   │    ├── promote.ts
│   │   │   ├── login.ts
│   ├── lib/
│   │   ├── prisma.ts
│   ├── utils/
│   │   ├── tokenAuthVerification.ts
│   │   ├── tokenAuthVerificationAdmin.ts
```

## How to Run

1. #### Ensure you have Docker and Docker Compose installed on your machine.

2. #### Clone the project repository.

```
git clone https://github.com/LucasBiazon/Professional_skills_test.git
```

3. #### Navigate to the project directory.

```bash
cd Professional_skills_test
```

4. #### Run the command for to start postgresql.

```bash
docker compose up -d
```

5. #### Start server.

```bash
npm run dev
```

6. ### Access the API documentation in your browser at http://localhost:3000.

###

## Api Documentation

obs: Most routes require the user to be authenticated/logged in. Authentication is managed using JWTs stored in cookies. When a user logs in, a JWT is issued and stored in a cookie. This token must be included in subsequent requests to access protected routes.

###

obs: A maioria das rotas exige que o usuário esteja autenticado/logado. A autenticação é gerenciada usando JWTs armazenados em cookies. Quando um usuário faz login, um JWT é emitido e armazenado em um cookie. Este token deve ser incluído nas solicitações subsequentes de acesso a rotas protegidas.

### user

#### - POST Register-user

```bash
  http://localhost:3000/singUp
```

Bodyraw (json)

```json
{
  "name": "nameTest",
  "email": "emailtest4@gmail.com",
  "password": "12345678",
  "bio": "Exemple bio1",
  "avartarUrl": "data:image/jpeg;base64,/9j"
}
```

#### - PUT UpateUser

```bash
http://localhost:3000/user/update
```

Bodyraw (json)

```json
{
  "name": "updateName",
  "email": "update@gmail.com"
}
```

#### - POST response-skillTest

```
http://localhost:3000/skillTest/:skillTestId/response
```

PATH VARIABLES

```js
skillTestId:  34f9ae64-9d28-40c9-994f-2f17f50074e3
```

Bodyraw (json)

```json
{
  "questionId": "c39d8b6a-90f4-48ea-9671-6a83704eb95b",
  "questionOptionId": "9e8c433e-501b-44c4-862c-a031779da2d7"
}
```

### skillTest

#### - POST Create-SkillTest

```bash
http://localhost:3000/skillTest
```

Bodyraw (json)

```json
{
  "title": "Title",
  "description": "Description",
  "questions": [
    {
      "title": "Question 1",
      "description": "description question 1",
      "correctResponse": "2",
      "questionOptions": [
        {
          "title": "1",
          "description": "10"
        },
        {
          "title": "2",
          "description": "11"
        },
        {
          "title": "3",
          "description": "2"
        }
      ]
    },
    {
      "title": "Question  2",
      "description": "description question 2",
      "correctResponse": "1",
      "questionOptions": [
        {
          "title": "1",
          "description": "..."
        },
        {
          "title": "2",
          "description": "..."
        },
        {
          "title": "3",
          "description": "..."
        }
      ]
    }
  ]
}
```

#### - GET get-skillTest

```bash
http://localhost:3000/skillTest/:skillTestId
```

PATH VARIABLES

```js
skillTestId:  34f9ae64-9d28-40c9-994f-2f17f50074e3
```

### Admin

#### - PATCH promote

```bash
http://localhost:3000/promote
```

Bodyraw (json)

```json
{
  "userId": "9082c562-3050-486a-ac46-902006ab9f46"
}
```

#### - DELETE delete-user

```bash
http://localhost:3000/delete/user
```

Bodyraw (json)

```json
{
  "userId": "9082c562-3050-486a-ac46-902006ab9f46"
}
```

#### - DELETE delete-skillTest

```bash
http://localhost:3000/delete/skillTest
```

Bodyraw (json)

```json
{
  "userId": "34f9ae64-9d28-40c9-994f-2f17f50074e3"
}
```

### Login

```bash
http://localhost:3000/login
```

Bodyraw (json)

```json
{
  "email": "emailtest14@gmail.com",
  "password": "12345678"
}
```

## License

This project is licensed under the [MIT License.](https://opensource.org/licenses/MIT).

####

Este projeto está licenciado sob a [MIT License.](https://opensource.org/licenses/MIT).

## Contact

For questions, suggestions, or issues, please contact [lucasbiazonpalma@gmail.com](mailto:lucasbiazonpalma@gmail.com).

###

Para dúvidas, sugestões ou problemas, entre em contato com [lucasbiazonpalma@gmail.com](mailto:lucasbiazonpalma@gmail.com).

---
