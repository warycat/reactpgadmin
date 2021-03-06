import { observable, computed, action, asFlat, asMap, autorun } from 'mobx'
import _ from 'lodash'
import ajax from 'superagent-bluebird-promise'
import transitions from 'material-ui/styles/transitions'

export default class MainStore {
  @observable title = 'React PG Admin'
  @observable tables = asFlat([])
  @observable views = asFlat([])
  @observable columns = asFlat([])
  @observable rows = asFlat([])
  @observable leftNav = {drawer: {open: false}}
  @observable rightPanel = {drawer: {open: false}}

  @computed get tableViewStyle() {
    return {
      paddingLeft: this.leftNav.drawer.open ? 256 : 0,
      paddingRight: this.rightPanel.drawer.open ? 256 : 0,
      transition: transitions.easeOut(null, 'padding', null)

    }
  }

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

  @computed get columnsChecked() {
    return this.columns.filter(column => column.checked).map(column => {
      return {
        column_name: column.column_name,
        table_name: column.table_name,
        table_schema: column.table_schema,
        data_type: column.data_type,
      }
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

  requestTables() {
    ajax.get('/db/query')
      .query({text: "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE' ORDER BY table_name"})
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
      .query({text: 'SELECT * FROM INFORMATION_SCHEMA.VIEWS ORDER BY table_name'})
      .then(res => {
        var views = _.cloneDeep(res.body)
        this.views = views.map(view => {
          view.checked = false
          return view
        })
      })
  }

  requestColumns(tablesChecked) {
    if (!tablesChecked.length) {
      this.columns = []
      return
    }
    const values = tablesChecked.map(table => `('${table.table_schema}', '${table.table_name}')`).join(', ')
    const text = `
      SELECT * FROM ( VALUES ${values} ) AS t1(table_schema, table_name)
      INNER JOIN INFORMATION_SCHEMA.COLUMNS AS t2
      ON t1.table_schema = t2.table_schema AND t1.table_name = t2.table_name`
    ajax.get('/db/query')
      .query({text: text})
      .then(res => {
        var columns = _.cloneDeep(res.body)
        this.columns = columns.map(column => {
          column.checked = !column.data_type.match(/^(date|time|timestamp|interval|json)/)
          return observable(column)
        })
      })
  }

  requestRows(columnsChecked, tablesChecked) {
    if (!columnsChecked.length) {
      this.rows = []
      return
    }
    const columns = columnsChecked.map(column => `${column.table_schema}.${column.table_name}.${column.column_name}`).join(', ')
    const tables = tablesChecked.map(table => `${table.table_schema}.${table.table_name}`).join(', ')
    const text = `SELECT ${columns} FROM ${tables} LIMIT 100`
    ajax.get('/db/query')
      .query({text: text})
      .then(res => {
        var rows = _.cloneDeep(res.body)
        console.log(res.body)
        this.rows = rows
      })
  }
}
