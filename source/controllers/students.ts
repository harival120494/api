import { Request, Response, NextFunction } from "express";
import { Connect, Query } from "../../config/mysql";
import bcrypt from "bcrypt";

interface FormData {  
    sex: string;  
    hobbies: string;  
}  

const NAMESPACE = 'Students Controller';
let salt = bcrypt.genSaltSync(10);
let clause: string;

/**  Method to get all students */
const getAllStudents = (req : Request, res : Response, next : NextFunction) => {
    // console.log(NAMESPACE, 'route callled');
    let query = `SELECT t.id, s.*, h.* 
                FROM transaction as t
                LEFT JOIN students as s ON s.id = t.id_students
                LEFT JOIN hobbies AS H ON h.id = t.id_hobbies`;
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

/** Method filter data by Sex and Hobbies */
const getFilterData = (req : Request, res : Response, next : NextFunction) => {
    // console.log(NAMESPACE, 'route callled');
    let {sex, hobbies} = req.body;
    console.log(req);
   
    if(sex != '' && hobbies == '')
    {
        clause = `WHERE s.sex='${sex}'`;
    }
    else if(sex == '' && hobbies != '')
    {
        clause = `WHERE h.id='${hobbies}'`;
    }
    else if(sex != '' && hobbies != '')
    {
        clause = `WHERE s.sex='${sex}' AND h.id='${hobbies}'`;
    }
    else{
        clause = '';
    }
    let query = `SELECT t.id, s.*, h.* 
                FROM transaction as t
                LEFT JOIN students as s ON s.id = t.id_students
                LEFT JOIN hobbies AS H ON h.id = t.id_hobbies
                ${clause}`;
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

/**  Method to get students group by sex */
const getSexData = (req : Request, res : Response, next : NextFunction) => {
    // console.log(NAMESPACE, 'route callled');
    let query = `SELECT * FROM students GROUP BY sex`;
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

/**  Method to get hobbies */
const getHobbies = (req : Request, res : Response, next : NextFunction) => {
    // console.log(NAMESPACE, 'route callled');
    let query = `SELECT * FROM hobbies`;
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
export default {getAllStudents, getFilterData, getSexData, getHobbies};