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
        res.redirect(`/`);
      }
    } catch (error) {
      console.log(error);
    }

  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    return res.redirect("/");
  },
  register: function (req, res, next) {
    res.render("users/register", { title: "Registro de usuario" });
  },
  store: async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      const errores = validationResult(req);

      if (!errores.isEmpty()) {
        res.render("users/register", {
          errores: errores.mapped(),
          title: "Registro de usuario",
          oldData: req.body,
        });
      } else {

        await db.User.create({
          userName: userName.trim(),
          email: email.trim(),
          password: bcrypt.hashSync(password, 10),
          roleId : 2
        })

        return res.redirect("/users/login");

      }
    } catch (error) {
      console.log("el error capturado: ", error);
    }
  },
  profile: async (req, res) => {
    const id = req.session.user.id;
    try {
      const user = await db.User.findByPk(id);
      const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
      const data = await response.json();
      const provincias = data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
      const provincia = user.province ? user.province : provincias[0].nombre;

      const responseLocalidades = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=500`);
      const dataLocalidades = await responseLocalidades.json();
      const localidades = dataLocalidades.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));      
      
      return res.render("users/profile", { 
        title: "Perfil", 
        ...user.dataValues, 
        provincias, 
        localidades 
      });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { userName, address, city, province } = req.body;
      const id = req.session.user.id;
      const user = await db.User.findByPk(id);
      const errores = validationResult(req);

      if (!errores.isEmpty()) {
        res.render("users/profile", {
          errores: errores.mapped(),
          title: "Perfil",
          oldData: req.body,
          provincias,
          localidades,
        });
      } else {
        await user.update({
          userName: userName.trim(),
          address: address.trim(),
          city: city.trim(),
          province: province.trim(),
        },{
          where: {
            id: id,
          },
        });
        return res.redirect("/users/profile");
      }
    } catch (error) {
      console.log(error);
    }
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