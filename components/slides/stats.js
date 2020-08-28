import React from 'react'
import Stat from './stat'
import useSWR from 'swr'

export default function Stats(){

  const fetcher = (args) => fetch(args).then(res => res.json())
  const {data, error} = useSWR("/api/stats", fetcher);

  if(!data) return 'loading';
  console.log(data.servers)

  return <>
    <div className="stats h-full flex items-center">
      {data.servers.map((server)=>{
        return <Stat server={ server}/>
      })}
     {/*<Stat/>*/}
     {/*<Stat/>*/}
     {/*<Stat/>*/}
    </div>
  </>
}
