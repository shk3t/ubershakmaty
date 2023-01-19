import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clearRequest} from "../reducers/requestReducer"

export default function useErrorMessage() {
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.requestReducer.errorMessage)

  useEffect(() => {
    // TODO make special message window for this purpose
    if (errorMessage) {
      alert(errorMessage)
      dispatch(clearRequest())
    }
  }, [errorMessage])
}