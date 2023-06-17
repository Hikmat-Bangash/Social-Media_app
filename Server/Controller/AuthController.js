import UserModel from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//==================== registering new user =================
export const RegisterUser = async (req, res) => {
  // const {username, firstname,lastname, password} = req.body;
  //----------- first we check whether the username is already registered or not --------------------
   console.log(req.body)
  const username = req.body.username;
  try {
    const oldUsername = await UserModel.findOne({ username: username });
    
    if (!oldUsername) {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const NewUser = await UserModel(req.body);
      const user = await NewUser.save();

      res.status(200).json(user);
    } else {
      res.status(401).json("THis username already registered");
    }
  } catch (error) {
    res.status(500).json(error);
  }

};

// ============== FOR (LOGIN) USER ============
export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    // checking if user username is matching or not
    const user = await UserModel.findOne({ username: username });

    // checking if username is matching or not
    if (user) {
      // after usename is matched then checking password
      const validity = await bcrypt.compare(password, user.password);
      
      if (validity) {
        const token = jwt.sign(
          {
            email: user.username,
            name: user.firstname,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({user, token});
      } else {
        res.status(401).json("Wrong credentials");
      }
    }
    // if username is wrong
    else {
      res.status(401).json("Invalid user! please try again");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
