import {BLACK, EMPTY_PIECE, WHITE} from "./consts/game"

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

export function RangeArray(n) {
  return [...Array(n).keys()]
}

export function setCharAt(str, char, index) {
  return str.substr(0, index) + char + str.substr(index + 1)
}

// TODO extract game logic
export function squareIsBlack(index) {
  return (((index / 8) >> 0) + (index % 8)) % 2
}
export function turnIsCorrect(turn, piece) {
  if (
    piece === EMPTY_PIECE ||
    (turn === WHITE && piece !== piece.toUpperCase()) ||
    (turn === BLACK && piece !== piece.toLowerCase())
  )
    return false
  return true
}
export function nextTurn(turn) {
  return turn === WHITE ? BLACK : WHITE
}