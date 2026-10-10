import { useCallback } from "react"
// No visitor data is sent from the portfolio demo.
const useSendEvent = () => {
  const sendEvent = useCallback((_event: { name: string; payload?: Record<string, string> }) => {}, [])
  return { sendEvent }
}
export default useSendEvent
