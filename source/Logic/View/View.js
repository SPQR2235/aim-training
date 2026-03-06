export function showMessage(text, duration = 3000) {
  const msg = document.createElement("div")

  msg.classList.add("message")
  msg.textContent = text

  document.body.append(msg)

  setTimeout(() => msg.remove(), duration)
}