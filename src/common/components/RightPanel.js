import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import {ActionHome, ActionViewList} from 'material-ui/svg-icons'
import {List, ListItem} from 'material-ui/List'

@inject('store') @observer
class ListItemColumns extends Component {
  render() {
    const { store, ...other } = this.props
    const items = store.columns.map((column, index) => <ListItem
      key={index}
      primaryText={column.column_name}
      secondaryText={column.table_name}
      leftCheckbox={
        <Checkbox
          checked={column.checked}
          onClick={()=> column.checked = !column.checked}
        />}
    />)
    return <ListItem {...other}
      key='columns'
      leftIcon={<ActionViewList />}
      primaryText='COLUMNS'
      primaryTogglesNestedList={true}
      nestedItems={items}
    />
  }
}

@inject('store') @observer
class ListPanel extends Component {
  render() {
    const { store } = this.props
    return <List>
      <ListItem
        key="home"
        leftIcon={<ActionHome />}
        primaryText="HOME"
        onClick={() => store.rightPanel.drawer.open = false}
      />
      <ListItemColumns />
    </List>
  }
}

@inject('store') @observer
class RightPanel extends Component {
  render() {
    const { store } = this.props
    return <Drawer open={store.rightPanel.drawer.open} openSecondary={true}>
      <ListPanel />
    </Drawer>
  }
}

export default RightPanel