import {
  setAuth,
  setBoxesLeft,
  setBoxesUsed,
  setShouldRetryAuth,
  setUserId,
} from "@/redux/reducers/modalReducer"
import { RootState } from "@/redux/store"
import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {
  children: any
}

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const AuthService: FC<Props> = (props: Props) => {
  const { isAuth, shouldRetryAuth } = useSelector(
    (state: RootState) => state.auth
  )

  const dispatch = useDispatch()

  const auth = async () => {
    await axios
      .get(`${ID_URL}/api/v1/users/get-jwt/`, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        setTimeout(() => {}, 1000)
        // axios
        //   .get(`${ID_URL}/api/v1/users/authenticate/`, {
        //     withCredentials: true,
        //   })
        //   .then((res) => {
        axios
          .get(`${ID_URL}/api/v1/users/profile/`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(setAuth(true))
            dispatch(setBoxesLeft(res.data.promoBoxAvailableOpensNumber))
            dispatch(setBoxesUsed(res.data.totalOpenedPromoBox))
            dispatch(setUserId(res.data.id))
          })
          .catch((err) => {
            console.log(err)
          })
        localStorage.setItem("user", res.data.id)
      })
      // .catch((err) => {
      //   console.log(err)
      // })
      // })
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
