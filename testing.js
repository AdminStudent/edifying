 const express = require('express');
 const bodyParser = require('body-parser');
 const app = express();
 app.use(bodyParser.json());
 let students = [];
app.post('/students', (req, res) => {
    const { id, name, grade } = req.body;
     if (!id || !name || !grade) {
        return res.status(400).json({ error: "Please provide all required fields." });
     }
     const existingStudent = students.find(student => student.id === id);
    if (existingStudent) {
        return res.status(400).json({ error: "Student with this ID already exists." });
    }
      const newStudent = { id, name, grade };
     students.push(newStudent);
     res.status(201).json({ message: "Student added successfully.", student: newStudent });
});
  app.get('/students', (req, res) => {
    res.json(students);
});
 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});