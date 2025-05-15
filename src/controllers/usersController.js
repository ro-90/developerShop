const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const db = require("../database/models");
const { v4: uuidv4 } = require("uuid");

const usersController = {
  login: (req, res, next) => {
    res.render("users/login", { title: "Login" });
  },
  processLogin: async (req, res, next) => {
    try {
      const { email } = req.body;
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        res.render("users/login", {
          errores: errores.mapped(),
          title: "Login",
        });
      } else {
        const user = await db.User.findOne({
          where: {
            email: email,
          },
        });
        const { userName, id } = user;

        req.session.user = { userName,id};

        if (req.body.remember) {
          res.cookie("user", { userName, id }, { maxAge: 1000 * 60 * 30 });
        }
        res.redirect(`/users/profile/${id}`);
      }
    } catch (error) {
      console.log(error);
    }

  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/users/login");
  },
  register: function (req, res, next) {
    res.render("users/register", { title: "registro de usuario" });
  },
  store: function (req, res, next) {
    try {
      const users = parseFile(readFile(directory));
      const { nombre, correo, contrasena } = req.body;
      const errores = validationResult(req);

      if (errores.array().length > 0) {
        res.render("users/register", {
          errores: errores.mapped(),
          nombre,
          correo,
          contrasena,
        });
      } else {
        bcrypt.hash(contrasena, 10, function (err, hash) {
          if (err) {
            console.log("error en el hash", err);
          }

          users.push({
            id: uuidv4(),
            nombre,
            correo,
            contrasena: hash,
          });

          writeFile(directory, stringifyFile(users));

          res.redirect("/users/login");
        });
      }
    } catch (error) {
      console.log("el error capturado: ", error);
    }
  },
  profile: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await db.User.findByPk(id);
      const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
      const data = await response.json();
      const provincias = data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
      const idProvincia = user.provincia ? user.provincia : provincias[0].id;

      const responseLocalidades = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&max=500`);
      const dataLocalidades = await responseLocalidades.json();
      const localidades = dataLocalidades.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));

      return res.render("users/profile", { title: "Perfil", user, provincias, localidades });
    } catch (error) {
      console.log("error: ", error);
      res.render("error", error);
    }
  },
  update: (req, res) => {
    console.log("file: ", req.file);

    const users = parseFile(readFile(directory));
    console.log("body:", req.body);
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    req.body.id = id;
    req.body.avatar = req.file ? req.file.filename : user.avatar;
    if (req.body.contrasena && req.body.contrasena2) {
      req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    } else {
      req.body.contrasena = user.contrasena;
    }

    delete req.body.contrasena2;

    const index = users.findIndex((user) => user.id === id);
    users[index] = req.body;
    //$2b$10$9dcrAsG4z0Ib78dU/GSyKOFny8bWajoiI7mJnDBmK9UTyc2GEJuUK  
    writeFile(directory, stringifyFile(users));
    res.send(req.body);
  },
  deleteUser: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    const users = parseFile(readFile(directory));
    const id = req.params.id;
    const newUsers = users.filter((user) => user.id !== id);
    writeFile(directory, stringifyFile(newUsers));
    res.redirect("/users/register");

  }
};

module.exports = usersController;
// module.exports = usersControllers;