import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import LeftNav from './LeftNav.js'
import TableView from './TableView'

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
    </div>
  }
}

export default MainView
