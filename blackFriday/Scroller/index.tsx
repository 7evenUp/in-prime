import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, animate, useReducedMotion } from "motion/react"
import { containers, prizes } from "@/demo/fixtures"
import { getRandomPrize } from "@/demo/api"
import { generateAnimation } from "./generateAnimation"
import WinDialog from "./WinDialog"
import type { Prize } from "./types"
import styles from "./styles.module.css"

const FINISH_X = -5996 // Center of the 40th card: 39 * (136 + 16) + 68.
export default function Scroller() {
  const x = useMotionValue(FINISH_X)
  const reducedMotion = useReducedMotion()
  const [cards, setCards] = useState<React.ReactNode>(null)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<Prize | null>(null)
  const [open, setOpen] = useState(false)
  const controls = useRef<ReturnType<typeof animate> | null>(null)
  const locked = useRef(false)
  useEffect(() => {
    setCards(generateAnimation(50, prizes[0], containers.containers[0].prizes))
    return () => { controls.current?.stop() }
  }, [])
  const spin = () => {
    if (locked.current) return
    locked.current = true
    setSpinning(true)
    const prize = getRandomPrize()
    setWinner(prize)
    setCards(generateAnimation(50, prize, containers.containers[0].prizes))
    x.jump(0)
    controls.current = animate(x, FINISH_X, {
      duration: reducedMotion ? 0 : 3,
      ease: [0.12, 0.8, 0.18, 1],
      onComplete: () => {
        locked.current = false
        setSpinning(false)
        setOpen(true)
      },
    })
  }
  return <>
    <div className={styles.demoWheel}>
      <div className={styles.demoTrack} aria-label="Рулетка подарков" aria-busy={spinning}>
        <motion.div className={styles.prizes} style={{ x, pointerEvents: spinning ? "none" : "auto" }}>{cards}</motion.div>
        <span className={styles.demoPointer} aria-hidden="true">▼</span>
      </div>
      <button className={styles.button} disabled={spinning} onClick={spin}>{spinning ? "Открываем…" : "Открыть кейс"}</button>
    </div>
    <WinDialog open={open} onOpenChange={setOpen} prize={winner} />
  </>
}
