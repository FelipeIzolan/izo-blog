export type IzoBlogOptions = {
  templates: { [key: string]: string },
  buildTemplate?: (route: string, title: string, template: string) => string,
  onCreate?: (route: string, title: string, template: string) => void,
  onSave?: (route: string) => void,
  port?: number
}
