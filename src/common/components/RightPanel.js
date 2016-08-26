import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

class RightPanel extends Component {
  render() {
    const { store } = this.props
    return <Drawer open={store.rightPanel.drawer.open}>
      <Menu />
    </Drawer>
  }
}

export default RightPanel