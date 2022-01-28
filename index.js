const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

//package Mailgun-js  (on reseingne son API KEY + son DOMAIN et on importe le package)
const API_KEY = "15cb3383194c1d40d60df3c19ed8e84c-054ba6b6-19612581";
const DOMAIN = "sandbox6c1be5ab535c45739794455cf91321b9.mailgun.org";
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

// app.get("/hello", (req, res) => {
//   res.json("Hello from the server !!");
// });

//Cette route s'occupera de l'envoi du mail
app.post("/form", (req, res) => {
  //   Le console.log de req.fields nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend) :

  console.log(req.fields);

  //   On crée un objet data qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
  const data = {
    from: `${req.fields.firstname} ${req.fields.lastname} <${req.fields.email}>`,
    to: "edwinjoye@gmail.com",
    subject: "Formulaire JS",
    text: req.fields.message,
  };

  //   Fonctions fournies par le package mailgun pour créer le mail et l'envoyer :
  mailgun.messages().send(data, (error, body) => {
    if (error === undefined) {
      // s'il n'y a pas eu d'erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :
      res.json({ message: "DOnnées du form bien recues, mail envoyé" });
    } else {
      // s'il y a eu une erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :

      res.json(error);
    }
  });
});

app.listen(4000, () => {
  console.log("Server has started !");
});
