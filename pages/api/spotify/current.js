export default async (req, res) => {
  if (!req.headers.authorization) {
    res.statusCode = 401
    res.json({ msg: 'No Authorization Header supplied' })
    return
  }

  const access_token = req.headers.authorization.split('Bearer ')[1]
  let result

  try {
    let r = await fetch('https://api.spotify.com/v1/me/player/currently-playing',
      { headers: { 'Authorization': 'Bearer ' + access_token } })
    result = await r.text()
    res.statusCode = r.status

    const jsonResult = JSON.parse(result)

    res.json(jsonResult)
  } catch (e) {
    res.json({ error: 'nodata', raw: result })
  }
}
