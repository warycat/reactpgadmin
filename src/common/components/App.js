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
import {white, red500, greenA200} from 'material-ui/styles/colors';
import { observable, computed } from 'mobx'

function OpenInNewTab(url) {
  console.log(url)
  var win = window.open(url, '_blank');
  win.focus();
}

@observer
class App extends Component {
  @observable drawer = {open: false}
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
            <Drawer
              open={this.drawer.open}
              docked={false}
              onRequestChange={(open) => this.drawer.open = open}
            >
              <MenuItem>Tables</MenuItem>
              <MenuItem>About</MenuItem>
            </Drawer>
          </div>
        </MuiThemeProvider>
        <DevTools />
      </div>
    )
  }
}

export default App
