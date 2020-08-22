import NowPlaying from '../../components/np'
import Time from '../../components/time'
import ContentWrapper from '../../components/content_wrapper'
import NowPlayingBackground from '../../components/np_background'
import useSWR from 'swr'
import moment from 'moment'

const TV = () => {
  // spotifyCurrent


  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, mutate, error } = useSWR('/api/spotify/current', fetcher)

  if (error) return 'failed'
  if (!data) return 'loading'

  const npData = {
    cover: data.item.album.images[0].url,
    title: data.item.name,
    artist: data.item.artists.map(a => a.name).join(', '),
    album: data.item.album.name,
    year: moment(data.item.album.release_date).year(),
    playlist: null,
  }

  // next refresh

  var timeLeft = data.item.duration_ms - data.progress_ms + 1000
  console.log("refreshing in ... " + timeLeft + " ..ms..")
  setTimeout(()=>{
    mutate()
  }, timeLeft)



  return (
    <>
      <div id="tv" className="wrapper px-24 grid grid-rows-4 h-screen">
        <header className="row-span-1 h-full w-full flex items-center">
          <div className="">
            <NowPlaying np={npData}/>
          </div>
        </header>

        <main className="row-span-2">
          <ContentWrapper/>
        </main>
        <footer className="grid row-span-1 overflow-hidden h-full w-full flex items-center">
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


// export async function getStaticProps () {
// }

export default TV;
