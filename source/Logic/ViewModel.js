import * as View from './View/View.js'
import * as Sound from './View/Sound.js'
import * as Target from './View/Target.js'
import * as ViewState from './View/ViewState.js'
import { gameRender } from './View/RenderMode.js'
import { renderHUD, renderGAME, renderButton } from './View/Render.js'

import * as Game from './Model/Game.js'
import * as DataManager from './Model/DataManager.js'
import { registerMiss, registerHit } from './Model/Metric.js'

function gameLoop() {
  if (DataManager.shouldRenderHUD()) {
    renderHUD(DataManager.takeStateForRenderHUD())
    DataManager.resetRenderHUDFlag()
  }
  requestAnimationFrame(gameLoop)
} 

document.addEventListener("DOMContentLoaded", () => {
  Target.setPoolSize(DataManager.isDeviceMobile())
  Target.createTargetsPool(ViewState.poolSize.lines, ViewState.poolSize.targets)
  Game.spawnTargets(DataManager.isDeviceMobile())
  Target.activateTargets(DataManager.takeAllActiveTargets())
  renderGAME(gameRender.LoadTheme)

  requestAnimationFrame(gameLoop)

  ViewState.targets.forEach((target) => {
    target.addEventListener("click", handleInteraction)
    target.addEventListener("mouseenter", handleInteraction)
  })

  ViewState.DOM.targetWrap.addEventListener("click", (e) => {
    if (DataManager.isTrackMode()) return
    Game.startGame()
    if (e.target.closest(".target")) return
    registerMiss()
  })

  ViewState.DOM.randomColorButton.addEventListener("click", () => {
    DataManager.changeRandomColorFlag()
    renderButton(ViewState.DOM.randomColorButton, `Random Color: ${getKeyByValue(ViewState.ActiveOrNot, DataManager.isRandomColorActive())}`)
    Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound2)

    if (DataManager.isRandomColorActive()) {
      renderGAME(gameRender.GlobalApplyRandomColor)
      return
    }
    renderGAME(gameRender.ResetColor)
  })

  ViewState.DOM.modeButton.addEventListener("click", () => {
    if (!DataManager.isDeviceHasMouse()) {
      View.showMessage("❌ Unavailable on current device\nThis mode requires mouse input.")
      return
    }
    const changeMode = true
    Game.stopGame(changeMode)
    renderButton(ViewState.DOM.modeButton, `Mode: ${getKeyByValue(DataManager.allGameModes(), DataManager.currentMode())}`)
    Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound2)
  })

  ViewState.DOM.targetsButton.addEventListener("click", () => {
    const { removedTargets, addedTarget } = Game.increaseTargets()
    removedTargets.forEach(id => Target.deactivateTarget(id))
    if (addedTarget) Target.activateTarget(addedTarget)

    renderButton(ViewState.DOM.targetsButton, `Targets: ${DataManager.howManyTargetsActive()}`)
    Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound2)
  })

  ViewState.DOM.difficultyButton.addEventListener("click", () => {
    Game.increaseDifficulty()

    Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound2)
    renderButton(ViewState.DOM.difficultyButton, `Difficulty: ${ViewState.difficulty.names[DataManager.currentDifficulty()]}`)
    renderGAME(gameRender.ChangeDifficulty, null, DataManager.currentDifficulty())
  })

  ViewState.DOM.themeButton.addEventListener("click", () => {
    ViewState.theme.current++
    if (ViewState.theme.current > ViewState.themes.length - 1) {
      ViewState.theme.current = 0
    }
    Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound2)
    renderButton(ViewState.DOM.themeButton, `Theme: ${ViewState.themes[ViewState.theme.current].name}`)
    renderGAME(gameRender.ChangeTheme)
  })

  ViewState.DOM.soundButton.addEventListener("click", () => {
    DataManager.changeSoundsFlag()
    renderButton(ViewState.DOM.soundButton, `Sounds: ${getKeyByValue(ViewState.ActiveOrNot, DataManager.isSoundsActive())}`)
    Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound2)
  })
})

export function getIdNumber(element) {
  return parseInt(element.id.match(/\d+/)[0]);
}

export function getKeyByValue(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value)
}

function handleInteraction(e) {
  Game.startGame()

  const target = e.currentTarget;

  if (
    (!DataManager.isTrackMode() && e.type !== "click") ||
    (DataManager.isTrackMode() && e.type !== "mouseenter")
  ) return;

  if (!target.classList.contains("active")) return;

  Sound.playSound(DataManager.isSoundsActive(), ViewState.sounds.sound1)
  registerHit()
  target.classList.remove("active")
  Target.activateTarget(Game.respawnTarget(getIdNumber(target)))
  if (DataManager.isRandomColorActive()) {
    renderGAME(gameRender.ApplyRandomColor, target)
  }
}