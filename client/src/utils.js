import {capitalize} from "lodash"

// Utils
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })
}

export function xyToAN({x, y}) {
  return String.fromCharCode(97 + x) + (8 - y).toString()
}

export function anToXY(an) {
  if (an === "-") return null
  return {x: an.charCodeAt(0) - 97, y: Number(8 - an[1])}
}

export function filterObject(object, keyValueCallback) {
  return Object.fromEntries(Object.entries(object).filter(keyValueCallback))
}

export function hmsToSeconds(str) {
  const hms = str.split(":")
  return Number(hms[0]) * 60 * 60 + Number(hms[1]) * 60 + Number(hms[2])
}

export function parseError(error) {
  if (error.detail) return error.detail

  const lines = []
  for (const [key, value] of Object.entries(error)) {
    lines.push(capitalize(key) + ": " + value[0]);
  }
  return lines.join("\n")
}