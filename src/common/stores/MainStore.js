import { observable, computed, action, asReference} from 'mobx'
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

  @computed get pg_tables_tablenames() {
    return this.pg_tables.reduce((dict, table) => {
      dict[table.schemaname] = dict[table.schemaname] || []
      dict[table.schemaname].push(table.tablename)
      return dict
    }, {})
  }

  @computed get pg_views_tablenames() {
    return this.pg_views.reduce((dict, view) => {
      dict[view.schemaname] = dict[view.schemaname] || []
      dict[view.schemaname].push(view.viewname)
      return dict
    }, {})
  }

  @computed get pg_views_schemanames() {
    return _(this.pg_views).map(view => view.schemaname).uniq().value()
  }

  constructor(obj){
    this.title = obj.title
    this.userAgent = obj.userAgent
    this.nodeEnv = obj.nodeEnv
    this.version = obj.version
    this.params = obj.params
    this.pg_tables = []
    this.pg_views = []
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
      .query({text: 'SELECT * FROM PG_CATALOG.PG_TABLES'})
      .then(res => {
        this.pg_tables = _.cloneDeep(res.body)
      })
      .catch(err => {
        this.err = err
      })
  }

  requestViews() {
    ajax.get('/db/query')
      .query({text: 'SELECT * FROM PG_CATALOG.PG_VIEWS'})
      .then(res => {
        this.pg_views = res.body
      })
      .catch(err => {
        this.err = err
      })
  }
}