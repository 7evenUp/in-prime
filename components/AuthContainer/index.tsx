import { useState } from "react"

import { AuthProvider } from "./AuthContext"

import { useTranslate } from "./useTranslate"

import AuthVariants from "./components/AuthVariants"
import Divider from "./components/Divider"
import EmailLogin from "./components/EmailLogin"
import EmailRegister from "./components/EmailRegister"
import TelegramLogin from "./components/TelegramLogin"
import IdIcon from "./components/Icons/ID"

const AuthContainer = ({
  refetchAfterSuccessAuth,
  lang,
}: {
  refetchAfterSuccessAuth: VoidFunction
  lang: "ru" | "en"
}) => {
  return (
    <AuthProvider value={{ lang, refetchAfterSuccessAuth }}>
      <AuthContent />
    </AuthProvider>
  )
}

const AuthContent = () => {
  const t = useTranslate()

  const [emailInput, setEmailInput] = useState("")
  const [isUserNotFoundByMailLogin, setIsUserNotFoundByMailLogin] =
    useState(false)

  const [isTelegramFlow, setIsTelegramFlow] = useState(false)

  const resetAuthVariant = () => {
    setIsUserNotFoundByMailLogin(false)
    setIsTelegramFlow(false)
  }

  return (
    <div className="id_crypton_auth">
      <IdIcon className="id_crypton_logo" />

      {isUserNotFoundByMailLogin ? (
        <>
          <h2 className="id_crypton_title">{t("Регистрация")}</h2>

          <EmailRegister emailInput={emailInput} />

          <Divider />

          <button className="id_crypton_reset_auth" onClick={resetAuthVariant}>
            {t("Выбрать другой способ входа")}
          </button>
        </>
      ) : isTelegramFlow ? (
        <>
          <h2 className="id_crypton_title">{t("Вход через Telegram")}</h2>

          <TelegramLogin />

          <Divider />

          <button className="id_crypton_reset_auth" onClick={resetAuthVariant}>
            {t("Выбрать другой способ входа")}
          </button>
        </>
      ) : (
        <>
          <h2 className="id_crypton_title">{t("Вход в Crypton")}</h2>

          <AuthVariants setIsTelegramFlow={setIsTelegramFlow} />

          <Divider />

          <EmailLogin
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            setIsUserNotFoundByMailLogin={setIsUserNotFoundByMailLogin}
          />
        </>
      )}
    </div>
  )
}

export default AuthContainer
