import  { types } from 'mobx-state-tree'

export const App = types.model(
  'App',
  {
    locale: types.string,
  }
).actions(self => ({
  setLocale (locale) {
    self.locale = locale
  }
}))
