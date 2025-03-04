const bcrypt = require("bcrypt");
const UserModel = require("../db/models/user.model");
const maxAge = 3 * 24 * 60 * 60 * 1000; //3 days

exports.Register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide required information for Register",
    });
  }

  const emailCheck = await UserModel.findOne({ email });
  if (emailCheck) {
    return res.json({ msg: "email already used", status: false });
  }

  try {
    const newUser = await UserModel.create({ email, password });

    const token = newUser.CreateToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge,
    });

    if (newUser) {
      return res.status(201).json({
        status: true,
        message: "User registered successfully",
        user: newUser,
        token,
      });
    }

    res.status(500).json({
      status: false,
      message: "User creation failed, please try again",
    });
  } catch (error) {
    console.error("Error occurred while registering: ", error);

    res.status(500).json({
      status: false,
      message: "Failed to register the user",
      error: error.message,
    });
  }
};


exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required for login",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatched = await user.comparePassword(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User login successful",
      user
      // token
    });
  } catch (error) {
    console.error("Error occurred while logging in: ", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.userInfo = async (req, res) => {

  try {

    const _id = req.user.userId

    const user = await UserModel.findById({ _id });
    console.log("user: ", user)
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      })
    };

    res.status(200).json({
      status: true,
      message: "User data fetched successfully",
      user
    })

  } catch (error) {
    console.log("Error in fetching user data", error)
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    })

  }
}
