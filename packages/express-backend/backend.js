// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js"

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.get("/users", (req, res) => {
    const name = req.query.name;
    console.log(name);
    const job = req.query.job;
    if (name != undefined && job != undefined) {
      userServices.findUserByNameandJob(name, job)
        .then((result) => res.send(result))
        .catch(() => res.status(404).send("Resource not found."));
    }
    else if (name != undefined) {
        userServices.findUserByName(name)
          .then((result) => res.send(result))
          .catch(() => res.status(404).send("Resource not found."));
        
    } else {
        userServices.getUsers()
          .then((userList) => res.send(userList))
          .catch(() => res.status(404).send("Resource not found."));
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices.findUserById(id)
      .then((result) => res.send(result))
      .catch(() => res.status(404).send("Resource not found."))
});
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd)
      .then(res.status(201).send(userToAdd))
      .catch((error) => { console.log(error); });
});

app.delete("/users", (req, res) => {
    const userToDelete = req.body._id;
    userServices.deleteUser(userToDelete)
      .then((result) => res.status(204).send())
      .catch(() => res.status(404).send("Resource not found."));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});