import moment from 'moment'

const validateToken = (token) => {
  const AUTH = process.env.AUTH

  const tokenContent = JSON.parse(Buffer.from(token, 'base64').toString('ascii'))

  // check expiry and token validation
  return tokenContent.auth === AUTH.substr(0, 3) && moment().valueOf() <= tokenContent.exp

}
const validateRequest = (req, res) => {
  res.statusCode = 401
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1].trim()
    if (validateToken(token)) {
      res.statusCode = 200
      res.json({
        ok: true,
        status: 200,
      })
      return true
    }
  } else {
    res.json({ ok: false, msg: 'Header missing', status: 401 })
  }
  res.json({ ok: false, status: 401 })
}

export default async (req, res) => {
  validateRequest(req, res)
  // res.json({ ok: false, status: 401 })
}

