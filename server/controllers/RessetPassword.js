import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { checkPassword } from "./Users.js";

export const SendEmail = async(req, res) => {
    // Валидация email
   const { email } = req.body;
   if (email === '') return res.status(400).json({email_invalid: 'Введите email'});
   let getUser = await checkEmail(email);
   if(typeof getUser === 'string') return res.status(400).json({email_invalid: getUser});

   try {
      const userId = getUser.id;
      const name = getUser.lastname + ' ' + getUser.firstname;
      const email = getUser.email;
      const role = getUser.role;

      const accessToken = jwt.sign({userId, name, email, role}, process.env.ACCESS_TOKEN_SECRET,{
         expiresIn: '30m'
      });
      const refreshToken = jwt.sign({userId, name, email, role}, process.env.REFRESH_TOKEN_SECRET,{
         expiresIn: '1d'
      });
      await User.update({refresh_token: refreshToken},{
         where:{
            id: userId
         }
      });

      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
         },
      });

      const mailOptions = {
         from: 'Cinemax 🎞 <cinemax@gmail.com>',
         to: `${email}`,
         subject: 'Сброс пароля',
         text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/resetPassword/${refreshToken}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
         if (err) {
            console.error('there was an error: ', err);
         } else {
            res.status(200).json('recovery email sent');
         }
      });
   } catch (error) {
      console.log(error);
   }
}

const checkEmail = async(email) =>{
   let emailFilter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
   if(!emailFilter.test(email)) return "Неверный формат email";

   let user = await User.findOne({
      where:{
         email: email
      }
   });
   if(user === null) return "Пользователь не существует";

   return user;
}

export const resetPassword = async(req, res) =>{
   let user = await User.findOne({
      where:{
         refresh_token: req.query.resetToken
      }
   });

   if (user == null) {
      return res.status(403).json({ token_error:'Ссылка на сброс пароля недействительна'});
   } else {
      return res.status(200);
   }
}
export const changePassword = async(req, res) =>{
   let {resetToken, password, confPassword} = req.body;
   let user = await User.findOne({
      where:{
         refresh_token: resetToken
      }
   });

   if (user == null) {
      return res.status(403).json({ token_error:'Ссылка на сброс пароля недействительна'});
   } else {
      // Валидация пароля
      let validPassword = checkPassword(password);
      if(validPassword) return res.status(400).json({error_password: validPassword});
      if(password !== confPassword) return res.status(400).json({password_do_not_match: "Пароли не совпадают"});
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      await User.update({password: hashPassword},{
         where:{
            id: user.id
         }
      })
      .then(() => {
         res.status(200).json({ done: 'Пароль обновлён!' });
       });
      
   }
}