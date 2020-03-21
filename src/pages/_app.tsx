import React from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { loadUser } from '../redux/features/user/actions'
import { loadUserFromLocalStorage } from '../services/localstorage'

import '../normalize.css'
import '../styles.css'

Router.events.on('routeChangeComplete', () => {
  window.scrollTo(0, 0)
})

class MyApp extends React.Component<AppProps> {
  componentDidMount() {
    // Loading user from localstorage if not already in global state
    const state = store.getState()
    const user = loadUserFromLocalStorage()
    if (user.jwt && user.username && !state.user.user.username) {
      store.dispatch(loadUser(user))
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}
export default MyApp
