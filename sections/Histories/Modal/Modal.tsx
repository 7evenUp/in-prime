import React from "react"
import * as Dialog from "@radix-ui/react-dialog"

import styles from "./Modal.module.scss"

const Modal = ({
  children,
  title,
  textHtml,
}: {
  children: React.ReactNode
  title: string
  textHtml: string
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: textHtml }}
        />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default Modal
