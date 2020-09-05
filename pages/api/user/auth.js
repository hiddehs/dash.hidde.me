import moment from 'moment'

export default async (req, res) => {

  const inputPass = JSON.parse(req.body).pass
  const AUTH = process.env.AUTH
  if (Buffer.from(inputPass).toString('base64') === AUTH) {
    res.json({
      ok: true,
      token: Buffer.from(JSON.stringify({
        auth: AUTH.substr(0, 3),
        exp: moment().add(2, 'second').valueOf(),
      })).toString('base64'),
    })
    return
  }

  res.statusCode = 401
  res.json({
    ok: false,
  })

}
