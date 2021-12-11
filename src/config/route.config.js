import JwtPassort from "passport-jwt";
import dotenv from "dotenv";
import { required } from "joi";
dotenv.config({
    path: require('path').resolve(__dirname, '../.env'),
});

//Database
import { UserModel } from "../database/user";
import passport from "passport";

const JWTStrategy = JwtPassort.Strategy;
const ExtractJwt = JwtPassort.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoAPP"
};

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async(jwt__payload, done)=> {
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null, false);

                return done(null, doesUserExist);
            }catch(error){
                throw new Error(error);
            }
        })
    )
}