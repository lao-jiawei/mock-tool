import { createContext, useContext } from "react";
import rootStore from '../stores';

const storeContext = createContext(rootStore);

export function useStore() {
  return useContext(storeContext);
}
