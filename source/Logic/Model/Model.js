import { game, activeTargets, stats, device, metrics, MAX_TARGETS } from './ModelState.js'
import { gameMode } from './Mode.js'
import { random } from '../Lib/random.js'

let metricInterval

export function registerHit() {
  stats.hits++
  metrics.clicksThisSeccond++
  stats.accuracy = calcAccuracy()
  game.statsChanged = true
}

export function registerMiss() {
  stats.misses++
  stats.accuracy = calcAccuracy()
  game.statsChanged = true
}

export function startMetricSystem() {
  if (metricInterval) return

  metricInterval = setInterval(() => {
    metrics.time++
    metrics.formattedTime = formatTime(metrics.time)
    metrics.cps = metrics.clicksThisSeccond
    metrics.clicksThisSeccond = 0
    game.statsChanged = true
  }, 1000)
}

export function stopMetricSystem() {
  clearInterval(metricInterval)
  metricInterval = null
  game.started = false
}

export function resetStats() {
  metrics.time = 0
  metrics.formattedTime = `00:00`
  metrics.clicksThisSeccond = 0
  metrics.cps = 0
  stats.hits = 0
  stats.misses = 0
  stats.accuracy = 0
}

export function spawnTargets() {
  for (let i = 0; i < game.targets; i++) {
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

export function isTrackMode() {
  return game.currentMode === gameMode.Track
}

export function currentMode() {
  return game.currentMode
}

export function isRandomColorActive() {
  return game.randomColorActive
}

export function isSoundsActive() {
  return game.soundsActive
}

export function isDeviceHasMouse() {
  return device.hasMouse
}

export function isGameStarted() {
  return game.started
}

export function startGame() {
  game.started = true
}

export function allGameModes() {
  return gameMode
}

export function changeGameMode() {
  game.currentMode = isTrackMode() ? gameMode.Shoot : gameMode.Track
}

export function increaseDifficulty() {
  game.difficulty++
  if (game.difficulty > 3) game.difficulty = 0
}

export function whatADifficulty() {
  return game.difficulty
}

export function increaseTargets() {
  game.targets++

  if (game.targets > MAX_TARGETS) {
    const removed = activeTargets.slice(1)
    activeTargets.length = 1
    game.targets = 1
    return { removedTargets: removed, addedTarget: null }
  } else {
    const newTarget = spawnNewTarget()
    return { removedTargets: [], addedTarget: newTarget }
  }
}

export function howManyTargetsActive() {
  return game.targets
}

export function changeRandomColorFlag() {
  game.randomColorActive = !game.randomColorActive
}

export function changeSoundsFlag() {
  game.soundsActive = !game.soundsActive
}

export function takeStateForRenderHUD() {
  return {
    stats: { ...stats },
    metrics: { ...metrics },
    isTrackMode: isTrackMode()
  }
}

export function shouldRenderHUD() {
  return game.statsChanged
}

export function resetRenderHUDFlag() {
  game.statsChanged = false
}

export function takeAllActiveTargets() {
  return [...activeTargets]
}

function calcAccuracy() {
  const total = stats.hits + stats.misses
  if (total === 0) return 0
  return ((stats.hits / total) * 100).toFixed(2)
}

function formatTime(sec) {
  if (sec === 0) return `00:00`
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export function contains(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

function replace(arr, oldValue, newValue) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === oldValue) {
      arr[i] = newValue;
    }
  }
}

function findFreePosition() {
  const max = device.mobile.matches ? 21 : 36
  let position
  do {
    position = random(1, max)
  } while (contains(activeTargets, position))
  return position
}