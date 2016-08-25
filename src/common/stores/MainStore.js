import { observable, computed, action, asFlat, asMap, autorun } from 'mobx'
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

  @computed get tablesInSchema() {
    return this.tables.reduce((dict, table) => {
      dict[table.table_schema] = dict[table.table_schema] || []
      dict[table.table_schema].push(table)
      return dict
    }, {})
  }

  @computed get tablesChecked() {
    return this.tables.filter(table => table.checked).map(table => {
      return {table_schema: table.table_schema, table_name: table.table_name}
    })
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
    this.refreshColumns = autorun(()=>{
      this.requestColumns(this.tablesChecked)
    })
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

  requestColumns(tablesChecked) {
    if(!tablesChecked.length) return
    const values = tablesChecked.map(table => `('${table.table_schema}', '${table.table_name}')`).join(', ')
    const text = `
      SELECT * FROM ( VALUES ${values} ) AS t1(table_schema, table_name)
      INNER JOIN INFORMATION_SCHEMA.COLUMNS AS t2
      ON t1.table_schema = t2.table_schema AND t1.table_name = t2.table_name`
    ajax.get('/db/query')
      .query({text: text})
      .then(res => {
        console.log(res.body)
        this.columns = _.cloneDeep(res.body)
      })
  }
}
