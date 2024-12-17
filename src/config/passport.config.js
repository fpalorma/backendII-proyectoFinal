import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20"
import jwt from "passport-jwt"
import { userDao } from "../dao/mongo/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js"
import { cartDao } from "../dao/mongo/cart.dao.js";
import envsConfig from "./envs.config.js";


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


export const initializerPassport = () => {
    //Local
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, age, role } = req.body;
            const user = await userDao.getByEmail(username)
            if (user) return done(null, false, { message: "This user already exists" });

            const cart = await cartDao.create()

            const newUser = {
                first_name,
                last_name,
                age,
                email: username,
                password: createHash(password),
                role: role ? role : "user",
                cart: cart._id
            }
            const userRegister = await userDao.create(newUser);
            return done(null, userRegister)

        } catch (error) {
            return done(error)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userDao.getById(id);
            done(null, user)
        } catch (error) {
            done(error)
        }
    })

    //Google

    passport.use("google", new GoogleStrategy({
        clientID: envsConfig.CLIENT_ID,
        clientSecret: envsConfig.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/google"
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const { id, name, emails } = profile;
                const cart = await cartDao.create()
                const user = {
                    first_name: name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value,
                    cart: cart._id
                }
                const existingUser = await userDao.getByEmail(user.email)
                if (existingUser) {
                    return cb(null, existingUser)
                }
                const newUser = await userDao.create(user)
                return cb(null, newUser)
            } catch (error) {
                cb(error)
            }
        }))

    //JWT
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envsConfig.SECRET_KEY
    },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload)
            } catch (error) {
                return done(error)
            }
        }
    ))

    //Login

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {

            const user = await userDao.getByEmail(username);
            if (!user || !(await isValidPassword(password, user.password))) return done(null, false, { message: "Invalid credentials" })

            done(null, user)
        } catch (error) {
            done(error)
        }
    }))

};