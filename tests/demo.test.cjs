const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const Module = require("node:module")
const ts = require("typescript")
const root = path.resolve(__dirname, "..")
const resolve = Module._resolveFilename
Module._resolveFilename = function (request, ...args) {
  return resolve.call(this, request.startsWith("@/") ? path.join(root, request.slice(2)) : request, ...args)
}
require.extensions[".ts"] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, file)
require.extensions[".png"] = (module, file) => { module.exports = { src: "/" + path.relative(path.join(root, "public"), file).replaceAll("\\", "/") } }
require.extensions[".jpg"] = require.extensions[".png"]
require.extensions[".jpeg"] = require.extensions[".png"]
require.extensions[".webp"] = require.extensions[".png"]
global.window = { location: { search: "?version=latest" } }
Object.defineProperty(window, "localStorage", { get() { throw new Error("Demo must not access browser storage") } })
const { default: api } = require("../demo/api.ts")
const { versions, hasGifts, isSiteVersion } = require("../demo/versions.ts")
const { prizes, getSubscriptions } = require("../demo/fixtures.ts")
const base = "https://retired.invalid/api/v1"
const get = endpoint => api.get(base + endpoint)
const post = (endpoint, body) => api.post(base + endpoint, body)

test("portfolio versions separate the two historical snapshots from latest", () => {
  assert.equal(versions.length, 6)
  assert.ok(isSiteVersion("latest"))
  assert.ok(isSiteVersion("redesign"))
  assert.equal(isSiteVersion("cases"), false)
  assert.deepEqual(versions.filter(item => hasGifts(item.id)).map(item => item.id), ["birthday", "new-year", "black-friday"])
  assert.equal(getSubscriptions("redesign")[2].price, 405)
  assert.equal(getSubscriptions("legacy")[2].price, 414)
})
test("cases, achievement graphics and gifts resolve to local files", async () => {
  const cases = (await get("/landing/income-cases/")).data
  const achievements = (await get("/landing/participant-achievements/")).data
  assert.ok(cases.length > 0 && cases.every(group => group.incomeCases.length > 0))
  for (const item of [...cases.flatMap(group => group.incomeCases), ...achievements, ...prizes]) {
    assert.ok(fs.existsSync(path.join(root, "public", item.image)), item.image)
  }
})
test("a purchase succeeds without an email, login or payment account", async () => {
  const subscription = (await get("/subscriptions/get-active/")).data[0]
  for (let i = 0; i < 3; i++) {
    const result = (await post("/landing/subscriptions/buy/", { subscriptionId: subscription.id })).data
    assert.equal(result.purchased, true)
    assert.equal(result.subscription.id, subscription.id)
  }
  assert.equal((await get("/users/profile/")).data, null)
})
test("repeated case opening is unlimited and randomly selects any gift", async () => {
  const originalRandom = Math.random
  try {
    for (let i = 0; i < prizes.length * 2; i++) {
      const index = i % prizes.length
      Math.random = () => (index + 0.5) / prizes.length
      const result = (await post("/crypton-events/containers/open/")).data
      assert.equal(result.prize.id, prizes[index].id)
    }
  } finally { Math.random = originalRandom }
  assert.deepEqual((await get("/crypton-events/last-opened-containers/")).data, [])
})
test("unknown and auth endpoints fail locally without a network fallback", async () => {
  for (const endpoint of ["/unknown/", "/users/login/"]) {
    await assert.rejects(post(endpoint, {}), error => error.response?.status === 404)
  }
  const created = api.create({ baseURL: base })
  assert.ok((await created.get("/landing/income-cases/")).data.length > 0)
})
