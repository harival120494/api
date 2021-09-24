import http from "http";
import express from "express";
import config from "./config/config";
import loginRoutes, { route } from "./source/routes/login";
import students from "./source/routes/students";
// var cors = require('cors')

const NAMESPACE = "Server";
const router = express();

/** Parse the request */
router.use(express.urlencoded({extended: true}));
router.use(express.json()) // To parse the incoming requests with JSON payloads

/** Rules of API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:3007");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

router.get('/', (req, res) => {
    res.send('test');
})

/**Route */
// router.use(cors({ origin: 'http://localhost:3006'}));
router.use('/user', loginRoutes);
router.use('/students', students);

/**Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => console.log(`Listening on ${config.server.port}`));

