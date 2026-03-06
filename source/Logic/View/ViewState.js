export const poolSize = {
  lines: 5,
  targets: 35
}

export const DOM = {
  root: document.documentElement,
  time: document.getElementById("time"),
  cps: document.getElementById("cps"),
  hits: document.getElementById("hits"),
  misses: document.getElementById("misses"),
  accuracy: document.getElementById("accuracy"),
  targetWrap: document.getElementById("target-wrap"),
  targetContainer: document.getElementById("container"),
  randomColorButton: document.getElementById("random-color-button"),
  modeButton: document.getElementById("mode-button"),
  targetsButton: document.getElementById("targets-button"),
  soundButton: document.getElementById("sound-button"),
  themeButton: document.getElementById("theme-button"),
  difficultyButton: document.getElementById("difficulty-button"),
}

export const targets = []

export const theme = { current: 0 }

export const themes = Object.freeze([
  { 
    name: "Dark",
    color: "rgb(175, 175, 175)", 
    circle: "rgb(200, 200, 200)", 
    targetWrapBackground: "rgb(75, 75, 75)", 
    nonPlayingAreaBackground: "rgb(35, 35, 35)", 
    buttonBorderAndShadow: "rgb(75, 75, 75)",
    buttonBackground: "rgb(50, 50, 50)"
  },
  { 
    name: "Light",
    color: "rgb(225, 225, 225)", 
    circle: "rgb(250, 250, 250)", 
    targetWrapBackground: "rgb(150, 150, 150)",
    nonPlayingAreaBackground: "rgb(100, 100, 100)", 
    buttonBorderAndShadow: "rgb(255, 255, 255)",
    buttonBackground: "rgb(125, 125, 125)"
  },
  { 
    name: "Yellow",
    color: "rgb(225, 225, 0)",
    circle: "rgb(250, 250, 25)", 
    targetWrapBackground: "rgb(150, 150, 75)",
    nonPlayingAreaBackground: "rgb(100, 100, 0)",
    buttonBorderAndShadow: "rgb(175, 175, 0)",
    buttonBackground: "rgb(125, 125, 0)"
  },
  { 
    name: "Green",
    color: "rgb(50, 225, 50)", 
    circle: "rgb(75, 250, 75)", 
    targetWrapBackground: "rgb(75, 150, 75)", 
    nonPlayingAreaBackground: "rgb(25, 100, 25)",
    buttonBorderAndShadow: "rgb(0, 200, 0)",
    buttonBackground: "rgb(0, 125, 0)"
  },
  { 
    name: "Cyan",
    color: "rgb(0, 225, 225)", 
    circle: "rgb(25, 250, 250)", 
    targetWrapBackground: "rgb(75, 150, 150)", 
    nonPlayingAreaBackground: "rgb(0, 150, 125)",
    buttonBorderAndShadow: "rgb(0, 255, 225)",
    buttonBackground: "rgb(0, 175, 150)"
  },
  { 
    name: "Blue",
    color: "rgb(0, 75, 225)", 
    circle: "rgb(25, 100, 250)", 
    targetWrapBackground: "rgb(50, 75, 150)", 
    nonPlayingAreaBackground: "rgb(25, 50, 150)",
    buttonBorderAndShadow: "rgb(0, 60, 255)",
    buttonBackground: "rgb(25, 75, 175)"
  },
  { 
    name: "Purple",
    color: "rgb(144, 0, 255)", 
    circle: "rgb(175, 125, 255)", 
    targetWrapBackground: "rgb(98, 56, 132)", 
    nonPlayingAreaBackground: "rgb(65, 0, 115)", 
    buttonBorderAndShadow: "rgb(144, 0, 255)",
    buttonBackground: "rgb(103, 0, 183)"
  },
  { 
    name: "Red", 
    color: "rgb(255, 0, 0)", 
    circle: "rgb(255, 125, 125)", 
    targetWrapBackground: "rgb(109, 57, 57)", 
    nonPlayingAreaBackground: "rgb(103, 0, 0)", 
    buttonBorderAndShadow: "rgb(255, 0, 0)",
    buttonBackground: "rgb(174, 0, 0)"
  }
])

export const difficulty = Object.freeze({
  names: ["Easy", "Normal", "Hard", "Extreme"], 
  values: [
  "scale(1)",
  "scale(0.9)",
  "scale(0.75)",
  "scale(0.55)"
  ]
})

export const sounds = {
  sound1: document.getElementById("sound1"),
  sound2: document.getElementById("sound2")
}

export const ActiveOrNot = Object.freeze({
  On: true,
  Off: false,
})