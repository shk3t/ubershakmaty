import React from "react"
import {capitalize, startCase} from "lodash"

export default function GenericInput({
  field,
  type = null,
  data,
  setData,
  hasPlaceholder = true,
  ...props
}) {
  return (
    <input
      {...props}
      type={type || "text"}
      placeholder={hasPlaceholder ? capitalize(startCase(field)) : ""}
      value={data[field] || ""}
      onChange={(event) => setData({...data, [field]: event.target.value})}
    />
  )
}