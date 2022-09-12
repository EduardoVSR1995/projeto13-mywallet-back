import postrouts from '../routers/post.routers.js'
import getrouts from '../routers/get.routers.js'
import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json())

server.use(getrouts)

server.use(postrouts)

server.listen(5000);