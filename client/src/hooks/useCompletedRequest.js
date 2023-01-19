import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clearRequest} from "../reducers/requestReducer"

export default function useCompletedRequest(label, cleanCallback, message) {
  const dispatch = useDispatch()
  const completedLabel = useSelector(
    (state) => state.requestReducer.completedLabel
  )

  useEffect(() => {
    if (completedLabel !== label) return
    cleanCallback()
    alert(message)
    dispatch(clearRequest())
  }, [completedLabel])
}