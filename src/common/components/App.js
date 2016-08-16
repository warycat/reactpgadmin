import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset'
import {white, red500, greenA200} from 'material-ui/styles/colors'
import "babel-polyfill"
import { observable, computed } from 'mobx'
import {List, ListItem} from 'material-ui/List'
import _ from 'lodash'
import Checkbox from 'material-ui/Checkbox'
import backIcon from 'material-ui/svg-icons/navigation/arrow-back.js'

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

@observer
class Menu extends Component {
  render() {
    const { menu, onItemClick } = this.props
    console.log(menu)
    const list = _.map(menu, (value, schema) => {
      const sublist = value.map(name => { 
        return <ListItem
          key={name}
          primaryText={name}
          leftCheckbox={<Checkbox onClick={_.partial(onItemClick, 'table', {name: name, schema: schema})} />}
        />
      })
      return <ListItem
        key={schema}
        primaryText={schema}
        primaryTogglesNestedList={true}
        nestedItems={sublist}
      />
    })
    return <List>
      <ListItem
        primaryText="Home"
        leftIcon={<FontIcon className='material-icons' >home</FontIcon>}
        onClick={_.partial(onItemClick, 'home')}
      />
      <ListItem
        primaryText="Tables"
        primaryTogglesNestedList={true}
        leftIcon={<FontIcon className='material-icons' >view_column</FontIcon>}
        nestedItems={list}
      />
    </List>
  }
}

@observer
class LeftNav extends Component {
  render() {
    const { menu, onItemClick, open } = this.props
    return <Drawer open={open}>
      <Menu menu={menu} onItemClick={onItemClick} />
    </Drawer>
  }

}

@observer
class App extends Component {
  @observable drawer = {open: false}
  @observable table = {display: false, name: '', schema: ''}
  render() {
    const { store } = this.props
    const iconStyles = { margin: 12 }
    const theme = getMuiTheme(darkBaseTheme, { userAgent: store.userAgent })
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <AppBar
              title={store.titleAndVersion}
              onLeftIconButtonTouchTap={() => this.drawer.open = true}
            />
            <LeftNav
              menu={store.menu}
              open={this.drawer.open}
              onItemClick={this.handleMenuItemClick}
            />
          </div>
        </MuiThemeProvider>
        <DevTools />
      </div>
    )
  }
  handleMenuItemClick = (item, payload) => {
    switch(item){
      case 'home':
        this.drawer.open = false
        break
      case 'table':
        console.log(payload)
        break
      default:
    }
  }
}

export default App
