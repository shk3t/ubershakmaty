import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clearRequest} from "../reducers/requestReducer"

export default function useErrorMessage() {
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.requestReducer.errorMessage)

  useEffect(() => {
    // TODO сделать отдельное окошко с уведомлением для ошибки
    if (errorMessage) {
      alert(errorMessage)
      dispatch(clearRequest())
    }
  }, [errorMessage])
}