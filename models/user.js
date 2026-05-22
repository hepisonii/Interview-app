const {Schema, model} = require("mongoose")
const {createHmac, randomBytes} = require("crypto");
const {setToken} = require("../services/auth")
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["male","female"],
    },
    qualifications: {
        type: String,
    },
    role: {
        type: String,
        enum: ["backend","frontend","cybersecurity"],
    }
});

userSchema.pre("save", async function (){
    const user = this;
    if(!user.isModified("password")) return;
    const password = user.password;
    const salt = randomBytes(16).toString("hex");
    const hashed = createHmac("sha256", salt).update(password).digest("hex");
    user.password = hashed;
    user.salt = salt;
})

userSchema.static("matchPassword",async function (username,password){
    const user = await this.findOne({username});
    if(!user) return false;
    const salt = user.salt;
    const hashed = user.password;
    const providedHashed = createHmac("sha256", salt).update(password).digest("hex");
    if(providedHashed === hashed){
    const token = setToken(user);
    return token;
    }

})

const User = model("user", userSchema);

module.exports = User;