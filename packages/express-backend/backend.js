// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const isEqualUser = (user1, user2) => {
    return JSON.stringify(user1) == JSON.stringify(user2);
};

const findUserByObject = (user) => {
    for(let i=0; i<users.users_list.length; i++){
        if (isEqualUser(user, users.users_list[i])) {
            return i;
        }
    }
    return -1
};

const deleteUser = (user) => {
    const index = findUserByObject(user);
    if (index > -1) {
        users["users_list"].splice(index, 1);
    }
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);

        if (result === undefined) {
            res.status(404).send("Resource not found.");
        }
        else {
            result = { users_list: result };
            res.send(result);
        }
    }
    else if (name != undefined) {
        let result = findUserByName(name);

        if (result === undefined) {
            res.status(404).send("Resource not found.");
        }
        else {
            result = { users_list: result };
            res.send(result);
        }
        
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
});

// app.get("/users", (req, res) => {
//     const name = req.params["name"];
//     const job = req.params["job"];
//     let result = findUserByNameAndJob(name, job);
//     console.log(result);
//     if (result === undefined) {
//       res.status(404).send("Resource not found.");
//     } else {
//       res.send(result);
//     }
// });
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.delete("/users", (req, res) => {
    const userToDelete = req.body;
    if (userToDelete === -1) {
        res.status(404).send("Resource not found.");
    } else {
        deleteUser(userToDelete);
    }
    res.send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});