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

@inject('store') @observer
class Menu extends Component {
  render() {
    const { onItemClick, store } = this.props
    const list = _.map(store.tablesLists, (tables, schemaname) => {
      const sublist = tables.map(tablename => {
        return <ListItem
          key={tablename}
          primaryText={tablename}
          leftCheckbox={<Checkbox
              onClick={_.partial(onItemClick, 'table', {
                tablename: tablename,
                schemaname: schemaname
              })}
              />}
        />
      })
      return <ListItem
        key={schemaname}
        primaryText={schemaname}
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
        onClick={_.partial(onItemClick, 'pg_tables')}
      />
    </List>
  }
}

@observer
class LeftNav extends Component {
  render() {
    const { menu, onItemClick, open } = this.props
    return <Drawer open={open}>
      <Menu onItemClick={onItemClick} />
    </Drawer>
  }
}

export default LeftNav