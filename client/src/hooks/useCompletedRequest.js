import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clearRequest} from "../reducers/requestReducer"

export default function useCompletedRequest(label, callback = null) {
  const dispatch = useDispatch()
  const completedLabel = useSelector(
    (state) => state.requestReducer.completedLabel
  )

  useEffect(() => {
    if (completedLabel !== label) return
    if (callback) callback()
    dispatch(clearRequest())
  }, [completedLabel])
}