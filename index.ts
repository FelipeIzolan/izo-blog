import fs from "fs";
import path from "path";

import sirv from "sirv";
import polka from "polka";

import { join, index_page, chomp_prefix, __dirname } from "./utils.js";
import { convert as url_slug } from "url-slug";

import type { IzoBlogOptions } from "./types.js";

function get_pages() {
  const result: string[] = ['/'];

  function directory(parent: string) {
    const inodes = fs.readdirSync(parent);

    for (const inode of inodes) {
      const ipath = path.resolve(parent, inode);
      const istat = fs.statSync(ipath);

      if (istat.isDirectory()) {
        result.push(chomp_prefix(ipath));
        directory(ipath);
      }
    }
  }

  directory(path.resolve("./src/routes"));

  return result;
}

export default function(opts?: IzoBlogOptions) {
  opts = opts ?? { templates: {} };
  opts.port = opts.port ?? 8080;

  return {
    name: "izo-blog",
    configureServer() {
      const app = polka();
      const _static = sirv(path.resolve(__dirname, "client"), { dev: true });

      const pages = get_pages();
      const templates: { [key: string]: string } = {};

      for (const [key, value] of Object.entries(opts.templates))
        templates[key] = fs.readFileSync(value, { encoding: "utf8" });

      app.use(_static);

      app.get('/pages', (_, res) => {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(pages));
      });

      app.get('/templates', (_, res) => {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(Object.keys(templates)));
      });

      app.post(
        '/content',
        (req, res) => {
          let index = index_page(<string>req.headers['content-route']);
          let ext = path.extname(index);

          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({
            ext: ext.slice(1),
            content: fs.readFileSync(index, { encoding: "utf8" })
          }));
        }
      );

      app.put(
        '/create',
        (req, _, next) => {
          req.body = "";
          req.on('data', chunk => req.body += chunk);
          req.on('end', () => {
            req.body = JSON.parse(req.body);
            next();
          });
        },
        (req, res) => {
          const route = <string>req.headers['content-route'];
          let template = templates[req.body.template];

          if (opts.buildTemplate)
            template = opts.buildTemplate(route, req.body.title, template);

          const folder = join(route, url_slug(req.body.title));
          const file = path.join(folder, 'index' + path.extname(opts.templates[req.body.template]));

          if (fs.existsSync(folder)) {
            res.statusCode = 400;
            return res.end();
          }

          fs.mkdirSync(folder);
          fs.writeFileSync(file, template);

          if (opts.onCreate)
            opts.onCreate(route, req.body.title, template);

          pages.push(chomp_prefix(folder));
          res.end(chomp_prefix(folder));
        }
      );

      app.put(
        '/save',
        (req, _, next) => {
          req.body = "";
          req.on('data', chunk => req.body += chunk);
          req.on('end', () => next());
        },
        (req, res) => {
          const route = <string>req.headers['content-route'];
          let index = index_page(route);

          fs.writeFileSync(index, req.body);

          if (opts.onSave)
            opts.onSave(route);

          res.end();
        }
      );

      app.listen(opts.port);
    }
  }
}
