import * as querystring from 'querystring'
import moment from 'moment'

export class GrafanaFetcher {

  apiKey = ''
  url = ''
  identifier = ''
  prometheus_ds_id = ''

  constructor (config) {
    this.apiKey = config.api_key
    this.url = config.url
    this.identifier = config.identifier
  }

  async fetch (url) {
    return await fetch(url,
      { headers: { 'Authorization': 'Bearer ' + this.apiKey } })
  }

  async cpu (prometheus_ds_id) {
    this.prometheus_ds_id = prometheus_ds_id
    const result = await this.fetchPrometheus(
      '(((count(count(node_cpu_seconds_total{instance=~"localhost:9100",job=~"node_exporter"}) by (cpu))) - avg(sum by (mode)(irate(node_cpu_seconds_total{mode=\'idle\',instance=~"localhost:9100",job=~"node_exporter"}[5m])))) * 100) / count(count(node_cpu_seconds_total{instance=~"localhost:9100",job=~"node_exporter"}) by (cpu))')
    const data = await result.json()

    if (data.data && data.data.result.length > 0 &&
      data.data.result[0].values.length > 0) {
      const values = data.data.result[0].values.map((v) => parseFloat(v[1]))
      const sum = values.reduce((previous, current) => current += previous)
      return sum / values.length
    }
    return 0
  }

  async network () {
    return { test: false }
  }

  async fetchPrometheus (query, start = null, end = null, step = 300) {
    if (!start) start = moment().add(-2, 'hours').unix()
    if (!end) end = moment().unix()

    let queryString = querystring.stringify({
      query: query,
      start: start,
      end: end,
      step: step,
    })

    const rq_url = `${this.url}/api/datasources/proxy/${this.prometheus_ds_id}/api/v1/query_range?${queryString}`

    return await this.fetch(rq_url)
  }

}

//
// class PromtheusFetcher {
//   prometheus_host
//
//   constructor (prometheus_host) {
//     this.prometheus_host = prometheus_host
//     //  http://srv.hidde.me:9090/api/v1/query_range?query=
//   }
//

//   // https://monitor.srv.hidde.me/api/datasources/proxy/7/api/v1/query_range?query=(((count(count(node_cpu_seconds_total%7Binstance%3D~%22localhost%3A9100%22%2Cjob%3D~%22node_exporter%22%7D)%20by%20(cpu)))%20-%20avg(sum%20by%20(mode)(irate(node_cpu_seconds_total%7Bmode%3D%27idle%27%2Cinstance%3D~%22localhost%3A9100%22%2Cjob%3D~%22node_exporter%22%7D%5B5m%5D))))%20*%20100)%20%2F%20count(count(node_cpu_seconds_total%7Binstance%3D~%22localhost%3A9100%22%2Cjob%3D~%22node_exporter%22%7D)%20by%20(cpu))&start=1598608500&end=1598651700&step=300
//
//   async fetch (query, start = null, end = null, step = 500) {

//
//
//     console.log(rq_url)
//     var result =
//     console.log(await result.json())
//     return false
//   }
//
// }
