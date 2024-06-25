import IndexStore from "../pages/index/stores/IndexStore";

class RootStore {
  constructor() {
    this.indexStore = new IndexStore(this);
  }
}
export default new RootStore();