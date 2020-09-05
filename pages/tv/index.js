import NowPlaying from '../../components/np'
import Time from '../../components/time'
import ContentWrapper from '../../components/content_wrapper'
import NowPlayingBackground from '../../components/np_background'
import useSWR from 'swr'
import moment from 'moment'
import auth from '../api/user/auth'
import authHandler from '../../lib/auth/authHandler'

const TV = () => {
let fullScreen;
  // spotifyCurrent
  let npData = false
  const processSpotifyAuth = (spotifyPayload) => {
    if (process.browser) {
      localStorage.setItem('spotify_access_token',
        spotifyPayload.access_token)
      localStorage.setItem('spotify_expire',
        moment().
          add(spotifyPayload.expires_in, 'seconds').
          add(-10, 'seconds').
          valueOf().
          toString()) // refresh 10 seconds before expiry
      localStorage.setItem('spotify_refresh_token',
        spotifyPayload.refresh_token)
    }
  }
  if (process.browser) {

    authHandler.then((b)=>{
      if(!b) window.location = "/"
    })

    if (location.hash) {
      const base_64 = location.hash.split('#')[1]
      if (base_64 !== 'null') {
        const base64decoded = Buffer.from(base_64, 'base64').toString('utf-8')
        let spotifyPayload = JSON.parse(base64decoded)
        console.log(spotifyPayload)
        processSpotifyAuth(spotifyPayload)

        location.hash = ''
      }
    }
  }
  let access_token = ''
  if (process.browser) {

    const refreshToken = (refresh_token) => {
      fetch('/api/spotify/refresh',
        {
          method: 'POST',
          body: JSON.stringify({ refresh_token: refresh_token }),
        }).
        then(async (r) => {
          processSpotifyAuth(await r.json())
        }).catch((e) => {
        console.log('rfreshing failed ')
        console.log(e)
        window.location = '/api/spotify/authorize'
      })
    }

    if (!localStorage.getItem('spotify_access_token')) {
      window.location = '/api/spotify/authorize'
    } else {
      access_token = localStorage.getItem('spotify_access_token')
    }

    if (localStorage.getItem('spotify_expire')) {

      const ms = moment(parseInt(localStorage.getItem('spotify_expire'))).
        diff(moment(), 'millisecond')

      console.log('refreshing token in ' + ms)
      setTimeout(() => {
        refreshToken(localStorage.getItem('spotify_refresh_token'))
      }, ms)
    }

  }
  const url = '/api/spotify/current'

  const fetcher = (...args) => fetch(url, {
    headers: { 'Authorization': 'Bearer ' + access_token },
  }).then(res => res.json())

  const { data, error, mutate } = useSWR(url, fetcher)

  if (error) {
    console.log(error)
    return <div>failed to load spotify</div>
  }
  if (!data) return <div>loading...</div>
  if (data.error) {
    if (data.error.status === 401) {
      console.log(data.error)
      if (process.browser) {
        window.location = '/api/spotify/authorize'
      } else {
        console.log('not browser so no redirect')
      }
    }
  } else {
    npData = {
      cover: data.item.album.images[0].url,
      title: data.item.name,
      artist: data.item.artists.map(a => a.name).join(', '),
      album: data.item.album.name,
      year: moment(data.item.album.release_date).year(),
      playlist: null,
    }
//
    // // next refresh
    //
    var timeLeft = data.item.duration_ms - data.progress_ms + 1000
    console.log('refreshing in ... ' + timeLeft + ' ..ms..')
    setTimeout(() => {
      mutate()
    }, timeLeft)


    fullScreen = () =>{
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
  }

  return (
    <>
      <div  id="tv" className="wrapper px-24 grid grid-rows-4 h-screen">
        <header onClick={fullScreen} className="row-span-1 h-full w-full flex items-center">
          <div className="">
            <NowPlaying np={npData}/>
          </div>
        </header>

        <main className="row-span-2">
          <ContentWrapper/>
        </main>
        <footer onClick={fullScreen}
          className="grid row-span-1 overflow-hidden h-full w-full flex items-center">
          <div className="grid grid-cols-6">
            <Time className="col-span-4"/>
            <img src="logo.svg" alt="logo"
                 className="col-span-2 ml-auto mt-auto mb-3"/>
          </div>
        </footer>
        <NowPlayingBackground np={npData}/>
      </div>
    </>
  )
}

export default TV
