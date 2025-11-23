import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import AuthContainer from "@/components/AuthContainer"

import styles from "./AuthDialog.module.css"

const AuthDialog = ({
  open,
  onOpenChange,
  refetchCb,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  refetchCb: VoidFunction
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <AuthContainer refetchAfterSuccessAuth={refetchCb} lang="ru" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AuthDialog
