const db = require('../util/database');

module.exports = class Attendance{
    constructor(date, s1, s2, s3, s4, s5, s6, s7, s8, s9){
        this.date = date;
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
        this.s4 = s4;
        this.s5 = s5;
        this.s6 = s6;
        this.s7 = s7;
        this.s8 = s8;
        this.s9 = s9;
    }

    save(){
        return db.execute('INSERT INTO attendance (date, s1,s2,s3,s4,s5,s6,s7,s8,s9) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [this.date,this.s1,this.s2,this.s3,this.s4,this.s5,this.s6,this.s7,this.s8,this.s9]);
    }

    static getDate(){
        return db.execute('SELECT date from attendance');
    }

    static getStudentsMarked(date){
        return db.execute('SELECT * FROM attendance WHERE date=?',[date])
    }

    static getEverything(){
        return db.execute('SELECT * FROM attendance')
    }
}