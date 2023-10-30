import { App } from "vue";
import { utcTimeFormat } from "@/utils/date-format";

export default function registerProperties(app:App) {
  app.config.globalProperties.$filters = {
    formatTime(value:string) {
      return utcTimeFormat(value)
    }
  }
}
