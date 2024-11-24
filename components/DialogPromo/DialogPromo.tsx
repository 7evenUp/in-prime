import React from "react"
import Image, { StaticImageData } from "next/image"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import styles from "./styles.module.scss"
import { getColorByRarity } from "@/sections/TimerPromo/getColorByRarity"
import clsx from "clsx"

const DialogPromo = ({
  children,
  name,
  description,
  imgSrc,
  rarity,
  bgColor,
  nftImageUrl,
}: {
  children: React.ReactNode
  name: string
  description: string
  imgSrc: string
  rarity?: string | null
  bgColor?: string | null
  nftImageUrl?: string | null
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
              <div
                className={styles.avatar__line}
                style={{ background: getColorByRarity(rarity, bgColor) }}
              />
            </div>
          )}

          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {nftImageUrl && (
              <a
                href={nftImageUrl}
                target="_blank"
                className={clsx(styles.description, styles.description_link)}
              >
                подробнее
              </a>
            )}
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
