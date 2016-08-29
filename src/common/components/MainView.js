import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import LeftNav from './LeftNav'
import ResponsiveTableView from './ResponsiveTableView'
import RightPanel from './RightPanel'
import IconButton from 'material-ui/IconButton'
import {NavigationMenu, ActionSettings} from 'material-ui/svg-icons'

@inject('store') @observer
class MainView extends Component {
  render() {
    const { store } = this.props
    return <div>
      <AppBar
        title={store.titleAndVersion}
        titleStyle={{textAlign: "center"}}
        iconElementLeft={
          <IconButton  onClick={() => store.leftNav.drawer.open = true}>
            <NavigationMenu />
          </IconButton>
        }
        iconElementRight={
          <IconButton onClick={() => { store.rightPanel.drawer.open = true }}>
            <ActionSettings />
          </IconButton>
        }
      />
      <LeftNav />
      <ResponsiveTableView />
      <RightPanel />
    </div>
  }
}

export default MainView
