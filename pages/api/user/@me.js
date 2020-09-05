import moment from 'moment'

const validateToken = (token) => {
  const AUTH = process.env.AUTH

  const tokenContent = JSON.parse(Buffer.from(token, 'base64').toString('ascii'))

  // check expiry and token validation
  return tokenContent.token === AUTH.substr(0, 3) && moment().valueOf() <= tokenContent.exp;

}

export default async (req, res) => {

  if (req.header.Authorization) {
    const token = req.header.Authorization.split('Bearer ')[1].trim()
    if (validateToken(token)) {
      res.json({
        ok: true,
      })
    }
  }
  res.statusCode = 401
  res.json({ ok: false })
}

