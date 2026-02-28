export const DOM = {
  root: document.documentElement,
  time: document.getElementById("time"),
  cps: document.getElementById("cps"),
  hits: document.getElementById("hits"),
  misses: document.getElementById("misses"),
  accuracy: document.getElementById("accuracy"),
  targetWrap: document.getElementById("target-wrap"),
  randomColorButton: document.getElementById("random-color-button"),
  modeButton: document.getElementById("mode-button"),
  targetsButton: document.getElementById("targets-button"),
  soundButton: document.getElementById("sound-button"),
  themeButton: document.getElementById("theme-button"),
  difficultyButton: document.getElementById("difficulty-button"),
  targets: document.querySelectorAll(".target")
}

export const theme = { current: 0 }

export const themes = Object.freeze([
  { 
    name: "Dark",
    color: "rgb(170, 170, 170)", 
    circle: "rgb(195, 195, 195)", 
    targetWrapBackground: "rgb(85, 85, 85)", 
    nonPlayingAreaBackground: "rgb(34, 34, 34)", 
    buttonBorderAndShadow: "rgb(75, 75, 75)",
    buttonBackground: "rgb(57, 57, 57)"
  },
  { 
    name: "Light",
    color: "rgb(255, 255, 255)", 
    circle: "rgb(200, 200, 200)", 
    targetWrapBackground: "rgb(165, 165, 165)",
    nonPlayingAreaBackground: "rgb(111, 111, 111)", 
    buttonBorderAndShadow: "rgb(255, 255, 255)",
    buttonBackground: "rgb(161, 161, 161)"
  },
  { 
    name: "Yellow",
    color: "rgb(255, 230, 0)",
    circle: "rgb(255, 255, 175)", 
    targetWrapBackground: "rgb(147, 146, 91)",
    nonPlayingAreaBackground: "rgb(93, 91, 0)",
    buttonBorderAndShadow: "rgb(175, 175, 0)",
    buttonBackground: "rgb(118, 118, 0)"
  },
  { 
    name: "Green" ,
    color: "rgb(50, 255, 50)", 
    circle: "rgb(170, 255, 170)", 
    targetWrapBackground: "rgb(97, 143, 85)", 
    nonPlayingAreaBackground: "rgb(3, 81, 0)",
    buttonBorderAndShadow: "rgb(0, 149, 0)",
    buttonBackground: "rgb(0, 115, 0)"
  },
  { 
    name: "Cyan",
    color: "rgb(0, 255, 221)", 
    circle: "rgb(200, 255, 255)", 
    targetWrapBackground: "rgb(82, 133, 131)", 
    nonPlayingAreaBackground: "rgb(0, 144, 125)",
    buttonBorderAndShadow: "rgb(0, 255, 221)",
    buttonBackground: "rgb(0, 156, 127)"
  },
  { 
    name: "Blue",
    color: "rgb(0, 60, 255)", 
    circle: "rgb(80, 115, 250)", 
    targetWrapBackground: "rgb(49, 68, 120)", 
    nonPlayingAreaBackground: "rgb(17, 61, 156)",
    buttonBorderAndShadow: "rgb(0, 60, 255)",
    buttonBackground: "rgb(0, 42, 180)"
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