import { GrafanaFetcher } from '../../pages/api/stats/grafanaFetcher'

export default function Server (serverConfig) {

  let config = {
    grafana_identifier: '',
    prometheus_ds_id: '',
    network_int: 'eth0',
  }
  let name = 'default_name'

  if (serverConfig) {
    config = Object.assign(config, serverConfig)
    name = serverConfig.name
  }

  let stats = {
    cpu: 1,
    network: 1,
  }

  const loadStats = async (grafanaFetcher) => {
    stats.cpu = await grafanaFetcher.cpu(config.prometheus_ds_id)
    stats.network = await grafanaFetcher.network(config.prometheus_ds_id, config.network_int)
  }

  return {
    name,
    config,
    stats,
    loadStats,
  }
}
