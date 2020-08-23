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
    if ((await r.text()).toString().trim().length > 0) {
      r.json().then(async (r) => {
        res.json(r)
      }).catch(async (r) => {
        console.log(r)
        res.json({ error: r })
      })
    } else {
      res.json({error: "nodata"})
    }
  }

}
