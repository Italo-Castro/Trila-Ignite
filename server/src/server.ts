import Fastify from 'fastify';
import cors from "@fastify/cors";
import { prisma } from './lib/prisma';
import { appRoutes } from './route';

const app = Fastify();

app.register(cors); // aqui por exemplo eu indico quais endereços podem acessar o back end
app.register(appRoutes);


app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server Runing! in port 3333',)
})

