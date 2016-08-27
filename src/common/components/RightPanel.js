import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {ActionHome} from 'material-ui/svg-icons'
import {List, ListItem} from 'material-ui/List'

@inject('store') @observer
class ListPanel extends Component {
  render() {
    const { store } = this.props
    return <List>
      <ListItem
        key="Home"
        primaryText="HOME"
        leftIcon={<ActionHome />}
        onClick={() => store.rightPanel.drawer.open = false}
      />
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