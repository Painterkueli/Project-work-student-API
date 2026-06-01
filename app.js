require('dotenv').config();
const express = require('express');
const app = express();

//Body middleware
app.use(express.json());
//Logger middleware
app.use((req,res,next)=>{
    console.log(`A ${req.method} request for ${req.url} on ${new Date()}`);
    next();
});

//Array of students
let students = [
<<<<<<< HEAD
    {ID: 1, name: "Dellor Eric", gender: "Male", Age: 25, email: "Delloreric@gmail.com", course: "Computer Science", level: 200, uniqueID: "26CS001"},
    {ID: 2, name: "Kueli Erica", gender: "Female", Age: 30, email: "kuelierica@gmail.com", course: "Biology", level: 200, uniqueID: "26BI001"},
    {ID: 3, name: "Gah Herny", gender: "Male", Age: 26, email: "gahhenry@gmail.com", course: "Chemistry", level: 200, uniqueID: "26CH001"}
];
//Array of course codes
const courseCodes = [{computer_science: "26CS"}, {biology: "26BI"}, {chemistry: "26CH"}, {mathematics: "26MA"}, {physics: "26PH"}];
//Function to generate unique ID for each student
=======
    {ID: 1, name: "Yusuf Isaiah", gender: "Male", Age: 25, email: "isawhizi@gmail.com", course: "Computer Science", level: 200, uniqueID: "26CS001"},
    {ID: 2, name: "James Emerald", gender: "Female", Age: 30, email: "emeraldjames581@gmail.com", course: "Biology", level: 200, uniqueID: "26BI001"},
    {ID: 3, name: "Kueli Victor", gender: "Male", Age: 26, email: "painterkueli23@gmail.com", course: "Chemistry", level: 200, uniqueID: "26CH001"},
    {ID: 4, name: "Hope Chibondwe", gender: "Male", Age: 26, email: "chibondwehope@gmail.com", course: "Chemistry", level: 100, uniqueID: "26CH002"},
    {ID: 5, name: "Okoye Chijioke Henry", gender: "Male", Age: 21, email: "officialceho@gmail.com", course: "Physics", level: 100, uniqueID: "26PH001"},
    {ID: 6, name: "Eiporn", gender: "Male", Age: 18, email: "eiporn@gmail.com", course: "Mathematics", level: 100, uniqueID: "26MA001"}
];
//Array of course codes
const courseCodes = [{computer_science: "26CS"}, {biology: "26BI"}, {chemistry: "26CH"}, {mathematics: "26MA"}, {physics: "26PH"}];
//Function to generate a unique ID for each student
>>>>>>> 19b68466345d44e24bacf42677fdb182f10f8849
function unique_num(course_in){
    if(!course_in){return "Course is not specified";}
    course_edit = course_in.toLowerCase().trim();
    course_edit = course_edit.replace(" ", "_");
    const course_std = students.filter((s) => s.course === course_in);
    const code = Object.values(courseCodes.find(s => Object.keys(s).toString() === course_edit)).toString();
    if(!code){return "Course is not available";}
    let unique_id = code + "00" + (course_std.length + 1).toString();
    return unique_id;
}
<<<<<<< HEAD
//View students record
=======
//View the student's record
>>>>>>> 19b68466345d44e24bacf42677fdb182f10f8849
app.get('/view', (req,res) => {
    const studentInfo = students.map((s) =>{
        return {
            ID: s.ID,
            name: s.name,
            course: s.course,
<<<<<<< HEAD
=======
            level: s.level
>>>>>>> 19b68466345d44e24bacf42677fdb182f10f8849
        };
    });
    res.status(200).json(studentInfo);
})

//For displaying a single student record
app.get('/view/:id', (req,res) => {
    const student = students.find((t) => t.uniqueID === req.params.id);
    if(!student) return res.status(400).json({"message":"Not found"});
    res.status(200).json(student);

})

<<<<<<< HEAD
=======
//Route to view students in a Course
app.get("/course/:course", (req,res) => {
    const course = req.params.course;
    const std_course = students.filter(s => s.course.toLowerCase() === course.toLowerCase());
    if(std_course.length == 0){return res.status(401).json("No Students are currently studying this Course.")};
    const selected_info = std_course.map((s) => {
        return {
            ID: std_course.indexOf(s) + 1,
            name: s.name,
            email: s.email,
            level: s.level,
        };
    });
    res.status(200).json(selected_info);
});

>>>>>>> 19b68466345d44e24bacf42677fdb182f10f8849
//Add new student
app.post('/add', (req,res) => {
    let course_in = req.body.course;
    const addStudent = {ID:students.length + 1, ...req.body, uniqueID: unique_num(course_in)};
    addStudent.name = addStudent.name.trim();
    if(typeof addStudent.age !== "number" || typeof addStudent.level !== "number") return res.status(400).json({"message": "Age and level must be numbers"});
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

<<<<<<< HEAD
//Updating just part of one student reocrd
=======
//Updating just part of one student record
>>>>>>> 19b68466345d44e24bacf42677fdb182f10f8849
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
<<<<<<< HEAD
    console.log(`Server running on ${PORT}`);
})
=======
    console.log(`Server running on http://localhost:${PORT}`);
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: err.message});
});
>>>>>>> 19b68466345d44e24bacf42677fdb182f10f8849
