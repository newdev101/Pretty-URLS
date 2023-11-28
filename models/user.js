const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {createTokenForUser} = require('../services/authentication');



const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default_img.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    salt: {
      type: String,
      //  required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


//for creating salt and hashing password
userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = randomBytes(16).toString();
  
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
  
    user.salt = salt;
    user.password = hashedPassword;
  }

  next();
});


//for checking password
userSchema.static('matchPasswordAndGenerateToken',async function(email, password) {
   const user = await this.findOne({email}).lean();
   if(!user) throw new Error('User not found!');

   const salt = user.salt;
   const hashedPassword = user.password;

   const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

   if(hashedPassword===userProvidedHash){
     const token = createTokenForUser(user);
     return token;
   }
   else throw new Error('password didn\'t match');

  });

const User = model("user", userSchema);
module.exports = User;
