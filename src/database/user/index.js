import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String},
    address: [{ details: {type: String}, for: {type:String} }],
    phoneNumber: [{type: Number}]
},{
    timestamps: true
});

//statics and methods

UserSchema.methods.generateJwtToken = function () {
    //generate JWT auth token
    return jwt.sign( { user: this._id.toString() },"ZomatoAPP");
}

UserSchema.statics.findByEmailAndPassword = async ({password, email}) => {
    //check whether email exists
    const user = await UserModel.findOne({email});
    if(!user)
    {
        throw new Error("User does not exist!!!");
    }

    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if(!doesPasswordMatch) throw new Error("Invalid Password!!!");

    return user;
}

UserSchema.statics.findByEmailAndPhone = async ({email, phoneNumber}) => {
    //check whether email exists
    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserByPhone = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhone)
    {

        throw new Error("User already exists!");
    }

    return false;
}

UserSchema.pre("save", function(next) {
    const user = this;

    //password is modified
    if(!user.isModified("password")) return next();

    //password bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if(error) return next(error);

        //hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error);

            //assigning hashed password
            user.password = hash;
            return next();
        });

    });

    //hash password
    // const bcryptSalt = await bcrypt.genSalt(8);
    // const hashedPassword = await bcrypt.hash(password, bcryptSalt);

});



export const UserModel = mongoose.model("Users", UserSchema)