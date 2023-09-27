const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const teacherRoutes = require('./routes/teacher')

const app = express();

app.use(bodyParser.json({ extended: false}));
app.use(cors());
app.use(teacherRoutes);

app.listen(2000,()=>{
    console.log('connected to backend')
})