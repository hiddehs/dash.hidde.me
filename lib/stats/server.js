import { GrafanaFetcher } from '../../pages/api/stats/grafanaFetcher'

export default function Server (serverConfig) {

  let config = {
    grafana_identifier: '',
    prometheus_host: '',
  }
  let name = 'default_name'

  if (serverConfig) {
    config = serverConfig
    name = serverConfig.name
  }

  let stats = {
    cpu: 1,
    network: 1,
  }

  const loadStats = (grafanaFetcher) => {
    stats.cpu = .2
    stats.network = grafanaFetcher.fetch()
  }

  return {
    name,
    config,
    stats,
    loadStats,
  }
}
