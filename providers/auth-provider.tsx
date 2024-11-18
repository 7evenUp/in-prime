import { setAuth, setShouldRetryAuth } from "@/redux/reducers/modalReducer"
import { RootState } from "@/redux/store"
import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {
  children: any
}

const AuthService: FC<Props> = (props: Props) => {
  const ID_URL = process.env.NEXT_PUBLIC_BASE_URL

  const { isAuth, shouldRetryAuth } = useSelector(
    (state: RootState) => state.auth
  )

  const dispatch = useDispatch()

  const auth = async () => {
    await axios
      .get(`https://id-dev.crypton.xyz/api/v1/users/get-jwt/`, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        axios
          .get(`https://id-dev.crypton.xyz/auth/users/authenticate/`)
          .then((res) => {
            dispatch(setAuth(true))
            console.log(res)
            localStorage.setItem("user", res.data.id)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        dispatch(setAuth(false))
        console.error(err)
      })
  }

  useEffect(() => {
    if (shouldRetryAuth) {
      auth().then(() => dispatch(setShouldRetryAuth(false)))
    }
  }, [shouldRetryAuth])

  useEffect(() => {
    auth()
  }, [])

  return <>{props.children}</>
}

export default AuthService
