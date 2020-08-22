import * as querystring from 'querystring'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import SpotifyConfig from './spotifyConfig'

export default (req, res) => {

  const config = SpotifyConfig(req)
  const code = req.query.code || null

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: querystring.stringify({
      code: code,
      redirect_uri: config.redirect_uri,
      grant_type: 'authorization_code',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +
        (new Buffer(config.CLIENT_ID + ':' + config.CLIENT_SECRET).toString(
          'base64')),
    },
  }).then((response) => {
    response.text().then(r => {
      res.json(r)
    })
  })

  // request.post(authOptions, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //
  //     var access_token = body.access_token,
  //       refresh_token = body.refresh_token
  //
  //     var options = {
  //       url: 'https://api.spotify.com/v1/me',
  //       headers: { 'Authorization': 'Bearer ' + access_token },
  //       json: true,
  //     }
  //
  //     // use the access token to access the Spotify Web API
  //     request.get(options, function (error, response, body) {
  //       console.log(body)
  //     })
  //
  //     // we can also pass the token to the browser to make requests from there
  //     res.redirect('/#' +
  //       querystring.stringify({
  //         access_token: access_token,
  //         refresh_token: refresh_token,
  //       }))
  //   } else {
  //     res.redirect('/#' +
  //       querystring.stringify({
  //         error: 'invalid_token',
  //       }))
  //   }
  // })
  // }
}
