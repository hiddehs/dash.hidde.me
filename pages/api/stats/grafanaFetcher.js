export class GrafanaFetcher {

  apiKey = ''

  constructor (apiKey) {
    this.apiKey = apiKey
  }

  fetch () {
    return { test: false }
  }

}
