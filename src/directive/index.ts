import { App } from 'vue'

const modules = import.meta.globEager('./modules/**/*.ts')

export function setupDirectives(app: App) {
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    app.use(mod)
  })
}
