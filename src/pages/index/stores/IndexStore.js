import { makeAutoObservable } from "mobx";

export default class IndexStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    })
  }
}