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

function buildNestedItem(tablenames, schemaname) {
  const items = tablenames.map(tablename => {
    return <ListItem
      key={tablename}
      primaryText={tablename}
      leftCheckbox={<Checkbox
        onClick={()=>{
          this.requestColumns()
        }}
      />}
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
class Menu extends Component {

  render() {
    const { store, onItemClick } = this.props
    const tableItems = _.map(store.tables_tablenames, buildNestedItem.bind(store))
    const viewItems = _.map(store.views_tablenames, buildNestedItem.bind(store))
    return <List>
      <ListItem
        key="home"
        primaryText="HOME"
        leftIcon={<FontIcon className='material-icons' >home</FontIcon>}
        onClick={() => store.leftNav.drawer.open = false}
      />
      <ListItem
        key="tables"
        primaryText="TABLES"
        primaryTogglesNestedList={true}
        leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
        nestedItems={tableItems}
        onClick={() => {
          store.requestTables()
        }}
      />
      <ListItem
        key="views"
        primaryText="VIEWS"
        primaryTogglesNestedList={true}
        leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
        nestedItems={viewItems}
        onClick={() => store.requestViews()}
      />
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