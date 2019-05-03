const test = require('tape')
const argon2 = require('argon2')
const { User } = require('./model')

test('User model should be invalid if email is empty', (t) => {
  const user = new User({ password: 'thisissecret', email: '' })
  user.validate((err) => {
    t.equal(err.errors.email.message, 'Email is required', 'invalid if email is empty')
  })
  t.end()
})

test('User model should be invalid if email is invalid', (t) => {
  const user = new User({ password: 'thisissecret', email: 'jeremiahatgmail.com' })
  user.validate((err) => {
    t.equal(err.errors.email.message, 'Please use a valid email address', 'invalid if email is invalid')
  })
  t.end()
})

test('User model should be invalid if password is empty', (t) => {
  const user = new User({ email: 'jeremiah@gmail.com', password: '' })
  user.validate((err) => {
    t.equal(err.errors.password.message, 'Password is required', 'invalid if password is empty')
  })
  t.end()
})

test('User model should set default role as user', (t) => {
  const user = new User({ email: 'jeremiah@gmail.com', password: 'thisissecret' })
  t.equal(user.roles[0], 'user', 'sets default role as user')
  t.equal(user.roles.length, 1, 'sets only one default role')
  t.end()
})

test('User model comparePassword() returns true when password matches', async (t) => {
  t.plan(1)

  const hashedPassword = await argon2.hash('thisissecret')
  const user = new User({ email: 'jeremiah@gmail.com', password: hashedPassword })

  try {
    const result = await user.comparePassword('thisissecret')
    t.equal(result, true, 'returns true when password matches')
  } catch (error) {
    t.fail(error)
  }
})

test('User model comparePassword() returns false when password does not match', async (t) => {
  t.plan(1)

  const hashedPassword = await argon2.hash('thisissecret')
  const user = new User({ email: 'jeremiah@gmail.com', password: hashedPassword })

  try {
    const result = await user.comparePassword('thisisdifferent')
    t.equal(result, false, 'returns false when password does not match')
  } catch (error) {
    t.fail(error)
  }
})
