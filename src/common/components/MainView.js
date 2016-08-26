import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import LeftNav from './LeftNav'
import TableView from './TableView'
import RightPanel from './RightPanel'

@inject('store') @observer
class MainView extends Component {
  render() {
    const { store } = this.props
    return <div>
      <AppBar
        title={store.titleAndVersion}
        onLeftIconButtonTouchTap={() => store.leftNav.drawer.open = true}
      />
      <LeftNav />
      <TableView />
      <RightPanel />
    </div>
  }
}

export default MainView
