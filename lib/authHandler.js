const handle = () => {
  return new Promise((resolve, reject) => {
    if (localStorage && localStorage.getItem('auth')) {

      fetch('/api/user/@me', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth') },
      }).then((authRequest) => {
        authRequest.json().then((authResult) => {
          resolve(authResult.ok)
        })
      })
    } else {
      reject("localStorage not available")
    }

  })
}

export default handle()
