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
    const theme = getMuiTheme(darkBaseTheme, { userAgent: store.userAgent })
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <MainView />
          </Provider>
        </MuiThemeProvider>
        <DevTools position={{bottom:0, right: 0}}/>
      </div>
    )
  }
}

export default App
