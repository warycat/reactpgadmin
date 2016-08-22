import { observable, computed, action, asReference} from 'mobx'
import _ from 'lodash'
import ajax from 'superagent-bluebird-promise'

export default class MainStore {
  @observable title
  @observable tables
  @observable views
  @observable columns
  @observable err
  @observable leftNav
  userAgent
  babelEnv
  version
  params

  @computed get titleAndVersion() {
    return `${this.title} V${this.version}`
  }

  @computed get tables_tablenames() {
    return this.tables.reduce((dict, table) => {
      dict[table.table_schema] = dict[table.table_schema] || []
      dict[table.table_schema].push(table.table_name)
      return dict
    }, {})
  }

  @computed get views_tablenames() {
    return this.views.reduce((dict, view) => {
      dict[view.table_schema] = dict[view.table_schema] || []
      dict[view.table_schema].push(view.table_name)
      return dict
    }, {})
  }

  @computed get views_schemanames() {
    return _(this.views).map(view => view.schemaname).uniq().value()
  }

  constructor(obj){
    this.title = obj.title
    this.userAgent = obj.userAgent
    this.nodeEnv = obj.nodeEnv
    this.version = obj.version
    this.params = obj.params
    this.tables = []
    this.views = []
    this.columns = []
    this.leftNav = {
      drawer: {
        open: false
      }
    }
    this.err = null
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
      .then(res => {
        this.tables = _.cloneDeep(res.body)
      })
      .catch(err => {
        this.err = err
      })
  }

  requestViews() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM INFORMATION_SCHEMA.VIEWS ORDER BY TABLE_NAME'})
      .then(res => {
        this.views = _.cloneDeep(res.body)
      })
      .catch(err => {
        this.err = err
      })
  }

  requestColumns() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS'})
      .then(res => {
        console.log(res.body)
        this.columns = _.cloneDeep(res.body)
      })
      .catch(err => {
        this.err = err
      })
  }
}
