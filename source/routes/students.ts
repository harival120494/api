import express from "express";
import controller from "../controllers/students";
const router = express.Router();

// var cors = require('cors')
 
// var corsOptions = {
//   origin: 'http://localhost:3006/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

router.get('/', controller.getAllStudents);
router.post('/filter', controller.getFilterData);
router.get('/cat_sex', controller.getSexData);
router.get('/hobbies', controller.getHobbies);
export = router;