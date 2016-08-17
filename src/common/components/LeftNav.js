import _ from 'lodash'
import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Checkbox from 'material-ui/Checkbox'
import backIcon from 'material-ui/svg-icons/navigation/arrow-back.js'
import {List, ListItem} from 'material-ui/List'

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

export default LeftNav