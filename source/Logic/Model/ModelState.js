import { gameMode } from './Mode.js'

export const MAX_TARGETS = 5

export const game = {
  started: false,
  targets: 3,
  difficulty: 0,
  currentMode: gameMode.Shoot,
  randomColorActive: false,
  soundsActive: true,
  statsChanged: false
}

export const metrics = {
  time: 0,
  formattedTime: `00:00`,
  clicksThisSeccond: 0,
  cps: 0
}

export const stats = {
  hits: 0,
  misses: 0,
  accuracy: 0,
}

export const device = {
  mobile: window.matchMedia("(max-width: 768px)"),
  hasMouse: window.matchMedia("(pointer: fine)").matches
}

export const activeTargets = []