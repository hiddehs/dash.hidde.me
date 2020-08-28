import Config from '../../../lib/config'

export default async (req, res) => {

  const config = Config()

  config.servers.forEach(s => {
    s.loadStats()
  })

  res.json({ success: true, servers: config.getServers() })
}
