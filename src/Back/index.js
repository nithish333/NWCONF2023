const express = require("express");
const app = express();

const multer = require("multer");
const cors = require("cors");

const firebase = require("firebase/app");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const {
  getFirestore,
  query,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
  getDocs,
} = require("firebase/firestore");
const { sendWelcomeEmail,paymentConfirmationMail } = require("./email");
// const { query } = require("express");

app.use(express.json());
app.use(cors());




const firebaseConfig = {

 



  apiKey: "AIzaSyBCvXZCM6idJo4GQ8K395_LRLUmeCBQsM8",

 



  authDomain: "northwestconference-84224.firebaseapp.com",

 



  projectId: "northwestconference-84224",

 



  storageBucket: "northwestconference-84224.appspot.com",

 



  messagingSenderId: "211290130504",

 



  appId: "1:211290130504:web:d0ad3bc51b67583c7db07d",

 



  measurementId: "G-8D0MTZY27N"

 



};



firebase.initializeApp(firebaseConfig);
const fapp = initializeApp(firebaseConfig);
const db = getFirestore(fapp);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

app.post("/authlogin", upload.single(), async (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;
  await getDocs(collection(db, "users")).then((snap) => {
    var some = snap.docs[0].data();
    // console.log(snap.docs[0].id);
    var some2 = [];
    snap.docs.forEach((doc) => {
      var temp = [];
      temp.push(doc.id);
      temp.push(doc.data());
      some2.push(temp);
    });
    some2.forEach(s=>{
      // console.log(s[1]);
    })
    var final = some2.filter((s) => {
      return s[1].Email == email && s[1].Password == password;
    });

    // console.log(final);
    if (final.length > 0) {
      res.send(final);
    } else {
      var error = "Wrong data";
      res.send(error);
    }
    // console.log(final);
  });

});

app.post("/authreg", (req, res) => {
  const itemRef = collection(db, "users");
  var data = { ...req.body };
  console.log(data);
  addDoc(itemRef, data)
    .then(() => {
      console.log("Enter the Data");
      sendWelcomeEmail(data.Email, data.FirstName);
    })
    .catch(() => {
      console.log("An Error occured");
    });

  res.status(200).send({ message: "File uploaded successfully" });
});


app.post("/committeelogin", upload.single(), async (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;
  await getDocs(collection(db, "committee")).then((snap) => {
    var some = snap.docs[0].data();
    console.log(snap.docs[0].id);
    var some2 = [];
    snap.docs.forEach((doc) => {
      var temp = [];
      temp.push(doc.id);
      temp.push(doc.data());
      some2.push(temp);
    });
    some2.forEach(s=>{
      // console.log(s[1]);
    })
    var final = some2.filter((s) => {
      return s[1].Email == email && s[1].Password == password;
    });

    // console.log(final);
    if (final.length > 0) {
      res.send(final);
    } else {
      var error = "Wrong data";
      res.send(error);
    }
    // console.log(final);
  });

});

app.post("/committeereg", (req, res) => {
  const itemRef = collection(db, "committee");
  var data = { ...req.body };
  console.log(data);
  addDoc(itemRef, data)
    .then(() => {
      console.log("Enter the Data");
      sendWelcomeEmail(data.Email, data.FirstName);
    })
    .catch(() => {
      console.log("An Error occured");
    });

  res.status(200).send({ message: "File uploaded successfully" });
});

app.post("/guest", (req, res) => {
  console.log("Geust payment")
  const itemRef = collection(db, "guest");
  var data = { ...req.body };
  console.log(data);
  addDoc(itemRef, data)
    .then(() => {
      paymentConfirmationMail(data.Email, data.FirstName,data.Amount,data.Phone,data.Status,data.id);
    })
    .catch((e) => {
      console.log(e);
    });

  res.status(200).send({ message: "Payment successfull" });
});


app.listen(5000, () => console.log("Databsase started"));
