import React from 'react'
import Stat from './stat'
import useSWR from 'swr'

export default function Stats () {

  const authToken = (process.browser) ? localStorage.getItem('auth') : ''

  const url = '/api/stats';
  const fetcher = (...args) => fetch(url, {
    headers: { 'Authorization': 'Bearer ' + authToken },
  }).then(res => res.json())
  const { data, error, mutate } = useSWR(url, fetcher)

  if (!data || !data.servers) return '⏳'

  setTimeout(() => {
    mutate()
  }, 5000)

  return <>
    <div className="stats grid grid-cols-4 gap-8">
      {data.servers.map((server) => {
        return <Stat server={server}/>
      })}
    </div>
  </>
}
