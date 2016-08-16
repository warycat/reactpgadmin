import { observable, computed } from 'mobx'
import _ from 'lodash'

export default class MainStore {
  @observable title
  userAgent
  babelEnv
  version
  params
  tables
  menu

  @computed get titleAndVersion() {
    return `${this.title} V${this.version}`
  }

  toJS() {
    return {
      title: this.title,
      userAgent: this.userAgent,
      nodeEnv: this.nodeEnv,
      version: this.version,
      params: this.params,
      tables: this.tables,
    }
  }

  static fromJS(obj) {
    const mainStore = new MainStore()
    Object.assign(mainStore, obj)
    mainStore.menu = _(obj.tables).reduce((menu, table) => {
      menu[table.schema] = menu[table.schema] || []
      menu[table.schema].push(table.name)
      return menu
    }, {})
    return mainStore
  }

  changeTitle() {
    this.title = 'React PG Admin'
  }

}
