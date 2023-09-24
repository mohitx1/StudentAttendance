const db = require('../util/database');

module.exports = class Student{
    static getStudents(){
        return db.execute('SELECT * FROM student');
    }
};