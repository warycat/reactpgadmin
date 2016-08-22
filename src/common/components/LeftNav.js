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

function buildNestedItem(tables, schemaname) {
  const store = this
  const items = tables.map(table => {
    const hash = schemaname + '.' + table.table_name
    const checkbox = store.indexedTables[hash] || {checked: false}
    return <ListItem
      key={table.table_name}
      primaryText={table.table_name}
      leftCheckbox={
        <Checkbox
          checked={checkbox.checked}
          onClick={()=> checkbox.checked = !checkbox.checked}
        />
      }
    />
  })
  return <ListItem
    key={schemaname}
    primaryText={`${schemaname} (${items.length})`}
    primaryTogglesNestedList={true}
    nestedItems={items}
  />
}

@inject('store') @observer
class ListItemTables extends Component {
  render() {
    const { store } = this.props
    const tableItems = _.map(store.tables_tablenames, buildNestedItem.bind(store))
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
class ListItemViews extends Component {
  render() {
    const { store } = this.props
    const viewItems = _.map(store.views_tablenames, buildNestedItem.bind(store))
    return <ListItem
      key="views"
      primaryText="VIEWS"
      primaryTogglesNestedList={true}
      leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
      nestedItems={viewItems}
      onClick={() => store.requestViews()}
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
      <ListItemViews />
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