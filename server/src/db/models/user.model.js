const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
// const { JWT_SECRET } = process.env

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide Email Id"],
    },
    password: {
      type: String,
      required: [true, "Please provide Password"],
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    color: {
      type: Number,
      required: false,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
    //     isAvtarImageSet:{
    //             type:Boolean,
    //             default:false
    //     },
    //     avtarImage:{
    //         type:String,
    //         default:""
    // }
    // confirmPassword: {
    //   type: String,
    //   required: [false, "Please provide confirm Password"],
    // },
  },
  { timestamps: true }
);

// for hashing password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// // for comparing hash
// UserSchema.methods.comparePassword = async function (password, StoredPassword) {
//   const ismatched = await bcrypt.compare(password, StoredPassword);
//   return ismatched;
// };

// for creating / genrating token
UserSchema.methods.CreateToken = function () {
  const payload = {
    userId: this._id,
    email: this.email,
  };
  const createToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return createToken;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
