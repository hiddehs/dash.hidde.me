import React from 'react'
import useSWR from 'swr'
import moment from 'moment'

export default function NowPlaying ({np}) {

  return (
    <div className="np-block flex items-center nowrap overflow-hidden">
      <div className="cover bg-gray-200 shadow-lg w-32 h-32 border-0">
        <img src={np.cover} alt="Cover" width="130px"
             className="w-full h-full border-none" style={{minWidth: "130px"}}/>
      </div>
      <div className="content ml-4">
        <h1 className="leading-tight">{np.title}</h1>
        <h3 className="leading-tight">{np.artist} – {np.album} ({np.year})</h3>
      </div>
    </div>
  )
}
