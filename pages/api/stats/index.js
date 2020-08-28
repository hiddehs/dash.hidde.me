import Config from '../../../lib/config'
import { GrafanaFetcher } from './grafanaFetcher'

export default async (req, res) => {

  const config = Config()

  config.servers.forEach(s => {
    s.loadStats(config.grafana_instances[s.config.grafana_identifier])
  })

  res.json({ success: true, servers: config.getServers() })
}
