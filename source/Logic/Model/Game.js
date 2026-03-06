import { gameData, activeTargets, MAX_TARGETS } from './ModelState.js'

import { random } from '../Lib/random.js'
import { startMetricSystem, stopMetricSystem, resetStats } from './Metric.js'
import { isGameStarted, isTrackMode, resetRenderHUDFlag, isDeviceMobile } from './DataManager.js'
import { gameMode } from './Mode.js'

export function startGame() {
  if (!isGameStarted()) {
    startMetricSystem()
    gameData.started = true
  }
}

export function stopGame(changeMode) {
  if (isGameStarted()) {
    stopMetricSystem()
    gameData.started = false
  }
  else if (changeMode) {
    resetStats()
    changeGameMode()
    resetRenderHUDFlag()
  }
}

export function spawnTargets() {
  for (let i = 0; i < gameData.targets; i++) {
    spawnNewTarget()
  }
}

export function spawnNewTarget() {
  let position = findFreePosition()
  activeTargets.push(position)
  return position
}

export function respawnTarget(oldTarget) {
  const position = findFreePosition()
  replace(activeTargets, oldTarget, position)
  return position
}

export function changeGameMode() {
  gameData.currentMode = isTrackMode() ? gameMode.Shoot : gameMode.Track
}

export function increaseTargets() {
  gameData.targets++

  if (gameData.targets > MAX_TARGETS) {
    const removed = activeTargets.slice(1)
    activeTargets.length = 1
    gameData.targets = 1
    return { removedTargets: removed, addedTarget: null }
  } else {
    const newTarget = spawnNewTarget()
    return { removedTargets: [], addedTarget: newTarget }
  }
}

export function increaseDifficulty() {
  gameData.difficulty++
  if (gameData.difficulty > 3) gameData.difficulty = 0
}

function findFreePosition() {
  const max = isDeviceMobile() ? 21 : 36
  let position
  do {
    position = random(1, max)
  } while (contains(activeTargets, position))
  return position
}

function replace(arr, oldValue, newValue) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === oldValue) {
      arr[i] = newValue;
    }
  }
}

function contains(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}