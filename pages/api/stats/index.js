import Config from '../../../lib/config'
import { GrafanaFetcher } from './grafanaFetcher'
import validateRequest from '../../../lib/auth/api/handler'

export default async (req, res) => {

  if (validateRequest(req, res, false)) {

    const config = Config()

    for (const s of config.servers) {
      await s.loadStats(config.grafana_instances[s.config.grafana_identifier])
    }

    res.json({ success: true, servers: config.getServers() })
  } else {
    res.json({ ok: false, msg: 'authorization invalid' })
  }

}
