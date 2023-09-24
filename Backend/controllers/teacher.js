const Students = require('../models/student');
const Attendance = require('../models/attendance');

exports.getAllStudents = (req, res, next) => {
    Students.getStudents()
        .then((data) => {
            // console.log(data[0]);
            res.json({data:data[0]});
        })
        .catch(err => console.log(err));
}

exports.postAttendance = (req, res, next) => {
    const date = req.body.date;
    const s1 = req.body.s1;
    const s2 = req.body.s2;
    const s3 = req.body.s3;
    const s4 = req.body.s4;
    const s5 = req.body.s5;
    const s6 = req.body.s6;
    const s7 = req.body.s7;
    const s8 = req.body.s8;
    const s9 = req.body.s9;

    const post = new Attendance(date, s1, s2, s3, s4, s5, s6, s7, s8,s9);

    post.save()
        .then((result) => {
            // res.json(result)
            res.json({msg:"Attendance Added!"});
        })
        .catch(err => console.log(err))
}

exports.getDateList = (req, res, next) => {
    Attendance.getDate()
        .then(data => {
            // console.log(data[0]);
            res.json({data:data[0]})
        })
        .catch(err => console.log(err));
}

exports.getMarkedAttendance = (req, res, next) =>{
    const date = req.params.presentDate;
    Attendance.getStudentsMarked(date)
        .then(result => {
            // console.log(result[0]);
            res.json({result:result[0]});
        })
        .catch(err => console.log(err));
}

exports.getReport = (req, res, next) => {
    Attendance.getEverything()
        .then(result => {
            // console.log(result[0]);
            res.json({result:result[0]})
        })
        .catch(err => console.log(err));
}