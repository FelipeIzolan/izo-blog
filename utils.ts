import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export function join(...pieces: string[]) {
  return path.join("./src/routes", pieces.reduce((acc, curr) => path.join(acc, curr), ''));
}

export function chomp_prefix(path: string) {
  return path.split('/routes')[1];
}

export function index_page(route: string) {
  let tsx = join(route, 'index.tsx');
  let mdx = join(route, 'index.mdx');

  return fs.existsSync(tsx) ? tsx : mdx;
}

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
