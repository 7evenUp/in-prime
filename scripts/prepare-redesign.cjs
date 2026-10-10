// Reproduce the last pre-Black-Friday redesign with its original roadmap.
const { execFileSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")
const sass = require("sass")
const revision = "88207ad"
const git = (...args) => execFileSync("git", args, { maxBuffer: 64 * 1024 * 1024 })
const files = git("ls-tree", "-r", "--name-only", revision).toString().trim().split("\n")
const rewrite = source => source
  .replace(/(["'])@\/(components|sections|data|hooks|types|styles)\//g, "$1@/demo/redesign/$2/")
  .replace(/(["'])@\/public\//g, "$1@/public/redesign-assets/")
  .replace(/(["'])\/styles\//g, "$1styles/")
  .replace(/(["'])\/public\//g, "$1@/public/redesign-assets/")
  .replace(/(["'(])\/images\//g, "$1/redesign-assets/images/")
  .replace(/(["'(])\/fonts\//g, "$1/redesign-assets/fonts/")
  .replace(/(["'])\.\.\/public\//g, "$1@/public/redesign-assets/")
  .replace(/import\s*\{\s*Pagination\s*\}\s*from\s*"swiper"/g, 'import { Pagination } from "swiper/modules"')
  .replace('import Countdown from "react-countdown"', 'import Countdown from "@/demo/legacy/Countdown"')
  .replace(/@font-face\s*\{[^}]*fonts\.googleapis\.com[^}]*\}/g, "")
function save(target, content) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content)
}
for (const file of files) {
  if (/^(components|sections|data|hooks|types|styles)\//.test(file)) {
    // An obsolete JS menu duplicates the newer TS component at this revision.
    if (file === "components/menu.jsx") continue
    save(`demo/redesign/${file}`, rewrite(git("show", `${revision}:${file}`).toString()))
  }
  if (file === "pages/index.tsx") save("demo/redesign/Home.tsx", rewrite(git("show", `${revision}:${file}`).toString()))
  if (file.startsWith("public/")) save(file.replace("public/", "public/redesign-assets/"), git("show", `${revision}:${file}`))
}
const styles = files.filter(file => file.startsWith("styles/components/") || file === "styles/global.scss")
const entry = `.redesign-site { ${styles.map(file => `@import "${file}";`).join("\n")} }`
save("public/demo/redesign.css", sass.compileString(entry, { loadPaths: ["demo/redesign"], style: "compressed", logger: sass.Logger.silent }).css)
console.log(`Restored redesign ${revision} (03.11.2023), including roadmap and artwork.`)
