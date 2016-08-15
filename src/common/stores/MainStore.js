import { observable } from 'mobx'

export default class MainStore {
  @observable title
  userAgent
  babelEnv
  version

  toJS() {
    return {
      title: this.title,
      userAgent: this.userAgent,
      babelEnv: this.babelEnv,
      version: this.version,
    }
  }

  static fromJS(obj) {
    const mainStore = new MainStore()
    Object.assign(mainStore, obj)
    return mainStore
  }
}
