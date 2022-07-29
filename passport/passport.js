import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import admins from '../models/admins.js'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// 管理員登入驗證
passport.use('adminLogin', new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password'
}, async (account, password, done) => {
  try {
    // **要用什麼判斷要去哪裡找這個account?
    const user = await admins.findOne({ account })
    if (!user) {
      return done(null, false, { message: '管理員帳號不存在' })
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: '密碼錯誤' })
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))

// jwt簽發時帶id，驗證時解譯id
passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
  ignoreExpiration: true
}, async (req, payload, done) => {
  const expired = payload.exp * 1000 < Date.now()
  if (expired && req.originalUrl !== '/users/extend' && req.originalUrl !== '/users/logout') {
    return done(null, false, { message: '登入逾期' })
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    // **要用什麼判斷要去哪裡找這個account?
    const user = await admins.findById(payload._id)
    if (!user) {
      return done(null, false, { message: '管理員帳號不存在' })
    }
    if (user.tokens.indexOf(token) === -1) {
      return done(null, false, { message: '驗證錯誤' })
    }
    return done(null, { user, token })
  } catch (error) {
    return done(error, false)
  }
}))
