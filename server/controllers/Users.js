import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const GetUsers = async(req, res) => {
   try {
       const users = await User.findAll({
           attributes:['id','lastname','firstname','email', 'role']
       });
       res.json(users);
   } catch (error) {
       console.log(error);
   }
}

export const Register = async(req, res) => {
   const { lastname, firstname, email, password, confPassword } = req.body;
   let { role } = req.body;

   // Валидация email
   let validEmail = await checkEmail(email);
   if(validEmail) return res.status(400).json({email_invalid: validEmail});

   // Валидация пароля
   let validPassword = checkPassword(password);
   if(validPassword) return res.status(400).json({error_password: validPassword});
   if(password !== confPassword) return res.status(400).json({password_do_not_match: "Пароли не совпадают"});

   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(password, salt);

   try {
      if(!role) role = 'user';
      
      const newUser = await User.create({
         lastname: lastname,
         firstname: firstname,
         email: email,
         password: hashPassword,
         role: role
      });

      const userId = newUser.id;
      const name = lastname + ' ' + firstname;
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
   
      res.cookie('refreshToken', refreshToken,{
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({msg: "Registration Successful"});
   } catch (error) {
      console.log(error);
   }
}

const checkEmail = async(email) =>{
   let emailFilter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
   if(!emailFilter.test(email)) return "Неверный формат email";

   let user = await User.findAll({
      where:{
         email: email
      }
   });
   if(user.length) return "Пользователь уже существует";

   return false;
}

export const checkPassword = (password) =>{
   let passwordFilter = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
   if(!passwordFilter.test(password)) 
      return "Пароль должен быть от 8 до 16 символов и содержать только латинские символы, а также хотя бы одну цифру";

   return false;
}

export const Login = async(req, res) => {
   try {
      const user = await User.findAll({
         where:{
            email: req.body.email
         }
      });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if(!match) return res.status(400).json({wrong_password: "Неверный пароль"});
      const userId = user[0].id;
      const name = user[0].lastname + ' ' + user[0].firstname;
      const email = user[0].email;
      const role = user[0].role;
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
      res.cookie('refreshToken', refreshToken,{
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({accessToken});
   } catch (error) {
       res.status(404).json({no_email:"Пользователь не найден"});
   }
}

export const Logout = async(req, res) => {
   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken) return res.sendStatus(204);
   const user = await User.findAll({
       where:{
           refresh_token: refreshToken
       }
   });
   if(!user[0]) return res.sendStatus(204);
   const userId = user[0].id;
   await User.update({refresh_token: null},{
       where:{
           id: userId
       }
   });
   res.clearCookie('refreshToken');
   return res.sendStatus(200);
}


// export const getAllUsers = async (req, res) => {
//    try {
//        const users = await User.findAll();
//        res.json(users);
//    } catch (error) {
//        res.json({ message: error.message });
//    }  
// }


// export const getUserById = async (req, res) => {
//    try {
//        const user = await User.findAll({
//            where: {
//                id: req.params.id
//            }
//        });
//        res.json(user[0]);
//    } catch (error) {
//        res.json({ message: error.message });
//    }  
// }


// export const updateUser = async (req, res) => {
//    try {
//        await User.update(req.body, {
//            where: {
//                id: req.params.id
//            }
//        });
//        res.json({
//            "message": "User Updated"
//        });
//    } catch (error) {
//        res.json({ message: error.message });
//    }  
// }

// export const deleteUser = async (req, res) => {
//    try {
//        await User.destroy({
//            where: {
//                id: req.params.id
//            }
//        });
//        res.json({
//            "message": "User Deleted"
//        });
//    } catch (error) {
//        res.json({ message: error.message });
//    }  
// }