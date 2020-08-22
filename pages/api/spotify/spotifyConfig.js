const SpotifyConfig = (req) => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = 'http' + '://' + req.headers.host +
    '/api/spotify/callback';

  return {
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uri
  }

}
export default SpotifyConfig;


