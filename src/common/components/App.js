import "babel-polyfill"
import React, { Component } from 'react'
import { observer, Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MainView from './MainView'

@observer
class App extends Component {
  render() {
    const { store } = this.props
    const iconStyles = { margin: 12 }
    const theme = getMuiTheme(darkBaseTheme, { userAgent: store.userAgent })
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <MainView />
          </Provider>
        </MuiThemeProvider>
        <DevTools />
      </div>
    )
  }
}

export default App
