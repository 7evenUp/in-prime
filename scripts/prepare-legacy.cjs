// Restore the last main snapshot before September 2023, without switching branches.
const { execFileSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")
const sass = require("sass")
const revision = "a0acb3b"
const git = (...args) => execFileSync("git", args, { maxBuffer: 64 * 1024 * 1024 })
const files = git("ls-tree", "-r", "--name-only", revision).toString().trim().split("\n")
const rewrite = source => source.replace(/(["'])\/components\//g, "$1@/demo/legacy/components/")
  .replace(/(["'])\.\.\/public\//g, "$1@/public/archive-assets/")
  .replace(/(["'])\/styles\//g, "$1styles/")
  .replace(/(["'])\/public\//g, "$1@/public/archive-assets/")
  .replace(/(["'])\/images\//g, "$1/archive-assets/images/")
  .replace(/(["'])\/fonts\//g, "$1/archive-assets/fonts/")
  .replace('import { Pagination } from "swiper"', 'import { Pagination } from "swiper/modules"')
  .replace('import Countdown from "react-countdown"', 'import Countdown from "@/demo/legacy/Countdown"')
  .replace(/<Link\s/g, "<Link legacyBehavior ")
  .replace(/@font-face\s*\{[^}]*fonts\.googleapis\.com[^}]*\}/g, "")
  .replace(/<iframe[\s\S]*?<\/iframe>/g, `<button className="demo-archive-video" onClick={() => document.getElementById("examples")?.scrollIntoView({ behavior: "smooth" })}><strong>Архивная презентация Prime</strong><span>Посмотреть реальные примеры заработка →</span></button>`)
function save(target, content) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content)
}
for (const file of files) {
  if (file.startsWith("components/")) save(`demo/legacy/${file}`, rewrite(git("show", `${revision}:${file}`).toString()))
  if (file === "pages/index.jsx") save("demo/legacy/Home.jsx", rewrite(git("show", `${revision}:${file}`).toString()))
  if (file.startsWith("public/")) save(file.replace("public/", "public/archive-assets/"), git("show", `${revision}:${file}`))
  if (file.startsWith("styles/")) save(`demo/legacy/${file}`, rewrite(git("show", `${revision}:${file}`).toString()))
}
const legacyStyles = files.filter(file => file.startsWith("styles/components/") || file === "styles/global.scss")
const entry = `.legacy-site { ${legacyStyles.map(file => `@import "${file}";`).join("\n")} }`
save("public/demo/legacy.css", sass.compileString(entry, { loadPaths: ["demo/legacy"], style: "compressed", logger: sass.Logger.silent }).css)
console.log(`Restored legacy snapshot ${revision}; compiled isolated styles.`)
