import moment from 'moment'

const validateToken = (token) => {
  const AUTH = process.env.AUTH

  const tokenContent = JSON.parse(Buffer.from(token, 'base64').toString('ascii'))

  // check expiry and token validation
  return tokenContent.auth === AUTH.substr(0, 3) && moment().valueOf() <= tokenContent.exp

}
const validateRequest = (req, res, writeResult) => {
  res.statusCode = 401
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1].trim()
    if (validateToken(token)) {
      res.statusCode = 200
      if(writeResult) res.json({
        ok: true,
        status: 200,
      })
      return true
    }
  } else {
    if(writeResult) res.json({ ok: false, msg: 'Header missing', status: 401 })
  }
  if(writeResult) res.json({ ok: false, status: 401 })
  return false;
}
export default validateRequest
