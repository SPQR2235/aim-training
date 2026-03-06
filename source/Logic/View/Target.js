import * as ViewState from './ViewState.js'

export function createTargetsPool(lines, targets) {
    let totalTargets = 1
    for (let i = 0; i < lines; i++) {
        const line = createLine()
        for (let j = 0; j < targets / lines; j++) {
            const target = createTarget(totalTargets)
            ViewState.targets.push(target)
            line.appendChild(target)
            totalTargets++
        }
    }
}

export function setPoolSize(isDeviceMobile) {
    ViewState.poolSize.targets = isDeviceMobile ? 20 : 35
}


function createLine() {
    let line = document.createElement("div")
    line.classList.add("line")
    ViewState.DOM.targetContainer.appendChild(line)
    return line
}

function createTarget(totalTargets) {
    let target = document.createElement("div")
    target.id = `target${totalTargets}`
    target.classList.add("target")
    return target
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