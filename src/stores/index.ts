import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createResetplugin } from './plugins/piniaResetPlugin2';

const pinia = createPinia()
pinia.use(createResetplugin())
pinia.use(piniaPluginPersistedstate)

export default pinia