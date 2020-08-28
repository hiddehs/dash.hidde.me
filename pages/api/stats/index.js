import Config from '../../../lib/config'
import { GrafanaFetcher } from './grafanaFetcher'

export default async (req, res) => {

  const config = Config()

  for (const s of config.servers) {
    await s.loadStats(config.grafana_instances[s.config.grafana_identifier])
  }

  res.json({ success: true, servers: config.getServers() })
}
