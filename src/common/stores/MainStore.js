import { observable } from 'mobx'

export default class MainStore {
  @observable title

  toJS(){
    return {
      title: this.title
    }
  }

  static fromJS(obj){
    const mainStore = new MainStore()
    mainStore.title = obj.title
    return mainStore
  }
}
