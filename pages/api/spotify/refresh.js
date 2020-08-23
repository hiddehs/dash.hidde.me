import SpotifyConfig from './spotifyConfig'
import * as querystring from 'querystring'

export default async (req, res) => {
// console.log((await req.body.json()).refresh_token)
  const token = JSON.parse(req.body).refresh_token
  const config = SpotifyConfig(req)
  const code = req.query.code || null

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: querystring.stringify({
      refresh_token: token,
      grant_type: 'refresh_token',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +
        (new Buffer(config.CLIENT_ID + ':' + config.CLIENT_SECRET).toString(
          'base64')),
    },
  }).then(async (response) => {
    response.json().then(async (r) => res.json(r)).catch(async (e) => {
      res.json({ error: e })
    })
  })

}
