import React from "react"
import Image, { StaticImageData } from "next/image"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import styles from "./styles.module.scss"

const DialogPromo = ({
  children,
  name,
  description,
  imgSrc,
}: {
  children: React.ReactNode
  name: string
  description: string
  imgSrc: string
}) => (
  <DialogPrimitive.Root>
    <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content className={styles.content}>
        <div className={styles.content_sm}>
          {imgSrc && (
            <div className={styles.avatar}>
              <img src={imgSrc} alt={name} className={styles.avatar} />
              <div className={styles.avatar__line} />
            </div>
          )}

          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
        <p
          className={styles.description_sm}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)

export default DialogPromo
