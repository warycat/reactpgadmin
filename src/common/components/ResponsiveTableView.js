import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { autorun, untracked } from 'mobx'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import _ from 'lodash'

@inject('store') @observer
class ResponsiveTableView extends Component {

  componentDidMount() {
    const {store} = this.props
    this.columnsDisposer = autorun(()=>{
      store.requestColumns(store.tablesChecked)
    })
    this.rowsDisposer = autorun(()=>{
      store.requestRows(store.columnsChecked, untracked(() => store.tablesChecked))
    })
  }

  componentWillUnmount() {
    this.columnsDisposer()
    this.rowsDisposer()
  }

  render() {
    const {store} = this.props
    return <div style={store.tableViewStyle}>
      <TableView />
    </div>
  }
}

@inject('store') @observer
class TableView extends Component {
  render(){
    const {store} = this.props
    const header = <TableRow>{
      store.columnsChecked.map((column, index) => {
        return <TableHeaderColumn
          tooltip={column.data_type}
          key={index}>
          {column.column_name}
        </TableHeaderColumn>
      })
    }</TableRow>
    const rows = store.rows.map((row, rowIndex)=> {
      const tableRow = store.columnsChecked.map((column, columnIndex)=> {
        return <Cell
          key={columnIndex}
          data_type={column.data_type}
          value={row[column.column_name]}
        />
      })
      return <TableRow key={rowIndex}>
        {tableRow}
      </TableRow>
    })
    return <Table>
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}>
        {header}
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {rows}
      </TableBody>
    </Table>
  }
}

class Cell extends Component {
  render() {
    const {store, key, data_type, value, ...other} = this.props
    let cell_value = value
    if(data_type==='boolean') cell_value = String(value)
    return <TableRowColumn key={key} {...other} >
      {cell_value}
    </TableRowColumn>
  }
}

export default ResponsiveTableView
