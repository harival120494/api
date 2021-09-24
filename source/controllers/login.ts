import { Request, Response, NextFunction } from "express";
import { Connect, Query } from "../../config/mysql";
import bcrypt from "bcrypt";

const NAMESPACE = 'Login Controller';
let salt = bcrypt.genSaltSync(10);

/**  Method to login */
const login = (req : Request, res : Response, next : NextFunction) => {
    console.log(NAMESPACE, 'route callled');
    let {username, password} = req.body;
    let query = `SELECT * FROM user  WHERE username='${username}' AND password='${bcrypt.hashSync(password, salt)}'`;
    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
                results
            });            
        })
        .catch( error => {
            return res.status(500).json({});
        })
        .finally(() => {
            connection.end();
        })

    })
    .catch( error => {
        return res.status(500).json({});
    })
};

const create = (req : Request, res : Response, next : NextFunction) => {
    console.log(NAMESPACE, 'route callled');
    let {username, password} = req.body;
    let query = `INSERT into user (username, password) VALUES ("${username}","${bcrypt.hashSync(password, salt)}")`;
    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
                results
            });            
        })
        .catch( error => {
            return res.status(500).json({});
        })
        .finally(() => {
            connection.end();
        })

    })
    .catch( error => {
        return res.status(500).json({});
    })
};
export default {login, create};