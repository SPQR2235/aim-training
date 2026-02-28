import * as ViewState from './View/ViewState.js'
import * as Model from './Model/Model.js'
import * as View from './View/View.js'
import { gameRender } from './View/RenderMode.js'

function gameLoop() {
  if (Model.shouldRenderHUD()) {
    View.renderHUD(Model.takeStateForRenderHUD())
    Model.resetRenderHUDFlag()
  }
  requestAnimationFrame(gameLoop)
}

document.addEventListener("DOMContentLoaded", () => {
  Model.spawnTargets()
  View.activateTargets(Model.takeAllActiveTargets())

  requestAnimationFrame(gameLoop)

  ViewState.DOM.targets.forEach((target) => {
    target.addEventListener("click", handleInteraction)
    target.addEventListener("mouseenter", handleInteraction)
  })

  ViewState.DOM.targetWrap.addEventListener("click", (e) => {
    if (Model.isTrackMode) return
    if (e.target.closest(".target")) return
    Model.registerMiss()
  })

  ViewState.DOM.randomColorButton.addEventListener("click", () => {
    Model.changeRandomColorFlag()
    View.renderButton(ViewState.DOM.randomColorButton, `Random Color: ${getKeyByValue(ViewState.ActiveOrNot, Model.isRandomColorActive())}`)
    View.playSound(Model.isSoundsActive(), ViewState.sounds.sound2)

    if (Model.isRandomColorActive()) {
      View.renderGAME(gameRender.GlobalApplyRandomColor)
      return
    }
    View.renderGAME(gameRender.ResetColor)
  })

  ViewState.DOM.modeButton.addEventListener("click", () => {
    if (!Model.isDeviceHasMouse()) {
      alert("❌ Unavailable on current device\nThis mode requires mouse input.")
      return
    }
    Model.stopMetricSystem()
    Model.resetStats()
    Model.changeGameMode()
    Model.resetRenderHUDFlag()
    View.renderButton(ViewState.DOM.modeButton, `Mode: ${getKeyByValue(Model.allGameModes(), Model.currentMode())}`)
    View.playSound(Model.isSoundsActive(), ViewState.sounds.sound2)
  })

  ViewState.DOM.targetsButton.addEventListener("click", () => {
    const { removedTargets, addedTarget } = Model.increaseTargets()
    removedTargets.forEach(id => View.deactivateTarget(id))
    if (addedTarget) View.activateTarget(addedTarget)

    View.renderButton(ViewState.DOM.targetsButton, `Targets: ${Model.howManyTargetsActive()}`)
    View.playSound(Model.isSoundsActive(), ViewState.sounds.sound2)
  })

  ViewState.DOM.difficultyButton.addEventListener("click", () => {
    Model.increaseDifficulty()

    View.playSound(Model.isSoundsActive(), ViewState.sounds.sound2)
    View.renderButton(ViewState.DOM.difficultyButton, `Difficulty: ${ViewState.difficulty.names[Model.whatADifficulty()]}`)
    View.renderGAME(gameRender.ChangeDifficulty, null, Model.whatADifficulty())
  })

  ViewState.DOM.themeButton.addEventListener("click", () => {
    ViewState.theme.current++
    if (ViewState.theme.current > ViewState.themes.length - 1) {
      ViewState.theme.current = 0
    }
    View.playSound(Model.isSoundsActive(), ViewState.sounds.sound2)
    View.renderButton(ViewState.DOM.themeButton, `Theme: ${ViewState.themes[ViewState.theme.current].name}`)
    View.renderGAME(gameRender.ChangeTheme)
  })

  ViewState.DOM.soundButton.addEventListener("click", () => {
    Model.changeSoundsFlag()
    View.renderButton(ViewState.DOM.soundButton, `Sounds: ${getKeyByValue(ViewState.ActiveOrNot, Model.isSoundsActive())}`)
    View.playSound(Model.isSoundsActive(), ViewState.sounds.sound2)
  })
})

export function getIdNumber(element) {
  return parseInt(element.id.match(/\d+/)[0]);
}

export function getKeyByValue(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value)
}

function handleInteraction(e) {
  if (!Model.isGameStarted()) {
    Model.startMetricSystem()
    Model.startGame()
  }

  const target = e.currentTarget;

  if (
    (!Model.isTrackMode() && e.type !== "click") ||
    (Model.isTrackMode() && e.type !== "mouseenter")
  ) return;

  if (!target.classList.contains("active")) return;

  View.playSound(Model.isSoundsActive(), ViewState.sounds.sound1)
  Model.registerHit()
  target.classList.remove("active")
  View.activateTarget(Model.respawnTarget(getIdNumber(target)))
  if (Model.isRandomColorActive()) {
    View.renderGAME(gameRender.ApplyRandomColor, target)
  }
}