import { gameData, stats, metrics} from './ModelState.js'

let metricInterval

export function startMetricSystem() {
  if (metricInterval) return

  metricInterval = setInterval(() => {
    metrics.time++
    metrics.formattedTime = formatTime(metrics.time)
    metrics.cps = metrics.clicksThisSeccond
    metrics.clicksThisSeccond = 0
    gameData.statsChanged = true
  }, 1000)
}

export function stopMetricSystem() {
  clearInterval(metricInterval)
  metricInterval = null
  gameData.started = false
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

export function registerHit() {
  stats.hits++
  metrics.clicksThisSeccond++
  stats.accuracy = calcAccuracy()
  gameData.statsChanged = true
}

export function registerMiss() {
  stats.misses++
  stats.accuracy = calcAccuracy()
  gameData.statsChanged = true
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