import * as Dialog from "@radix-ui/react-dialog"
import type { Prize } from "./types"
import styles from "@/demo/styles.module.scss"
export default function WinDialog({ open, onOpenChange, prize }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  prize: Prize | null
}) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.dialog}>
        <Dialog.Close className={styles.close} aria-label="Закрыть">×</Dialog.Close>
        <Dialog.Title className={styles.dialogTitle}>Ваш подарок!</Dialog.Title>
        {prize && <>
          <img className={styles.winnerImage} src={prize.image} alt={prize.title} />
          <h3>{prize.title}</h3>
        </>}
        <Dialog.Description className={styles.description}>Демонстрационный результат. Попробуйте ещё раз — в кейсе может выпасть любой подарок.</Dialog.Description>
        <Dialog.Close className={styles.primary}>Продолжить</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
