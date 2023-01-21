import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import Swal from "sweetalert2"
import {clearRequest} from "../reducers/requestReducer"

export default function useErrorMessage() {
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.requestReducer.errorMessage)

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      })
      dispatch(clearRequest())
    }
  }, [errorMessage])
}