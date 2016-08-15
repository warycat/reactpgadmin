import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon';

@observer
class App extends Component {
  render() {
    const { store } = this.props
    const theme = getMuiTheme(darkBaseTheme, { userAgent: store.userAgent })
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <AppBar
              title={store.titleAndVersion}
              iconClassNameRight="muidocs-icon-navigation-doc"
            />
            <Drawer open={false}>
              <MenuItem>Tables</MenuItem>
              <MenuItem>About</MenuItem>
            </Drawer>

            <button onClick={() => store.changeTitle()}>Change Me </button>
            <button onClick={() => store.changeTitle()}>Change Me </button>
          </div>
        </MuiThemeProvider>
        <DevTools />
      </div>
    )
  }
}

export default App
