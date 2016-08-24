import { observable, computed, action, asFlat, asMap } from 'mobx'
import _ from 'lodash'
import ajax from 'superagent-bluebird-promise'

export default class MainStore {
  @observable title = ''
  @observable tables = asFlat([])
  @observable views = asFlat([])
  @observable columns = asFlat([])
  @observable leftNav = {drawer: {open : false}}

  @computed get titleAndVersion() {
    return `${this.title} V${this.version}`
  }

  @computed get tables_tablenames() {
    return this.tables.reduce((dict, table) => {
      dict[table.table_schema] = dict[table.table_schema] || []
      dict[table.table_schema].push(table)
      return dict
    }, {})
  }

  @computed get views_tablenames() {
    return this.views.reduce((dict, view) => {
      dict[view.table_schema] = dict[view.table_schema] || []
      dict[view.table_schema].push(view)
      return dict
    }, {})
  }

  @computed get views_schemanames() {
    return _(this.views).map(view => view.schemaname).uniq().value()
  }

  constructor(obj){
    this.title = obj.title
    this.userAgent = obj.userAgent
    this.version = obj.version
    this.params = obj.params
  }

  serialize() {
    return {
      title: this.title,
      userAgent: this.userAgent,
      nodeEnv: this.nodeEnv,
      version: this.version,
      params: this.params,
    }
  }

  changeTitle() {
    this.title = 'React PG Admin'
  }

  requestTables() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM INFORMATION_SCHEMA.TABLES ORDER BY TABLE_NAME'})
      .then(action(res => {
        var tables = _.cloneDeep(res.body)
        this.tables = tables.map(table => {
          table.checked = false
          return observable(table)
        })
      }))
  }

  requestViews() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM INFORMATION_SCHEMA.VIEWS ORDER BY TABLE_NAME'})
      .then(res => {
        var views = _.cloneDeep(res.body)
        this.views = views.map(view => {
          view.checked = false
          return view
        })
      })
  }

  requestColumns() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS'})
      .then(res => {
        console.log(res.body)
        this.columns = _.cloneDeep(res.body)
      })
  }
}
