import { Dispatch, SetStateAction } from "react"

import GoogleButton from "./GoogleButton"
import TelegramButton from "./TelegramButton"
// import AppleButton from "./AppleButton"

const AuthVariants = ({
  setIsTelegramFlow,
}: {
  setIsTelegramFlow: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="id_crypton_auth_buttons">
      <GoogleButton />
      <TelegramButton setIsTelegramFlow={setIsTelegramFlow} />
      {/* <AppleButton /> */}
    </div>
  )
}

export default AuthVariants
