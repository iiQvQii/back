import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import admins from '../models/admins.js'
import hosts from '../models/hosts.js'
import helpers from '../models/helpers.js'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// 定義驗證方式
// done(錯誤, req.user內容, info內容)
passport.use('login', new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, account, password, done) => {
  try {
    let user
    if (req.body.role === 0) {
      user = await admins.findOne({ account })
    } else if (req.body.role === 1) {
      user = await hosts.findOne({ account })
    } else {
      user = await helpers.findOne({ account })
    }
    if (!user) {
      return done(null, false, { message: '帳號不存在' })
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: '密碼錯誤' })
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))

// // jwt簽發時帶id，驗證時解譯id
// done(錯誤, req.user內容, info內容)
passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
  ignoreExpiration: true
}, async (req, payload, done) => {
  // const expired = payload.exp * 1000 < Date.now()
  // if (expired && req.originalUrl !== '/users/extend' && req.originalUrl !== '/users/logout') {
  //   return done(null, false, { message: '登入逾期' })
  // }
  const token = req.headers.authorization.split(' ')[1]
  try {
    let user
    if (payload.role === 0) {
      user = await admins.findById(payload._id)
    } else if (payload.role === 1) {
      user = await hosts.findById(payload._id)
    } else {
      user = await helpers.findById(payload._id)
    }
    if (!user) {
      return done(null, false, { message: '此帳號不存在' })
    }
    if (user.tokens.indexOf(token) === -1) {
      return done(null, false, { message: '驗證錯誤' })
    }
    return done(null, { user, token })
  } catch (error) {
    console.log(error)
    return done(error, false)
  }
}))
