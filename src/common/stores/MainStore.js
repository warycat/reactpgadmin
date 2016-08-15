import { observable, computed } from 'mobx'

export default class MainStore {
  @observable title
  userAgent
  babelEnv
  version
  params

  @computed get titleAndVersion() {
    return `${this.title} V${this.version}`
  }

  toJS() {
    return {
      title: this.title,
      userAgent: this.userAgent,
      nodeEnv: this.nodeEnv,
      version: this.version,
      params: this.params
    }
  }

  static fromJS(obj) {
    const mainStore = new MainStore()
    Object.assign(mainStore, obj)
    return mainStore
  }

  changeTitle() {
    this.title = 'React PG Admin'
  }
}
