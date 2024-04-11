import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: false,
        select: false
    },
    avatar: {
        type: String,
        require: true,
    },
    background: {
        type: String,
        require: false,
    },
    followers: {
        type: Array,
        require: true
    },
    following: {
        type: Array,
        require: true
    },
    saved: {
        type: Array,
        require: true,
        select: false
    }
})

UserSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(`${this.password}`, 10);
    next();
})

const User = models.User || model("User", UserSchema);

export default User;