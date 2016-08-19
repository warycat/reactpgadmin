import { observable, computed } from 'mobx'
import _ from 'lodash'
import ajax from 'superagent-bluebird-promise'

export default class MainStore {
  @observable title
  @observable pg_tables
  @observable pg_views
  @observable err
  userAgent
  babelEnv
  version
  params

  @computed get titleAndVersion() {
    return `${this.title} V${this.version}`
  }

  @computed get tablesLists() {
    return _.reduce(this.pg_tables, (schemanames,table) => {
      schemanames[table.schemaname] = schemanames[table.schemaname] || []
      schemanames[table.schemaname].push(table.tablename)
      return schemanames
    }, {})
  }

  toJS() {
    return {
      title: this.title,
      userAgent: this.userAgent,
      nodeEnv: this.nodeEnv,
      version: this.version,
      params: this.params,
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

  requestTables() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM PG_CATALOG.PG_TABLES'})
      .then(res => {
        this.pg_tables = res.body
      })
      .catch(err => {
        this.err = err
      })
  }
}
