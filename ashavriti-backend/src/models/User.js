// C:\Users\Aman Mehra\Edu_Hub\Asha_PMSSS\ashavriti-backend\src\models\User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
username: {
type: String,
required: [true, "Username is required"],
unique: true,
trim: true,
lowercase: true,
minlength: [3, "Username must be at least 3 characters long"]
},

```
email: {
  type: String,
  required: [true, "Email is required"],
  unique: true,
  trim: true,
  lowercase: true
},

password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [6, "Password must be at least 6 characters long"]
},

role: {
  type: String,
  enum: ["USER", "SAG", "FINANCE"],
  default: "USER"
}
```

},
{
timestamps: true
}
);

userSchema.pre("save", async function (next) {
try {
if (!this.isModified("password")) {
return next();
}

```
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);

next();
```

} catch (error) {
next(error);
}
});

userSchema.methods.comparePassword = async function (enteredPassword) {
return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
