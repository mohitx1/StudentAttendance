const express = require('express');

const teacher = require('../controllers/teacher');

const router = express.Router();

router.get('/allStudents',teacher.getAllStudents);

router.post('/postAttendance', teacher.postAttendance);

router.get('/getDate',teacher.getDateList);

router.get('/marked/:presentDate', teacher.getMarkedAttendance);

router.get('/getReport', teacher.getReport);

module.exports = router;