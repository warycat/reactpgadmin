import React, { Component } from 'react'
import { observable, computed, action} from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

@observer
class App extends Component{
  render (){
    const { store } = this.props
    return (
      <div>
        <h2>{store.title}</h2>
        <button onClick={this.changeTitle}> Change Me </button>
        <DevTools/>
      </div>
    );
  }
  changeTitle = () => {
    this.props.store.title = 'React PG Admin'
  }
};

export default App