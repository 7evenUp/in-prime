import axios, { AxiosError, AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { achievements, containers, getSubscriptions, incomeCases, paymentMethods, prizes } from "./fixtures"
import { isSiteVersion, SiteVersion } from "./versions"
import type { Promocode } from "@/types/api-types"

function version(): SiteVersion {
  const selected = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("version")
  return isSiteVersion(selected) ? selected : "latest"
}
function fail(config: InternalAxiosRequestConfig, status: number, code: string) {
  const response: AxiosResponse = { config, status, statusText: code, headers: {}, data: { code } }
  throw new AxiosError(code, "ERR_DEMO", config, undefined, response)
}
export const getRandomPrize = () => prizes[Math.floor(Math.random() * prizes.length)]
function promo(code: string, config: InternalAxiosRequestConfig): Promocode {
  const normalized = String(code || "").trim().toUpperCase()
  const discounts = { DEMO: 0.2, PRIME: 0.15, NEW: 0.15, BLACK: 0.3, BIRTHDAY: 0.25, AGENT: 0.1 }
  if (!(normalized in discounts)) fail(config, 400, "discount_code_validation_error")
  const ids = getSubscriptions(version()).map(sub => sub.id)
  return { code: normalized, discountAmount: discounts[normalized], discountKind: { id: "PERCENT", label: "%" },
    discounts: ids.map(subscriptionId => ({ subscriptionId, discountAmount: discounts[normalized] })),
    isReferralCode: normalized === "AGENT", validForSubscriptions: ids, invalidForSubscriptions: [] }
}
const adapter: AxiosAdapter = async config => {
  const url = new URL(config.url || "", "http://demo.local")
  const path = url.pathname.replace(/^.*\/api\/v1/, "").replace(/\/+$/, "")
  const body = typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {}
  let data: unknown
  switch (path) {
    case "/subscriptions/get-active": data = getSubscriptions(version()); break
    case "/landing/income-cases": data = incomeCases; break
    case "/landing/participant-achievements": data = achievements; break
    case "/payments/available/methods": data = paymentMethods; break
    case "/users/profile": data = null; break
    case "/promo-codes/validate": data = promo(body.promocode, config); break
    case "/landing/subscriptions/buy": {
      const sub = getSubscriptions(version()).find(sub => sub.id === body.subscriptionId)
      if (!sub) fail(config, 400, "invalid_subscription")
      data = { purchased: true, subscription: sub }; break
    }
    case "/crypton-events/containers": data = containers; break
    case "/crypton-events/containers/open": data = { prize: getRandomPrize(), userData: null }; break
    case "/crypton-events/free-spin": data = getRandomPrize(); break
    case "/crypton-events/last-opened-containers": data = []; break
    default: fail(config, 404, `unhandled_demo_endpoint:${path}`)
  }
  return { data, config, headers: {}, status: 200, statusText: "OK" }
}
// Every supported request is local. There is no persistence or network fallback.
const demoAxios = axios.create({ adapter })
Object.assign(demoAxios, { create: (options = {}) => axios.create({ ...options, adapter }) })
export default demoAxios as typeof axios
