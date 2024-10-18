// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js"

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// const users = {
//     users_list: [
//       {
//         id: "xyz789",
//         name: "Charlie",
//         job: "Janitor"
//       },
//       {
//         id: "abc123",
//         name: "Mac",
//         job: "Bouncer"
//       },
//       {
//         id: "ppp222",
//         name: "Mac",
//         job: "Professor"
//       },
//       {
//         id: "yat999",
//         name: "Dee",
//         job: "Aspring actress"
//       },
//       {
//         id: "zap555",
//         name: "Dennis",
//         job: "Bartender"
//       }
//     ]
// };

// const findUserByName = (name) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
// };

// const isEqualUser = (user1, user2) => {
//     return JSON.stringify(user1) == JSON.stringify(user2);
// };

// const findUserByObject = (user) => {
//     for(let i=0; i<users.users_list.length; i++){
//         if (isEqualUser(user, users.users_list[i])) {
//             return i;
//         }
//     }
//     return -1
// };

// const deleteUser = (user) => {
//     const index = findUserByObject(user);
//     if (index > -1) {
//         users["users_list"].splice(index, 1);
//     }
// };

// const findUserByNameAndJob = (name, job) => {
//     return users["users_list"].filter(
//         (user) => user["name"] === name && user["job"] === job
//     );
// };

// const idGenerator = () => {
//   return Math.round(Math.random()*100000)
// }

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
    console.log(userToDelete)
    userServices.deleteUser(userToDelete)
      .then((result) => res.status(204).send())
      .catch(() => res.status(404).send("Resource not found."));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});