import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const GetUserById = async (req, res) => {
   try {
      const user = await User.findOne({
         where: {
            id: req.query.id
         },
         attributes: ['id', 'lastname', 'firstname', 'email', 'role'],
      });

      res.json(user);
   } catch (error) {
      console.log(error);
   }
}

export const UpdateUserRole = async (req, res) => {
   let { id, role } = req.query;
   try {
      await User.update({ role: role }, {
         where: {
            id: id
         }
      });

      res.sendStatus(200);
   } catch (error) {
      console.log(error);
   }
}

export const GetUsers = async (req, res) => {
   try {
      const users = await User.findAll({
         attributes: ['id', 'lastname', 'firstname', 'email', 'role', ['id', 'delete_id'], ['id', 'edit_id']],
         order: [['id', 'DESC']],
      });

      users.map(user => {
         user.lastname = user.lastname + ' ' + user.firstname;
      });

      res.json(users);
   } catch (error) {
      console.log(error);
   }
}

export const Register = async (req, res) => {
   const { lastname, firstname, email, password, confPassword } = req.body;
   let { role } = req.body;

   // Валидация email
   let validEmail = await checkEmail(email);
   if (validEmail) return res.status(400).json({ email_invalid: validEmail });

   // Валидация пароля
   let validPassword = checkPassword(password);
   if (validPassword) return res.status(400).json({ error_password: validPassword });
   if (password !== confPassword) return res.status(400).json({ password_do_not_match: "Пароли не совпадают" });

   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(password, salt);

   try {
      if (!role) role = 'user';

      const newUser = await User.create({
         lastname: lastname,
         firstname: firstname,
         email: email,
         password: hashPassword,
         role: role
      });

      const userId = newUser.id;
      const name = lastname + ' ' + firstname;
      const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: '30m'
      });
      const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
         expiresIn: '1d'
      });
      await User.update({ refresh_token: refreshToken }, {
         where: {
            id: userId
         }
      });

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ msg: "Registration Successful" });
   } catch (error) {
      console.log(error);
   }
}

const checkEmail = async (email) => {
   let emailFilter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
   if (!emailFilter.test(email)) return "Неверный формат email";

   let user = await User.findAll({
      where: {
         email: email
      }
   });
   if (user.length) return "Пользователь уже существует";

   return false;
}

export const checkPassword = (password) => {
   let passwordFilter = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
   if (!passwordFilter.test(password))
      return "Пароль должен быть от 8 до 16 символов и содержать только латинские символы, а также хотя бы одну цифру";

   return false;
}

export const Login = async (req, res) => {
   try {
      const user = await User.findAll({
         where: {
            email: req.body.email
         }
      });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) return res.status(400).json({ wrong_password: "Неверный пароль" });
      const userId = user[0].id;
      const name = user[0].lastname + ' ' + user[0].firstname;
      const email = user[0].email;
      const role = user[0].role;
      const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: '30m'
      });
      const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
         expiresIn: '1d'
      });
      await User.update({ refresh_token: refreshToken }, {
         where: {
            id: userId
         }
      });
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
   } catch (error) {
      res.status(404).json({ no_email: "Пользователь не найден" });
   }
}

export const Logout = async (req, res) => {
   const refreshToken = req.cookies.refreshToken;
   if (!refreshToken) return res.sendStatus(204);
   const user = await User.findAll({
      where: {
         refresh_token: refreshToken
      }
   });
   if (!user[0]) return res.sendStatus(204);
   const userId = user[0].id;
   await User.update({ refresh_token: null }, {
      where: {
         id: userId
      }
   });
   res.clearCookie('refreshToken');
   return res.sendStatus(200);
}

export const DeleteUser = async (req, res) => {
   try {
      await User.destroy({
         where: {
            id: req.query.id
         }
      });
      res.json({
         "message": "Пользователь удалён"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

export const UpdateUser = async (req, res) => {
   try {
      await User.update({ lastname: req.body.lastname, firstname: req.body.firstname }, {
         where: {
            id: req.body.userId
         }
      });
      res.json({
         "message": "User Updated"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

export const userChangePassword = async (req, res) => {
   let { userId, password, confPassword } = req.body;
   let user = await User.findOne({
      where: {
         id: userId
      }
   });

   if (user == null) {
      return res.status(403).json({ token_error: 'Ссылка на сброс пароля недействительна' });
   } else {
      // Валидация пароля
      let validPassword = checkPassword(password);
      if (validPassword) return res.status(400).json({ error_password: validPassword });
      if (password !== confPassword) return res.status(400).json({ password_do_not_match: "Пароли не совпадают" });
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      await User.update({ password: hashPassword, refresh_token: null }, {
         where: {
            id: user.id
         }
      })
         .then(() => {
            res.status(200).json({ done: 'Пароль обновлён!' });
         });

   }
}
