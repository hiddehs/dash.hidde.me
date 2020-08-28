import * as querystring from 'querystring'
import SpotifyConfig from '../../../lib/spotify/spotifyConfig'

export default (req, res) => {

  // your application requests authorization
  const config = SpotifyConfig(req);
  const scope = 'user-read-private user-read-email user-read-playback-state';

  // res.json({ 'client_id': config.redirect_uri })
  // return
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: config.CLIENT_ID,
      scope: scope,
      redirect_uri: config.redirect_uri,
      state: 'state',
    }))

}
