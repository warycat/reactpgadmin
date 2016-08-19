import _ from 'lodash'
import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import LeftNav from './LeftNav.js'

@inject('store') @observer
class MainView extends Component {
  @observable drawer = {open: false}
  @observable table = {display: false, name: '', schema: ''}
  render() {
    const { store } = this.props
    return <div>
      <AppBar
        title={store.titleAndVersion}
        onLeftIconButtonTouchTap={() => this.drawer.open = true}
      />
      <LeftNav
        open={this.drawer.open}
        onItemClick={this.handleMenuItemClick}
      />
    </div>
  }
  handleMenuItemClick = (item, payload) => {
    switch(item){
      case 'home':
        this.drawer.open = false
        break
      case 'pg_tables':
        this.props.store.requestTables()
        break
      case 'table':
        console.log(payload)
        break
      default:
    }
  }
}

export default MainView
