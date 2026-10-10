import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import type { Promocode, Subscription } from "@/types/api-types"
import type { Resolution } from "@/types/resolution"
import styles from "@/demo/styles.module.scss"

// Keep the original card interface; the portfolio purchase takes a single click.
export default function BuySubscriptionDialog({ children, selectedSubscription, dialogOpen, setDialogOpen }: {
  children: React.ReactNode
  selectedSubscription: Subscription
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  order: number
  resolution: Resolution
  setPromoForSubmit: React.Dispatch<React.SetStateAction<string>>
  activePromocode: Promocode | null
  fallbackPromocode: Promocode | null
}) {
  return <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.dialog}>
        <Dialog.Close className={styles.close} aria-label="Закрыть">×</Dialog.Close>
        <div className={styles.successMark} aria-hidden="true">✓</div>
        <Dialog.Title className={styles.dialogTitle}>Подписка оформлена!</Dialog.Title>
        <Dialog.Description>
          {selectedSubscription.kind.name} · {selectedSubscription.duration.id} {selectedSubscription.duration.id === 1 ? "месяц" : selectedSubscription.duration.id < 5 ? "месяца" : "месяцев"}
        </Dialog.Description>
        <p className={styles.description}>Это демонстрация покупки. Оплата не требуется.</p>
        <Dialog.Close className={styles.primary}>Продолжить просмотр</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
