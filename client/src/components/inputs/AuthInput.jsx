import React from "react"
import {capitalize, startCase} from "lodash"
import authClasses from "../../styles/pages/AuthPage.module.css"

export default function AuthInput({
  field,
  type = null,
  credentials,
  setCredentials,
}) {
  return (
    <input
      type={type || "text"}
      placeholder={capitalize(startCase(field))}
      value={credentials[field] || ""}
      onChange={(event) =>
        setCredentials({...credentials, [field]: event.target.value})
      }
    />
  )
}