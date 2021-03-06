import fs from 'fs'

import Server from './stats/server'
import { GrafanaFetcher } from '../pages/api/stats/grafanaFetcher'

const Config = () => {

  let grafana_instances = []
  let servers = []
  // init

  try {
    let data
    try {
      data = fs.readFileSync('config.json', { encoding: 'utf-8' })
    } catch (e) {
      data = Buffer.from(process.env.CONFIG_JSON, 'base64').toString('ascii')
    }
    let config = JSON.parse(data)

    config.monitoring.grafana.forEach((obj) => {
      grafana_instances[obj.identifier] = new GrafanaFetcher(obj)
    })

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
      return servers.map(
        s => ({ name: s.name, config: s.config, stats: s.stats }))
    },
  }
}
export default Config
