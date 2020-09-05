import React from 'react'
import Stat from './stat'
import useSWR from 'swr'

export default function Stats(){

  const fetcher = (args) => fetch(args).then(res => res.json())
  const {data, error, mutate} = useSWR("/api/stats", fetcher);


  if(!data) return '⏳';
  setTimeout(()=>{
    mutate()
  }, 5000);

  return <>
    <div className="stats grid grid-cols-4 gap-8">
      {data.servers.map((server)=>{
        return <Stat server={ server}/>
      })}
    </div>
  </>
}
