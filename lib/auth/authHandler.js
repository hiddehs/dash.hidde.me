const handle = () => {
  return new Promise((resolve, reject) => {
    if (process.browser) {
      if (localStorage !== undefined && localStorage.getItem('auth')) {
        fetch('/api/user/@me', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth') },
        }).then((authRequest) => {
          authRequest.json().then((authResult) => {
            if (authResult.ok) {
              resolve(true)
            } else {
              reject(false)
            }
          })
        }).catch((e) => {
          reject(e)
        })
      } else {
        reject('localStorage not available')
      }
    }
  })
}

export default handle()
