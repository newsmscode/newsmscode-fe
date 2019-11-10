import { types } from 'mobx-state-tree'

const makeToastId = () => `${Date.now()}${Math.random()}`

export const Toast = types.model(
  'Toast',
  {
    list: types.array(types.frozen())
  }
).actions(self => ({
  addToast (msg) {
    self.list.push({
      id: makeToastId(),
      ...msg
    })
  },
  optionsToast (message, options) {
    self.addToast({
      message,
      options
    })
  },
  variantToast (message, variant) {
    self.optionsToast(message, { variant })
  },
  info (message) {
    self.variantToast(message, 'info')
  },
  success (message) {
    self.variantToast(message, 'success')
  },
  warning (message) {
    self.variantToast(message, 'warning')
  },
  error (message) {
    self.variantToast(message, 'error')
  },
  default (message) {
    self.variantToast(message, 'default')
  },
  removeToast (id) {
    const index = self.list.findIndex(t => t.id === id)
    if (index === -1) {
      return
    }

    self.list.splice(index, 1)
  }
}))
