import React, { useEffect } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import axios, { AxiosError } from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"

import MailToLinkMap from "../MailToLinkMap"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../shared/InputOTP"
import Loader from "../../shared/Loader"

import AuthApi from "../../api"

import { useAuthContext } from "../../AuthContext"

import { useTranslate } from "../../useTranslate"
import { FreeSpinResponse } from "@/blackFriday/Scroller/types"
import { User } from "@/types/id-profile-user"

const MAX_CODE_LENGTH = 4

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const AuthByCode = ({
  emailDomain,
  isTelegramCode,
}: {
  emailDomain?: string
  isTelegramCode?: boolean
}) => {
  const t = useTranslate()

  const { refetchAfterSuccessAuth } = useAuthContext()

  const [value, setValue] = React.useState("")

  const { mutateAsync: makeFreeSpin } = useMutation({
    mutationKey: ["free-spin"],
    mutationFn: async () => {
      try {
        const response = await axios.post<FreeSpinResponse>(
          `${ID_URL}/api/v1/crypton-events/free-spin/`,
          undefined,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(
          `${ID_URL}/api/v1/users/profile/`,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })

  const {
    mutate: auth,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: ({ code }: { code: string }) => AuthApi.authByCode({ code }),
    onSuccess: () => {
      refetchAfterSuccessAuth()
    },
  })

  useEffect(() => {
    if (isPending) return

    reset()

    if (value.length === MAX_CODE_LENGTH) {
      auth({ code: value })
    }
  }, [value])

  return (
    <div className="id_crypton_code_container">
      {isSuccess ? (
        <p className="id_crypton_message__success">{t("Код введён успешно")}</p>
      ) : (
        <>
          <InputOTP
            maxLength={MAX_CODE_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            value={value}
            onChange={(value) => !isPending && setValue(value)}
          >
            <InputOTPGroup>
              {[...new Array(MAX_CODE_LENGTH)].map((_, i) => (
                <InputOTPSlot index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {isPending ? (
            <Loader />
          ) : error ? (
            <p className="id_crypton_message__error">
              {error instanceof AxiosError
                ? error.status === 429
                  ? t(
                      "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                    )
                  : error.status === 400 &&
                    error.response?.data.code === "token_not_found"
                  ? t("Введённый код неверный")
                  : t("На стороне сервера произошла ошибка")
                : t(
                    "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже"
                  )}
            </p>
          ) : (
            <p className="id_crypton_message">
              {isTelegramCode ? (
                <>
                  {t("Введите код, который пришёл в")}{" "}
                  <a
                    className="id_crypton_link"
                    href="https://t.me/CryptonLobbyBot"
                    target="_blank"
                  >
                    Lobby bot
                  </a>
                </>
              ) : (
                t("Введите код, который пришёл на почту")
              )}{" "}
              {emailDomain && <MailToLinkMap emailDomain={emailDomain} />}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default AuthByCode
