export default async (req, res) => {

  const access_token = req.headers.authorization.split('Bearer ')[1]

  let r = await fetch('https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { 'Authorization': 'Bearer ' + access_token } })
  if (r.status === 200) {
    r = await r.json()
    res.statusCode = 200
    res.json(r)
  } else {
    res.statusCode = r.status
    r.json().then(async (r) => {
      await res.json(r)
    }).catch(async () => {
      res.json({ error: await r.text() })
    })
  }

}
