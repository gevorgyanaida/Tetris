const container = document.getElementById('container')
let h2ForScore = document.getElementById('score')
let score = 0
let rowCount = 15
let colCount = 10
let timerId
let startBtn = document.getElementById('start')
let stopBtn = document.getElementById('stop')
let resetBtn = document.getElementById('reset')
let forGameOver = document.getElementById('gameOver')
let current
let res = []

function addScore(){
    score += 1
    h2ForScore.innerHTML = score
}

let drawL = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    result.forEach(el => el.classList.add('active'))
    return result
}

let drawLine = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 3}"]`))[j])
    result.forEach(el => el.classList.add('active'))
    return result
}

let drawZ = function(i, j ){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    result.forEach(el => el.classList.add('active'))
    return result
}

let drawS = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    result.forEach(el => el.classList.add('active'))
    return result
}

let drawT = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.forEach(el => el.classList.add('active'))
    return result
}

let drawO = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.forEach(el => el.classList.add('active'))
    return result
}

let drawMirroredL = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(activeEls.length){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
    }
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    result.forEach(el => el.classList.add('active'))
    return result
}

let items = [drawL, drawLine, drawZ, drawS, drawT, drawO, drawMirroredL]

function drawBoard(){
    for(let i = 0; i < rowCount; i++){
        for(let j = 0; j < colCount; j++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.i = i
            cell.dataset.j = j
            container.append(cell) 
        }
    }
    res = [0, 4]
    let randomNumber = Math.floor(Math.random() * 7)
    current = items[randomNumber]
    current(...res)
}

drawBoard()

resetBtn.addEventListener("click", resetGame)

function resetGame(){
    clearInterval(timerId)
    score = 0
    h2ForScore.innerHTML = score
    window.removeEventListener('keydown', move)
    forGameOver.style.visibility = "hidden"
    let finishedEls = Array.from(document.getElementsByClassName('finished'))
    finishedEls.forEach(el => el.classList.remove('finished'))
    let randomNumber = Math.floor(Math.random() * 7)
    current = items[randomNumber]
    res = [0, 4]
    current(...res)
}

startBtn.addEventListener("click", function(){
    clearInterval(timerId)
    timerId = setInterval(moveDown, 1000)
    window.addEventListener('keydown', move)
})

stopBtn.addEventListener("click", function(){
    clearInterval(timerId)
    window.removeEventListener('keydown', move)
})

function move(e){
    if (e.key === 'ArrowDown') {
        moveDown()
    } else if(e.key === 'ArrowLeft'){
        moveLeft()
    } else if (e.key === 'ArrowRight'){
        moveRight()
    } else if(e.key === 'ArrowUp'){
        rotate()
    }
}
 
function moveLeft(){
    const activeEls = Array.from(document.getElementsByClassName('active')).sort((a, b) => a.dataset.j - b.dataset.j)
    if(activeEls.every(activeEl => +activeEl.dataset.j !== 0)){
        let check = activeEls.every(function(activeEl){
            const nextEl = document.querySelectorAll(`div[data-j="${+activeEl.dataset.j - 1}"]`)[+activeEl.dataset.i]
            if(!(nextEl.classList.contains("finished"))){
                return true
            } else {
                return false
            }
        })
        if(check){
            activeEls.forEach(function(activeEl){
                const nextEl = document.querySelectorAll(`div[data-j="${+activeEl.dataset.j - 1}"]`)[+activeEl.dataset.i]
                if(!(nextEl.classList.contains("finished")) && !(nextEl.classList.contains("active"))){
                    activeEl.classList.remove('active')
                    nextEl.classList.add('active')
                }
            })
            if(res[1] !== 0){
                let newJ = res.pop() - 1
                res.push(newJ)
            }
        }
    }
}

function moveRight(){
    const activeEls = Array.from(document.getElementsByClassName('active')).sort((a, b) => b.dataset.j - a.dataset.j)
    if(activeEls.every(activeEl => +activeEl.dataset.j !== (colCount - 1))){
        let check = activeEls.every(function(activeEl){
            const nextEl = document.querySelectorAll(`div[data-j="${+activeEl.dataset.j + 1}"]`)[+activeEl.dataset.i]
            if(!(nextEl.classList.contains("finished"))){
                return true
            } else {
                return false
            }
        })
        if(check){
            activeEls.forEach(function(activeEl){
                const nextEl = document.querySelectorAll(`div[data-j="${+activeEl.dataset.j + 1}"]`)[+activeEl.dataset.i]
                if(!(nextEl.classList.contains("finished")) && !(nextEl.classList.contains("active"))){
                    activeEl.classList.remove('active')
                    nextEl.classList.add('active')
                }
            })
            if(res[1] !== (colCount - 1)){
                let newJ = res.pop() + 1
                res.push(newJ)
            }
        }
    }
}

function moveDown(){
    let activeEls = Array.from(document.getElementsByClassName('active'))
     if(activeEls.some(activeEl => +activeEl.dataset.i === (rowCount - 1))){
        activeEls.forEach(activeEl => {
            activeEl.classList.remove('active')
            activeEl.classList.add('finished')
        })
         for(let k = 1; k < rowCount; k++){
            let elementsOfKRow = Array.from(document.querySelectorAll(`div[data-i="${k}"]`))
            if(elementsOfKRow.every(el => el.classList.contains('finished'))){
                elementsOfKRow.forEach(el => el.classList.remove('finished'))
                let upperFinEls = Array.from(document.getElementsByClassName('finished')).filter(el => el.dataset.i < k)
                let newFinishedEls = []
                upperFinEls.forEach(function(el){
                    el.classList.remove('finished')
                    let newEl = document.querySelectorAll(`div[data-i="${+el.dataset.i + 1}"]`)[+el.dataset.j]
                    newFinishedEls.push(newEl)
                })
                score += 100
                newFinishedEls.forEach(el => el.classList.add('finished'))
            }
        }
        res = [0, 4]
        let randomNumber = Math.floor(Math.random() * 7)
        current = items[randomNumber]
        current(...res)
     } else {
        if(activeEls.some(function(activeEl){
            let nextEl = document.querySelectorAll(`div[data-i="${+activeEl.dataset.i + 1}"]`)[+activeEl.dataset.j]
            return nextEl.classList.contains('finished')
        })){
            activeEls.forEach(activeEl => {
                activeEl.classList.add('finished')
                activeEl.classList.remove('active')
            })
            for(let k = 1; k < rowCount; k++){
                let elementsOfKRow = Array.from(document.querySelectorAll(`div[data-i="${k}"]`))
                if(elementsOfKRow.every(el => el.classList.contains('finished'))){
                    elementsOfKRow.forEach(el => el.classList.remove('finished'))
                    let upperFinEls = Array.from(document.getElementsByClassName('finished')).filter(el => el.dataset.i < k)
                    let newFinishedEls = []
                    upperFinEls.forEach(function(el){
                        el.classList.remove('finished')
                        let newEl = document.querySelectorAll(`div[data-i="${+el.dataset.i + 1}"]`)[+el.dataset.j]
                        newFinishedEls.push(newEl)
                    })
                    score += 100
                    newFinishedEls.forEach(el => el.classList.add('finished'))
                }
            }
            res = [0, 4]
            let randomNumber = Math.floor(Math.random() * 7)
            current = items[randomNumber]
            current(...res)
         } else {
            activeEls.forEach(activeEl => activeEl.classList.remove('active'))
            let newI = res.shift() + 1
            res.unshift(newI)
            current(...res)
            addScore()
        }
    }
    const firstRow = Array.from(document.querySelectorAll(`div[data-i="0"]`))
    firstRow.forEach(function(el){
         if(el.classList.contains('finished')){
            clearInterval(timerId)
            window.removeEventListener('keydown', move)
            forGameOver.style.visibility = "visible"
            let activeEls = Array.from(document.getElementsByClassName('active'))
            activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        }
    })
} 

let rotateL1 = function(i, j){
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if(document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 1].classList.contains('finished') || document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 2].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateL2 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateL3 = function(i, j){
    if(res[1] >= 9){
        let newJ = 8
        res.pop()
        res.push(newJ)
        j = 8
    }
    if(document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0]].classList.contains('finished') || document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateLine1 = function(i, j){
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if(res[1] >= 8){
        let newJ = 7
        res.pop()
        res.push(newJ)
        j = 7
    }
    if(res[1] > 0 && document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    if((res[1] < (colCount - 1)) && document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() - 2
        res.push(newJ)
        j = newJ
    }
    if((res[1] < (colCount - 2)) && document.querySelectorAll((`div[data-j="${res[1] + 2}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 2])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateLine2 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 3}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
     }
}

let rotateLine3 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if(res[1] >= 8){
        let newJ = 7
        res.pop()
        res.push(newJ)
        j = 7
    }
    if((res[1] < (colCount - 1)) && document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0] + 2].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    if((res[1] > 1) && document.querySelectorAll((`div[data-j="${res[1] - 2}"]`))[res[0] + 2].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    if((res[1] > 0) && document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 2].classList.contains('finished')){
        let newJ = res.pop() + 2
        res.push(newJ)
        j = newJ
    }
    
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 2])
    if(result.every(el => !(el.classList.contains('finished')))){
         activeEls.forEach(activeEl => activeEl.classList.remove('active'))
         result.forEach(el => el.classList.add('active'))
         return result
     }
}

let rotateS1 = function(i, j){
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if((res[1] > 0) && document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 2].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateS2 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateS3 = function(i, j){
    if(res[1] >= 9){
        let newJ = 8
        res.pop()
        res.push(newJ)
        j = 8
    }
    if((res[1] < (colCount - 1)) && document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0]].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateZ1 = function(i, j){
    if(res[1] >= 9){
        let newJ = 8
        res.pop()
        res.push(newJ)
        j = 8
    }
    if((res[1] < (colCount - 1)) &&  document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateZ2 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateZ3 = function(i, j){
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if((res[1] > 0) && document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateT1 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateT2 = function(i, j){
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if((res[1] > 0) && document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateT3 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateMirroredL1 = function(i, j){
    if(res[1] >= 9){
        let newJ = 8
        res.pop()
        res.push(newJ)
        j = 8
    }
    if((res[1] < (colCount - 1)) && document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateMirroredL2 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateMirroredL3 = function(i, j){
    if(res[1] <= 0){
        let newJ = 1
        res.pop()
        res.push(newJ)
        j = 1
    }
    if((res[1] > 0) && document.querySelectorAll((`div[data-j="${res[1] - 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() + 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
} 

let rotateL4 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateLine4 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 3}"]`))[j])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateZ4 = function(i, j ){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateS4 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateT4 = function(i, j){
    if(res[1] >= 9){
        let newJ = 8
        res.pop()
        res.push(newJ)
        j = 8
    }
    if((res[1] < colCount - 1) && document.querySelectorAll((`div[data-j="${res[1] + 1}"]`))[res[0] + 1].classList.contains('finished')){
        let newJ = res.pop() - 1
        res.push(newJ)
        j = newJ
    }
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j - 1])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j + 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotateMirroredL4 = function(i, j){
    let activeEls = Array.from(document.getElementsByClassName('active'))
    let result = []
    result.push(document.querySelectorAll((`div[data-i="${i}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 1}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j])
    result.push(document.querySelectorAll((`div[data-i="${i + 2}"]`))[j - 1])
    if(result.every(el => !(el.classList.contains('finished')))){
        activeEls.forEach(activeEl => activeEl.classList.remove('active'))
        result.forEach(el => el.classList.add('active'))
        return result
    }
}

let rotationsL = [drawL, rotateL1, rotateL2, rotateL3, rotateL4]
let rotationsLine = [drawLine,rotateLine1, rotateLine2, rotateLine3, rotateLine4]
let rotationsS = [drawS, rotateS1, rotateS2, rotateS3, rotateS4]
let rotationsZ = [drawZ, rotateZ1, rotateZ2, rotateZ3, rotateZ4]
let rotationsT = [drawT, rotateT1, rotateT2, rotateT3, rotateT4]
let rotationsO = [drawO]
let rotationsMirroredL = [drawMirroredL, rotateMirroredL1, rotateMirroredL2, rotateMirroredL3, rotateMirroredL4]

function rotate(){
    if(rotationsL.indexOf(current) !== -1){
        if(current !== rotationsL[rotationsL.length - 1]){
            current = rotationsL[rotationsL.indexOf(current) + 1]
        } else {
            current = rotationsL[1]
        }
        current(...res)
    } else if(rotationsLine.indexOf(current) !== -1){
        if(current !== rotationsLine[rotationsLine.length - 1]){
            current = rotationsLine[rotationsLine.indexOf(current) + 1]
        } else {
            current = rotationsLine[1]
        }
        current(...res)
    } else if(rotationsS.indexOf(current) !== -1){
        if(current !== rotationsS[rotationsS.length - 1]){
            current = rotationsS[rotationsS.indexOf(current) + 1]
        } else {
            current = rotationsS[1]
        }
        current(...res)
    } else if(rotationsZ.indexOf(current) !== -1){
        if(current !== rotationsZ[rotationsZ.length - 1]){
            current = rotationsZ[rotationsZ.indexOf(current) + 1]
        } else {
            current = rotationsZ[1]
        }
        current(...res) 
    } else if(rotationsT.indexOf(current) !== -1){
        if(current !== rotationsT[rotationsT.length - 1]){
            current = rotationsT[rotationsT.indexOf(current) + 1]
        } else {
            current = rotationsT[1]
        }
        current(...res) 
    }  else if(rotationsMirroredL.indexOf(current) !== -1){
        if(current !== rotationsMirroredL[rotationsMirroredL.length - 1]){
            current = rotationsMirroredL[rotationsMirroredL.indexOf(current) + 1]
        } else {
            current = rotationsMirroredL[1]
        }
        current(... res)
    } else if (rotationsO.indexOf(current) !== -1){
        current(...res)
    }
}
