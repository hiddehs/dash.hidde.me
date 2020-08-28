// {
//   "monitoring": {
//   "grafana": [
//     {
//       "drimpy": "eyJrIjoiVWhwd0tGQlRrdVJOaFpwODgxOHFFbjBoZkduMkVtYXAiLCJuIjoiZGFzaC5oaWRkZS5tZSIsImlkIjoxfQ=="
//     }
//   ],
//     "servers": [
//     {
//       "name": "web1.drimpy.com",
//       "grafana_identifier": "drimpy",
//       "prometheus_host": "web1.drimpy.com"
//     },
//     {
//       "name": "web1.drimpy.com",
//       "grafana_identifier": "drimpy",
//       "prometheus_host": "web1.drimpy.com"
//     }
//   ]
// }
// }
import fs from 'fs'

import Server from './stats/server'

const Config = () => {

  let grafana_instances = []
  let servers = []
  // init

  try {
    const data = fs.readFileSync('config.json', { encoding: 'utf-8' })
    let config = JSON.parse(data)

    grafana_instances = config.monitoring.grafana
    servers = config.monitoring.servers.map((s) => {
      return Server(s)
    })

  } catch (err) {
    console.error(err)
  }
  return {
    grafana_instances,
    servers,
    getServers () {
      return servers.map(s => ({ name: s.name, stats: s.stats }))
    },
  }
}
export default Config
