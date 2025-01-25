import type { PiniaPluginContext } from "pinia";
// import { StateTree, PiniaPluginContext } from 'pinia';
import { pick } from "lodash-es";

declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  export interface _StoreWithState<Id extends string, S extends StateTree, G, A>
    extends StoreProperties<Id> {
    //  选择自定义一个方法名，当然，你也可以覆盖$reset方法，这里只是不想破坏原有的东西，仅为示例
    $resetFields<K extends keyof S>(fields?: K[]): void;
  }
}

export default ({ options, store }: PiniaPluginContext): void => {
  // const initialState = JSON.parse(JSON.stringify(store.$state))
  // store.$reset = (fields) => {
  //   console.log(fields)
  //   // const { state } = options;
  //   // let originalState = state ? state() : {};
  //   store.$patch(($state) => {
  //     let originalState = $state
  //     if (fields) {
  //       console.log(originalState)
  //       console.log(pick($state, fields))
  //       originalState = pick(originalState, fields);
  //     }
  //     console.log(originalState)
  //     Object.assign($state, originalState);
  //     console.log($state)
  //   });
  // };

  // 保存初始状态的副本
  const initialState = JSON.parse(JSON.stringify(store.$state))
  // console.log(initialState)

  // 定义 reset 方法
  store.$resetFields = () => {
    // console.log(initialState)
    store.$patch(initialState)
  }
};