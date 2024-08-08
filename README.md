# izo-blog

![image](https://github.com/user-attachments/assets/ce0254c7-2e83-4723-bbcb-b430e5f44d70)

## 🚀 Installation

```
npm install izo-blog
```

## 🍋 Usage

```js
const izoBlogOptions = {
  templates: {
    // template_name: template_path
  }
}
export default defineConfig((): UserConfig => {
  return {
    plugins: [
      izoBlog(myIzoBlogOptions),
      qwikCity(QwikCityOptions),
      qwikVite(),
      tsconfigPaths(),
    ],
  // ...
  }
}
```

**⚡ Options**

```ts
type IzoBlogOptions = {
  templates: { [key: string]: string },
  hostname?: string,
  buildTemplate?: (route: string, title: string, template: string) => string,
  onCreate?: (route: string, title: string, template: string) => void,
  onSave?: (route: string) => void,
  port?: number
}
```

## ✍🏻 Editor

The plugin starts an editor environment server on port 8080 (by default).

- <img width=16 height=16 src="https://github.com/user-attachments/assets/ca1d6f4c-700c-4bee-8304-464b267470da"/> **(or CTRL + Space)** - Toggle routes menu.
- <img width=16 height=16 src="https://github.com/user-attachments/assets/d62b0ffb-4cbf-4e85-90ab-19ec23cd335a"/> **(or CTRL + S)** - Save the current document.
- <img width=16 height=16 src="https://github.com/user-attachments/assets/9bb22506-f302-4e3a-9f40-52e9b0c43f99"/> **(or CTRL + D)** - Toggle document creator menu.
- **Esc** - Close routes or creator menu.


## 📜 License

- [izo-blog](https://github.com/FelipeIzolan/izo-blog) - MIT
- [polka](https://github.com/lukeed/polka) - MIT
- [sirv](https://github.com/lukeed/sirv) - MIT
- [url-slug](https://github.com/stldo/url-slug) - MIT
- [toastify](https://github.com/apvarun/toastify-js) - MIT
- [prism](https://github.com/PrismJS/prism) - MIT
- [code-input](https://github.com/WebCoder49/code-input) - MIT
- [sitemap](https://github.com/ekalinin/sitemap.js) - MIT
