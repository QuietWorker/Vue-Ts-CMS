import { App } from "vue";
import registerProperties from "./register.properties";

export function globalProperties(app: App) {
  app.use(registerProperties)
}
