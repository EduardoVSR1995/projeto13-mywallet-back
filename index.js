import patchExtract from './routers/patch.routers.js';
import deletrouters from './routers/delet.routers.js';
import postrouts from './routers/post.routers.js';
import getrouts from './routers/get.routers.js';
import express from 'express';
import cors from 'cors';


const server = express();

server.use(cors());
server.use(express.json())

server.use(patchExtract)

server.use(deletrouters)

server.use(postrouts)

server.use(getrouts)

server.listen(process.env.PORT ? process.env.PORT : 5000);