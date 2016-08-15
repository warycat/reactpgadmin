import { observable } from 'mobx'

export default class MainStore {
  @observable title
  userAgent

  toJS(){
    return {
      title: this.title,
      userAgent: this.userAgent
    }
  }

  static fromJS(obj){
    const mainStore = new MainStore()
    mainStore.title = obj.title
    mainStore.userAgent = obj.userAgent
    return mainStore
  }
}
