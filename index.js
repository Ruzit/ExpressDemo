const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "Computing" },
  { id: 2, name: "Multimedia" },
  { id: 3, name: "Networking" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

//get courses
app.get("/api/courses/", (req, res) => {
  res.send(courses);
});

//add course
app.post("/api/courses/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) 
    return res.status(400).send(error.details[0].message);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  console.log(req.body.name);
  res.send(course);
});

//get a course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`The course ${req.params.id} was not found.`);
  res.send(course);
});

//update a course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`The course ${req.params.id} was not found.`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

//delete a course
app.delete("/api/courses/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course)
    return res.status(404).send(`The course ${req.params.id} was not found.`);
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function findCourse(id) {
  return courses.find((c) => c.id === parseInt(id));
}

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

// const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port 3000 ...`));
