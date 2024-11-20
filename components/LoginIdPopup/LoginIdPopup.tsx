"use client"
import Modal from "react-modal"
import { useEffect, useState } from "react"
import { Form, Formik } from "formik"
import { MAIL_TO_LINK } from "./constants"
import * as yup from "yup"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"

import { toast } from "sonner"
import axios from "axios"
import {
  setLoginIDModal,
  setShouldRetryAuth,
} from "@/redux/reducers/modalReducer"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/redux/hooks"

export const getShortAddress = (address: string) => `
  ${address.slice(0, 6)}...${address.slice(address.length - 4)}
`

interface IInitialValues {
  loginInputValue: string
  nicknameValue: string
}

const LoginIdPopup: React.FC = () => {
  const ID_URL = process.env.NEXT_PUBLIC_ID_URL

  const { isLoginIDModal } = useSelector((state: RootState) => state.auth)

  const [isLoginByMailFormVisible, setLoginByMailFormVisible] = useState(false)
  const [isMailInputFocused, setMailInputFocused] = useState(false)
  const [isNicknameInputFocused, setNicknameInputFocused] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [emailInputValue, setEmailInputValue] = useState("")
  const [codeInputValue, setCodeInputValue] = useState("")
  const [nicknameInputValue, setNicknameInputValue] = useState("")
  const [isSucces, setSuccess] = useState(false)
  const [isAuthStarted, setIsAuthStarted] = useState(false)
  const [isEmailRegistration, setEmailRegistration] = useState(false)
  const [isSendedToEmail, setSendedToEmail] = useState(false)
  const [isCodeSended, setCodeSended] = useState(false)
  const [isRegisteredByEmail, setRegisteredByEmail] = useState(false)
  const [userIsRegisteredError, setUserIsRegisteredError] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [isRegistrationByWallet, setRegistrationByWallet] = useState(false)
  const [emailDomain, setEmailDomain] = useState("")
  const [signature, setSignature] = useState("")
  const [walletErrorStatus, setWalletErrorStatus] = useState<{
    code: number | string
    detail: string
  } | null>(null)

  const dispatch = useAppDispatch()

  const { open } = useWeb3Modal()
  const { address, isConnected, isDisconnected } = useAccount()
  const { isPending, signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const AUTH_MESSAGE = "Authorization"
  const SIGN_REJECT_ERROR = "UserRejectedRequestError"
  const CONNECTOR_NOT_FOUND_ERROR = "ConnectorNotFoundError"

  const isMobileDevice = true

  const loginValidationSchema = yup.object().shape({
    loginInputValue: yup
      .string()
      .email("Неверный формат почты")
      .required("Поле обязательно для заполнения"),
    nicknameValue: yup.string(),
  })

  const signupValidationSchema = yup.object().shape({
    loginInputValue: yup
      .string()
      .email("Неверный формат почты")
      .required("Поле обязательно для заполнения"),
    nicknameValue: yup.string().required("Поле обязательно для заполнения"),
  })

  const codeValidationSchema = yup.object().shape({
    loginInputValue: yup.string().required("Поле обязательно для заполнения"),
  })

  const initialValues: IInitialValues = {
    loginInputValue: "",
    nicknameValue: "",
  }

  const handleSubmit = () => {
    setLoading(true)
    if (userIsRegisteredError) return

    const cleanEmail = emailInputValue.toLowerCase().trim()
    setEmailDomain(cleanEmail.split("@")[1])
    setSuccess(true)

    if (isRegistrationByWallet) {
      axios
        .post(`${ID_URL}/api/v1/users/register-web-wallet/`, {
          email: emailInputValue,
          profile_username: nicknameInputValue,
          redirect_url: ID_URL,
          message: AUTH_MESSAGE,
          address: address,
          signature: signature,
          referral_code: localStorage.getItem("ref_code") ?? undefined,
        })
        .then(() => {
          setRegisteredByEmail(true)
          localStorage.removeItem("ref_code")
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 300)
        })
    } else if (isEmailRegistration) {
      axios
        .post(`${ID_URL}/api/v1/users/register-web/`, {
          email: emailInputValue,
          profile_username: nicknameInputValue,
          redirect_url: ID_URL,
          referral_code: localStorage.getItem("ref_code") ?? undefined,
        })
        .then(() => {
          setRegisteredByEmail(true)
          localStorage.removeItem("ref_code")
        })
        .catch((err) => {
          if (err.response.data.code === "invalid_data") {
            setUserIsRegisteredError(true)
          }
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 300)
        })
    } else if (isCodeSended) {
      axios
        .get(`${ID_URL}/api/v1/users/authenticate/?code=${codeInputValue}`, {
          withCredentials: true,
        })
        .then(() => {
          dispatch(setShouldRetryAuth(true))
          dispatch(setLoginIDModal(false))
        })
        .catch((err) => {
          setCodeError(true)
          setLoading(false)
        })
    }
  }

  const handleConnect = async () => {
    setIsAuthStarted(true)
    if (!isConnected) open({ view: "Connect" })
  }

  const handleOnChangeInput = (value: string, setFieldValue: any) => {
    isCodeSended ? setCodeInputValue(value) : setEmailInputValue(value)

    setFieldValue("loginInputValue", value)
  }

  const clearState = () => {
    setLoginByMailFormVisible(false)
    setEmailRegistration(false)
    setEmailInputValue("")
    setSuccess(false)
    setWalletErrorStatus(null)
    setRegisteredByEmail(false)
    setRegistrationByWallet(false)
    setUserIsRegisteredError(false)
    setLoading(false)
  }

  const handleCloseModal = () => {
    clearState()
    dispatch(setLoginIDModal(false))
  }

  useEffect(() => {
    const login = async () => {
      let signature
      setLoading(true)

      try {
        // @ts-expect-error No-Error-Types
        signature = await signMessageAsync({ message: AUTH_MESSAGE })
      } catch (error) {
        if (error.name === SIGN_REJECT_ERROR) {
          toast.error("Вы отклонили подпись транзакции в кошельке", {
            className: "toast-error",
          })
        }

        if (error.name === CONNECTOR_NOT_FOUND_ERROR) {
          toast.error("Запрос уже был отправлен. Откройте Ваш кошелёк", {
            className: "toast-error",
          })
        }

        disconnect()
        setIsAuthStarted(false)
        return
      }

      setSignature(signature)
      const lowerAddress = isConnected && address ? address.toLowerCase() : ""

      axios
        .post(`${ID_URL}/api/v1/users/authenticate-by-wallet/`, {
          address: lowerAddress,
          message: AUTH_MESSAGE,
          signature,
        })
        .then(() => {
          dispatch(setShouldRetryAuth(true))
          dispatch(setLoginIDModal(false))
        })
        .catch((err: any) => {
          setWalletErrorStatus(err.response.data)

          if (err.response.data.code === "user_does_not_exists") {
            setEmailRegistration(true)
            setLoginByMailFormVisible(true)
            setRegistrationByWallet(true)
          }
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 300)
        })

      setIsAuthStarted(false)
    }
    if (isAuthStarted && isConnected) login()
  }, [isAuthStarted, isConnected])

  useEffect(() => {
    if (isDisconnected) {
      // reset()
      setIsAuthStarted(false)
    }
  }, [isDisconnected])

  useEffect(() => {
    if (isSucces && emailInputValue.length) {
      axios
        .post(
          `${ID_URL}/api/v1/users/login/${
            isMobileDevice ? "?use_verification_code=true" : ""
          }`,
          {
            email: emailInputValue,
            redirect_url: ID_URL,
          }
        )
        .then(() => {
          setCodeSended(isMobileDevice)
          setSendedToEmail(true)
          setLoading(true)
        })
        .catch((err) => {
          console.log(err)

          if (err.response?.data.code === "user_not_found") {
            setEmailRegistration(true)
          } else {
            setSuccess(false)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isSucces, ID_URL])

  return (
    <Modal
      isOpen={isLoginIDModal}
      portalClassName="react-modal id-modal"
      closeTimeoutMS={300}
      ariaHideApp={false}
      className={`react-modal__login-id-popup ${
        isEmailRegistration ? "tall" : ""
      }`}
      style={{ overlay: { zIndex: 20 }, content: { zIndex: 20 } }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleCloseModal}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={
          isCodeSended
            ? codeValidationSchema
            : isEmailRegistration
            ? signupValidationSchema
            : loginValidationSchema
        }
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <div className={`login-id-popup`}>
              <div className="login-id-popup__inner">
                <h4 className="login-id-popup__title">Вход в личный кабинет</h4>

                {!isLoginByMailFormVisible ? (
                  <div className="login-id-popup__buttons-container">
                    <button
                      type="button"
                      className="login-id-popup__button"
                      onClick={handleConnect}
                    >
                      <svg
                        width="40"
                        height="20"
                        viewBox="0 0 40 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_920_354)">
                          <path
                            d="M18.5807 15.039H18.3114L15.4848 0.196075H10.0991L7.2707 15.039H7.00142L4.17478 0.196075H0L3.42352 16.9089C3.70482 18.2792 4.89687 19.261 6.27932 19.261H9.82977L12.6581 5.09977H12.9274L15.7558 19.261H21.68L24.8034 4.01045H20.6835L18.5824 15.0407L18.5807 15.039Z"
                            fill="#5143F4"
                          />
                          <path
                            d="M39.1303 10.1422C38.6466 9.35473 37.976 8.69385 37.187 8.22204C36.2831 7.68258 35.29 7.41199 34.2094 7.41199H33.5371V7.24893L33.8063 7.13966L38.789 4.00698V3.14489C38.789 1.5161 37.4837 0.194344 35.8714 0.194344H25.5837L24.8033 4.00698H32.9985V4.14401L28.0158 7.54902V10.5447H32.5937C33.2935 10.5447 33.887 10.6591 34.3706 10.8846C34.856 11.1119 35.2197 11.4293 35.4615 11.8387C35.7033 12.2463 35.8251 12.7233 35.8251 13.268C35.8251 13.7762 35.6896 14.2341 35.4221 14.6435C35.1528 15.0511 34.7531 15.379 34.2231 15.6236C33.6931 15.8681 33.0602 15.9913 32.3244 15.9913C31.3193 15.9913 30.5115 15.7554 29.9008 15.2836C29.2902 14.8118 28.8872 14.2307 28.6882 13.5403H24.5134C24.7107 14.6487 25.1189 15.6739 25.7381 16.6175C26.3573 17.5611 27.22 18.3295 28.3229 18.9193C29.4275 19.509 30.7602 19.8039 32.3227 19.8039C33.8852 19.8039 35.1956 19.509 36.362 18.9193C37.5283 18.3295 38.4271 17.5351 39.0548 16.5359C39.6826 15.5368 39.9982 14.4475 39.9982 13.268C39.9982 12.0885 39.7083 11.0859 39.1286 10.1422H39.1303Z"
                            fill="#8D80F2"
                          />
                          <path
                            d="M20.9529 2.58808L20.6819 4.00871H24.8018L25.5822 0.196075H23.8173C22.4194 0.196075 21.217 1.20041 20.9529 2.58808Z"
                            fill="#FF92FF"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_920_354">
                            <rect
                              width="40"
                              height="19.6078"
                              fill="white"
                              transform="translate(0 0.196075)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>Кошелёк</span>
                    </button>
                    <button
                      type="button"
                      className="login-id-popup__button"
                      onClick={() => setLoginByMailFormVisible(true)}
                    >
                      <svg
                        width="28"
                        height="30"
                        viewBox="0 0 28 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_920_360)">
                          <path
                            d="M28 10.3321L16.5806 1.84528C15.0485 0.706204 12.9516 0.706204 11.4175 1.84528L0 10.3321H28Z"
                            fill="#FD5101"
                          />
                          <path
                            d="M13.9246 19.6718C13.0431 19.6565 12.1635 19.3741 11.4194 18.8208L0 10.3321V24.6822C0 25.9739 0.56477 27.1302 1.46153 27.9239L11.4194 20.5227C12.1635 19.9694 13.0431 19.687 13.9246 19.6718Z"
                            fill="#FEB447"
                          />
                          <path
                            d="M28.0001 24.6822V10.3321L16.5807 18.8189C15.8365 19.3722 14.9569 19.6546 14.0754 19.6698C14.9569 19.6851 15.8365 19.9675 16.5807 20.5208L26.5385 27.922C27.4353 27.1302 28.0001 25.972 28.0001 24.6822Z"
                            fill="#FEB447"
                          />
                          <path
                            d="M14.0753 19.6718C14.0237 19.6718 13.9741 19.6718 13.9226 19.6718C13.0411 19.687 12.1615 19.9694 11.4174 20.5227L1.46143 27.9239C2.22463 28.5993 3.22824 29.0095 4.32725 29.0095H23.6744C24.7735 29.0095 25.7771 28.5993 26.5403 27.9239L16.5824 20.5227C15.8383 19.9694 14.9587 19.687 14.0772 19.6718H14.0753Z"
                            fill="#FD5101"
                          />
                          <path
                            d="M16.5806 18.8189L28 10.3321H0L11.4194 18.8189C12.9515 19.958 15.0485 19.958 16.5825 18.8189H16.5806Z"
                            fill="#FD5101"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_920_360">
                            <rect
                              width="28"
                              height="28.0191"
                              fill="white"
                              transform="translate(0 0.990463)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span>Почта</span>
                    </button>
                  </div>
                ) : (
                  <div className="login-id-popup__email-form">
                    <button
                      className="login-id-popup__email-form-back"
                      onClick={clearState}
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#000000"
                      >
                        <path
                          d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Другой метод авторизации</span>
                    </button>
                    {walletErrorStatus?.code === "user_does_not_exists" && (
                      <span className="login-id-popup__create-acc-message">
                        Создание аккаунта c кошельком:{" "}
                        {address && getShortAddress(address)}
                      </span>
                    )}
                    <div
                      className={`login-id-popup__mail-input-group ${
                        isMailInputFocused ? "focused" : ""
                      }`}
                    >
                      <label
                        htmlFor="loginInputValue"
                        className={
                          errors.loginInputValue && touched.loginInputValue
                            ? "withError"
                            : ""
                        }
                      >
                        {isCodeSended ? "Код" : "Почта"}
                      </label>
                      <div className="login-id-popup__mail-input-wrapper">
                        <input
                          value={
                            isCodeSended ? codeInputValue : emailInputValue
                          }
                          id="loginInputValue"
                          name="loginInputValue"
                          placeholder={
                            isCodeSended ? "Введите код" : "Введите почту"
                          }
                          className={
                            errors.loginInputValue && touched.loginInputValue
                              ? "withError"
                              : ""
                          }
                          onChange={(e) => {
                            handleOnChangeInput(e.target.value, setFieldValue)
                          }}
                          onFocus={() => setMailInputFocused(true)}
                          onBlur={() => setMailInputFocused(false)}
                        />
                        {errors.loginInputValue && (
                          <span className="login-id-popup__mail-input-error">
                            {errors.loginInputValue}
                          </span>
                        )}
                      </div>
                    </div>
                    {isEmailRegistration && (
                      <div
                        className={`login-id-popup__mail-input-group nickname ${
                          isNicknameInputFocused ? "focused" : ""
                        }`}
                      >
                        <label
                          htmlFor="nicknameValue"
                          className={
                            errors.nicknameValue && touched.nicknameValue
                              ? "withError"
                              : ""
                          }
                        >
                          Имя пользователя
                        </label>
                        <div className="login-id-popup__mail-input-wrapper">
                          <input
                            value={nicknameInputValue}
                            id="nicknameValue"
                            name="nicknameValue"
                            className={
                              errors.nicknameValue && touched.nicknameValue
                                ? "withError"
                                : ""
                            }
                            onChange={(e) => {
                              setNicknameInputValue(e.target.value)
                              setFieldValue("nicknameValue", e.target.value)
                            }}
                            onFocus={() => setNicknameInputFocused(true)}
                            onBlur={() => setNicknameInputFocused(false)}
                          />
                          {errors.nicknameValue && (
                            <span className="login-id-popup__mail-input-error">
                              {errors.nicknameValue}
                            </span>
                          )}
                        </div>
                        <p className="login-id-popup__privacy">
                          Создавая учетную запись, я принимаю{" "}
                          <a href={`${ID_URL}privacy-policy`} target="_blank">
                            Пользовательское соглашение
                          </a>
                        </p>
                      </div>
                    )}
                    <button className="login-id-popup__login-btn" type="submit">
                      {isLoading ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      ) : isEmailRegistration ? (
                        "Зарегистрироваться"
                      ) : (
                        "Войти"
                      )}
                      {}
                    </button>
                    {isSendedToEmail &&
                      !Object.keys(errors).length &&
                      !isEmailRegistration &&
                      !codeError && (
                        <span className="login-id-popup__mail-input-success">
                          {" "}
                          {isCodeSended
                            ? "Код для входа успешно отправлен вам на почту"
                            : "Ссылка для входа успешно отправлена вам на почту"}{" "}
                          {isCodeSended ? (
                            "Пожалуйста, введите его в поле выше"
                          ) : emailDomain in MAIL_TO_LINK ? (
                            <a
                              href={
                                MAIL_TO_LINK[
                                  emailDomain as
                                    | "gmail.com"
                                    | "mail.ru"
                                    | "yandex.ru"
                                ].link
                              }
                              target="_blank"
                              className="underline"
                            >
                              {
                                MAIL_TO_LINK[
                                  emailDomain as
                                    | "gmail.com"
                                    | "mail.ru"
                                    | "yandex.ru"
                                ].name
                              }
                            </a>
                          ) : (
                            <a
                              href={`https://${emailDomain}`}
                              target="_blank"
                              className="underline"
                            >
                              {emailDomain}
                            </a>
                          )}
                        </span>
                      )}

                    {isRegisteredByEmail && !userIsRegisteredError && (
                      <span className="login-id-popup__mail-input-success">
                        Вы успешно зарегистрированы! Перейдите по ссылке,
                        которую мы отправили вам на почту{" "}
                        {emailDomain in MAIL_TO_LINK ? (
                          <a
                            href={
                              MAIL_TO_LINK[
                                emailDomain as keyof typeof MAIL_TO_LINK
                              ].link
                            }
                            target="_blank"
                            className="underline"
                          >
                            {
                              MAIL_TO_LINK[
                                emailDomain as keyof typeof MAIL_TO_LINK
                              ].name
                            }
                          </a>
                        ) : (
                          <a
                            href={`https://${emailDomain}`}
                            target="_blank"
                            className="underline"
                          >
                            {emailDomain}
                          </a>
                        )}
                      </span>
                    )}

                    {userIsRegisteredError && (
                      <span className="login-id-popup__mail-input-error">
                        Такой Email уже зарегистрирован
                      </span>
                    )}
                    {walletErrorStatus && !isRegistrationByWallet && (
                      <span className="login-id-popup__mail-input-error">
                        {walletErrorStatus?.code === 429
                          ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                          : "На стороне сервера произошла ошибка"}
                      </span>
                    )}
                    {codeError && (
                      <span className="login-id-popup__mail-input-error">
                        Неверный код
                      </span>
                    )}
                  </div>
                )}
              </div>

              {isPending && (
                <div className="loading-message">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <p>
                    Подтвердите подпись транзакции в кошельке{" "}
                    {address && getShortAddress(address)}
                  </p>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default LoginIdPopup
