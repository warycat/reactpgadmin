import React, { Component } from 'react'
import { observable, computed, action} from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

injectTapEventPlugin();

@observer
class App extends Component{
  render (){
    const { store } = this.props
    const theme = getMuiTheme(darkBaseTheme, { userAgent: store.userAgent })
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <AppBar
              title={store.title}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Drawer open={false}>
              <MenuItem>Tables</MenuItem>
              <MenuItem>About</MenuItem>
            </Drawer>

            <button onClick={this.changeTitle}>Change Me </button>
          </div>
        </MuiThemeProvider>
        <DevTools/>
      </div>
    );
  }
  changeTitle = () => {
    this.props.store.title = 'React PG Admin'
  }
};

export default App