import * as ViewState from './ViewState.js'
import { getRandomColor } from '../Lib/random.js'
import { gameRender } from './RenderMode.js'

const rootStyle = ViewState.DOM.root.style

export function renderHUD(state) {
  ViewState.DOM.hits.textContent = `Hits: ${state.stats.hits}`
  ViewState.DOM.time.textContent = `Time: ${state.metrics.formattedTime}`
  ViewState.DOM.cps.textContent = `CPS: ${state.metrics.cps}`
  if (state.isTrackMode) {
    ViewState.DOM.root.style.setProperty("--trackModeHiddenStat", `none`)
    return
  }
  ViewState.DOM.root.style.setProperty("--trackModeHiddenStat", `flex`)

  ViewState.DOM.misses.textContent = `Misses: ${state.stats.misses}`
  ViewState.DOM.accuracy.textContent = `Accuracy: ${state.stats.accuracy}%`
}

export function renderButton(button, value) {
  button.textContent = value
}

export function renderGAME(mode, target, difficulty) {
  switch (mode) {
    case gameRender.ChangeTheme:
      applyTheme(ViewState.themes[ViewState.theme.current])
      break
    case gameRender.ChangeDifficulty:
      applyDifficulty(difficulty)
      break
    case gameRender.GlobalApplyRandomColor:
      applyRandomColorToAll()
      break
    case gameRender.ApplyRandomColor:
      applyRandomColor(target)
      break
    case gameRender.ResetColor:
      resetColor()
      break
  }
}

export function activateTargets(targets) {
  targets.forEach(activateTarget)
}

export function activateTarget(id) {
  document.getElementById(`target${id}`)?.classList.add("active")
}

export function deactivateTarget(id) {
  document.getElementById(`target${id}`)?.classList.remove("active")
}

export function playSound(soundsActive, sound) {
  if (soundsActive) {
    sound.currentTime = 0
    sound.play()
  }
}

function applyTheme(currentTheme) {
  rootStyle.setProperty("--targetWrapBackground", currentTheme.targetWrapBackground)
  rootStyle.setProperty("--targetColor", currentTheme.color)
  rootStyle.setProperty("--targetCircleColor", currentTheme.circle)
  rootStyle.setProperty("--nonPlayingAreaBackground", currentTheme.nonPlayingAreaBackground)
  rootStyle.setProperty("--buttonBorder", "3px solid " + currentTheme.buttonBorderAndShadow)
  rootStyle.setProperty("--buttonShadow", currentTheme.buttonBorderAndShadow)
  rootStyle.setProperty("--buttonBackground", currentTheme.buttonBackground)
}

function applyDifficulty(difficulty) {
  ViewState.DOM.root.style.setProperty(
    "--scaleBasedOnDifficulty",
    ViewState.difficulty.values[difficulty]
  )
}

function applyRandomColorToAll() {
  ViewState.DOM.targets.forEach((globalTarget) => {
    applyRandomColor(globalTarget)
  })
}

function applyRandomColor(target) {
  if (!target) return
  const color = getRandomColor(true, 25)
  target.style.boxShadow = `0px 0px 24px 2px ${color.base}, inset 0px 0px 24px 2px ${color.base}`
  target.style.backgroundColor = color.base
  target.firstElementChild.style.borderColor = color.lighter
}

function resetColor() {
  ViewState.DOM.targets.forEach((t) => {
    t.style.boxShadow = `0px 0px 24px 2px var(--targetColor)`
    t.style.backgroundColor = `var(--targetColor)`
    t.firstElementChild.style.borderColor = `var(--targetCircleColor)`
  })
}