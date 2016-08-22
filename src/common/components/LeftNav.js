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
      leftCheckbox={<Checkbox />}
    />
  })
  return <ListItem
    key={schemaname}
    primaryText={schemaname}
    primaryTogglesNestedList={true}
    nestedItems={items}
  />
}

@inject('store') @observer
class Menu extends Component {

  render() {
    const { store, onItemClick } = this.props
    const tableItems = _.map(store.pg_tables_tablenames, buildNestedItem)
    const viewItems = _.map(store.pg_views_tablenames, buildNestedItem)
    return <List>
      <ListItem
        key="home"
        primaryText="HOME"
        leftIcon={<FontIcon className='material-icons' >home</FontIcon>}
      />
      <ListItem
        key="tables"
        primaryText="TABLES"
        primaryTogglesNestedList={true}
        leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
        nestedItems={tableItems}
        onClick={()=>store.requestTables()}
      />
      <ListItem
        key="views"
        primaryText="VIEWS"
        primaryTogglesNestedList={true}
        leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
        nestedItems={viewItems}
        onClick={()=>store.requestViews()}
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