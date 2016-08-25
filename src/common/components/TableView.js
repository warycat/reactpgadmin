import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { autorun } from 'mobx'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

@inject('store') @observer
class TableHeaderOfColumns extends Component {
  render() {
    const {store, ...other} = this.props
    console.log(store)
    return <TableHeader {...other}>
      <TableRow>
        <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
          Super Header
        </TableHeaderColumn>
      </TableRow>

      <TableRow>
        {columns}
      </TableRow>
    </TableHeader>
  }
}

@inject('store') @observer
class TableView extends Component {

  componentDidMount() {
    const {store} = this.props
    this.disposer = autorun(()=>{
      store.requestColumns(store.tablesChecked)
    })
  }

  componentWillUnmount() {
    this.disposer()
  }

  render() {
    const {store} = this.props
    const columns = store.columns.map(column => <TableRow><TableRowColumn>{column.column_name}</TableRowColumn></TableRow> )

    return <div style={store.tableViewStyle}> 
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>column_name</TableHeaderColumn>
          <TableHeaderColumn>column_value</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody preScanRows={false}>
       {columns}
      </TableBody>
    </Table>
    </div>
  }
}

export default TableView
