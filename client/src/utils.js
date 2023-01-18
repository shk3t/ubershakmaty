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