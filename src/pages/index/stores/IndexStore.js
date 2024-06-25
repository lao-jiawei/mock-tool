import { makeAutoObservable } from "mobx";

export default class IndexStore {
  treeData = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    })
  }
}