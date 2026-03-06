import { gameData, activeTargets, stats, device, metrics} from './ModelState.js'
import { gameMode } from './Mode.js'

export function changeRandomColorFlag() {
  gameData.randomColorActive = !gameData.randomColorActive
}

export function changeSoundsFlag() {
  gameData.soundsActive = !gameData.soundsActive
}

export function resetRenderHUDFlag() {
  gameData.statsChanged = false
}

export function currentDifficulty() {
  return gameData.difficulty
}

export function howManyTargetsActive() {
  return gameData.targets
}

export function allGameModes() {
  return gameMode
}

export function shouldRenderHUD() {
  return gameData.statsChanged
}

export function isTrackMode() {
  return gameData.currentMode === gameMode.Track
}

export function currentMode() {
  return gameData.currentMode
}

export function isRandomColorActive() {
  return gameData.randomColorActive
}

export function isSoundsActive() {
  return gameData.soundsActive
}

export function isDeviceHasMouse() {
  return device.hasMouse
}


export function isDeviceMobile() {
  return device.mobile
}

export function isGameStarted() {
  return gameData.started
}

export function takeAllActiveTargets() {
  return [...activeTargets]
}

export function takeStateForRenderHUD() {
  return {
    stats: { ...stats },
    metrics: { ...metrics },
    isTrackMode: isTrackMode()
  }
}