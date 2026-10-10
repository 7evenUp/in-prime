import React from "react"
import * as Dialog from "@radix-ui/react-dialog"

import CloseIcon from "./CloseIcon"

import styles from "./InfoDialog.module.css"

const InfoDialog = ({
  children,
  image,
  title,
  description,
  getgemsLink,
  moreLink,
}: {
  children: React.ReactNode
  image: string
  title: string
  description: string
  getgemsLink: string
  moreLink?: string
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.Trigger} aria-label={`Посмотреть подарок: ${title}`}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content
          aria-describedby={undefined}
          className={styles.Content}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <>
            <div className={styles.wrapper}>
              <div className={styles.img_container}>
                <img src={image} className={styles.img} />
              </div>
              <div className={styles.prize}>
                <Dialog.Title className={styles.prize_title}>{title}</Dialog.Title>
                <p className={styles.prize_description}>{description}</p>
                <div className={styles.links}>
                  {moreLink ? (
                    moreLink === getgemsLink ? (
                      <a
                        href={getgemsLink}
                        target="_blank"
                        className={styles.link}
                      >
                        GetGems
                      </a>
                    ) : (
                      <>
                        <a
                          href={moreLink}
                          target="_blank"
                          className={styles.link}
                        >
                          Подробнее
                        </a>
                        {getgemsLink && (
                          <a
                            href={getgemsLink}
                            target="_blank"
                            className={styles.link}
                          >
                            GetGems
                          </a>
                        )}
                      </>
                    )
                  ) : (
                    getgemsLink && (
                      <a
                        href={getgemsLink}
                        target="_blank"
                        className={styles.link}
                      >
                        GetGems
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
            <Dialog.Close className={styles.close_button}>
              <CloseIcon className={styles.close_icon} />
            </Dialog.Close>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default InfoDialog
