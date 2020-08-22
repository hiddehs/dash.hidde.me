export default async (req, res) => {

  var access_token = process.env.SPOTIFY_ACCESS_TOKEN;

  var r = await fetch('https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { 'Authorization': 'Bearer ' + access_token } })
  if (r.status === 200) {
    r = await r.json()
    res.statusCode = 200
    res.json(r)
  } else {
    res.statusCode = r.status
    res.json({ error: await r.text() })
  }

  // .then((r) => {
  //
  // }).catch(() => {
  //   res.statusCode = 400
  //   res.json({ error: 'Failed to request currently-playing' })
  // })

}
