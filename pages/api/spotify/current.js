export default async (req, res) => {

  const access_token = req.headers.authorization.split('Bearer ')[1]

  let r = await fetch('https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { 'Authorization': 'Bearer ' + access_token } })
    res.statusCode = r.status
    try {
      let response = await r.json()
      res.json(response)
    } catch (e) {
      res.json({ error: 'nodata', raw: r.text() })
    }

}
