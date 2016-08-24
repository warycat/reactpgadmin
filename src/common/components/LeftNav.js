import _ from 'lodash'
import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Checkbox from 'material-ui/Checkbox'
import backIcon from 'material-ui/svg-icons/navigation/arrow-back.js'
import {List, ListItem} from 'material-ui/List'

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

@observer
class ListItemTableName extends Component {
  render (){
    const {table, ...other} = this.props
    return <ListItem {...other}
      primaryText={table.table_name}
      leftCheckbox={
        <Checkbox
          checked={table.checked}
          onClick={()=> table.checked = !table.checked}
        />
      }
    />
  }
}

@inject('store') @observer
class ListItemSchemaName extends Component {
  render() {
    const {store, schemaname, ...other} = this.props
    const items = store.tables_tablenames[schemaname].map(table => {
      return <ListItemTableName key={table.table_name} table={table} />
    })
    return <ListItem {...other}
      primaryText={`${schemaname} (${items.length})`}
      primaryTogglesNestedList={true}
      nestedItems={items}
    />
  }
}

@inject('store') @observer
class ListItemTables extends Component {
  render() {
    const { store } = this.props
    const tableItems = Object.keys(store.tables_tablenames).map(schemaname => {
      return <ListItemSchemaName key={schemaname} schemaname={schemaname} />
    })
    return <ListItem
      key="tables"
      primaryText="TABLES"
      primaryTogglesNestedList={true}
      leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
      nestedItems={tableItems}
      onClick={() => store.requestTables()}
    />
  }
}

@inject('store') @observer
class Menu extends Component {
  render() {
    const { store } = this.props
    return <List>
      <ListItem
        key="home"
        primaryText="HOME"
        leftIcon={<FontIcon className='material-icons' >home</FontIcon>}
        onClick={() => store.leftNav.drawer.open = false}
      />
      <ListItemTables />
    </List>
  }
}

@observer
class LeftNav extends Component {
  render() {
    const { onItemClick, open } = this.props
    return <Drawer open={open}>
      <Menu onItemClick={onItemClick} />
    </Drawer>
  }
}

export default LeftNav