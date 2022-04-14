export default function ({ $axios, store, redirect }) {
    $axios.setBaseURL('http://localhost:3001/api/')

    $axios.onRequest(config => {
      if(store.state.authenticated && store.state.token)
      {
        config.headers.common['Authorization'] = `Bearer ${store.state.token}`
      }
      
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
        redirect('/login')
      }
      return Promise.reject(error.response.data)
    })
}