export function playSound(soundsActive, sound) {
  if (soundsActive) {
    sound.currentTime = 0
    sound.play()
  }
}