export function createResetplugin() {
  return ({ store }: any) => {
    const initialState = JSON.parse(JSON.stringify(store.$state))
    // console.log(initialState)
    store.$state.initialState = initialState
    // console.log(store.$state)
    store.$resetFields = () => {
      // console.log(initialState)
      // console.log(store.$state.initialState)
      store.$patch(initialState)
    }
  }
}