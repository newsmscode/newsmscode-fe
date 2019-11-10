import { types, applySnapshot } from 'mobx-state-tree'
import devConfig from '../config/config.dev'

import { App } from './modules/app'
import { Toast } from './modules/toast'

let store = null

const Store = types.model({
  app: App,
  toast: Toast
})

export const initializeStore = (isServer, snapshot = null) => {
  if (isServer || store === null) {
    store = Store.create({
      app: App.create({
        locale: devConfig.defaultLocale
      }),
      toast: Toast.create({ list: [] })
    })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}
