import { firestore, rtdb } from "./db";
import * as express from "express";
import { nanoid } from "nanoid";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const port = 2000;
const app = express();

app.use(express.json());
app.use(cors());
//Auth

//SignUp
const userCollection = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;

  userCollection
    .where("email", "==", email)
    .get()
    .then(searchResponse => {
      if (searchResponse.empty) {
        userCollection
          .add({
            email,
            nombre,
          })
          .then(newUserRef => {
            res.json({
              id: newUserRef.id,
              new: true,
            });
          });
      } else {
        res.status(400).json({
          message: "User Already Exists 🤨",
        });
      }
    });
});
////Verifica si existe el mail
app.post("/auth", (req, res) => {
  const { email } = req.body;

  userCollection
    .where("email", "==", email)
    .get()
    .then(searchResponse => {
      if (searchResponse.empty) {
        res.status(404).json({
          message: "Not Founds",
        });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;

  userCollection
    .doc(userId.toString())
    .get()
    .then(doc => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());
        roomRef
          .set({
            messages: [],
            owner: userId,
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);
            roomCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});
///Endpoit para reconectarse a una room
app.get("/room/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  userCollection
    .doc(userId.toString())
    .get()
    .then(doc => {
      if (doc.exists) {
        roomCollection
          .doc(roomId)
          .get()
          .then(snap => {
            const data = snap.data();

            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});

app.get("/", (req, res) => {
  res.send("el GET esta funcionando");
});

//Abre el puerto a la espera de ordenes
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
