require('dotenv').config();
const express = require('express');
const app = express();

//Body middleware
app.use(express.json());

//Array of students
let students = [
    {"ID": 1, "name": "Dellor Eric", "gender": "Male", "Age": 25, "email": "Delloreric@gmail.com", "course":"Computer Science"},
    {"ID": 2, "name": "Kueli Erica", "gender": "Female", "Age": 30, "email": "kuelierica@gmail.com", "course":"Biology"},
    {"ID": 3, "name": "Gah Herny", "gender": "Male", "Age": 26, "email": "gahhenry@gmail.com", "course":"Chemistry"}
];

//View students record
app.get('/view', (req,res) => {
    res.status(200).json(students);
})

//For displaying a single student record
app.get('/view/:id', (req,res) => {
    const student = students.find((t) => t.ID === parseInt(req.params.id));
    if(!student) return res.status(400).json({"messade":"Not found"});
    res.status(200).json(student);

})

//Add new student
app.post('/add', (req,res) => {
    const addStudent = {ID:students.length + 1, ...req.body};
    if(addStudent.name === undefined || addStudent.email === undefined || addStudent.course === undefined || addStudent.gender === undefined) return res.status(400).json({"message": "Fill all the fields"});
    if (!(addStudent.email.includes('@') && addStudent.email.includes('.'))) return res.status(400).json({"message": "Email must contains @ and fullstop"});
  
    //Making sure we have only two genders
    const genderUppercase = addStudent.gender.toUpperCase();
    if (genderUppercase !== "MALE" && genderUppercase !== "FEMALE") return res.status(400).json({"message":"Enter male or female"});
    students.push(addStudent);
    res.status(201).json(addStudent);
})

//Updating the full record of one student 
app.put('/edit/:id', (req,res) => {
    const findID = students.findIndex((t) => t.ID === parseInt(req.params.id));
    if (findID === -1) return res.status(400).json({"message": "ID not found"});
    const updateStudent = {ID:students[findID].ID, ...req.body};
    students[findID] = updateStudent;
    res.status(200).json(updateStudent);
})

//Updating just part of one student reocrd
app.patch('/edit/:id', (req,res) => {
    const findID = students.findIndex((t) => t.ID === parseInt(req.params.id));
    if(findID === -1) return res.status(400).json({"message": "student Not found"});
    Object.assign(students[findID],req.body);
    res.status(200).json(students[findID]);
})

//Delete student
app.delete('/delete/:id', (req,res) => {
const Id = parseInt(req.params.id);
const initialLen = students.length;
students = students.filter((t) => t.ID === Id);
if (students.length !== initialLen) return res.status(404).json({error: "Not found"});
res.status(204).send();
})

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})