import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import admins from '../models/admins.js'

const LocalStrategy = passport.Strategy

passport.use('login', new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password'
}, async (account, password, done) => {
  try {
    if () 
  } catch (error) {

  }
}))
