import React from 'react'
import useSWR from 'swr'
import moment from 'moment'

export default function NowPlaying () {

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, mutate, error } = useSWR('/api/spotify/current', fetcher)

  if (error) return 'failed'
  if (!data) return 'loading'

  const np = {
    cover: data.item.album.images[0].url,
    title: data.item.name,
    artist: data.item.artists.map(a => a.name).join(', '),
    'album': data.item.album.name,
    'year': moment(data.item.album.release_date).year(),
    'playlist': null,
  }

  // next refresh

  var timeLeft = data.item.duration_ms - data.progress_ms + 1000
  console.log("refreshing in ... " + timeLeft + " ..ms..")
  setTimeout(()=>{
    mutate()
    console.log("Refresh!")
  }, timeLeft)



  return (
    <div className="np-block flex items-center">
      <div className="cover bg-gray-200 shadow-lg w-32 h-32 border-0">
        <img src={np.cover} alt="Cover" width="130px"
             className="w-full h-full border-none"/>
      </div>
      <div className="content ml-4">
        <h1 className="leading-tight">{np.title}</h1>
        <h3 className="leading-tight">{np.artist} – {np.album}</h3>
      </div>
    </div>
  )
}
