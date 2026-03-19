const klase_x = 'x'
const klase_O = 'circle'

/*
    0 1 2
    3 4 5
    6 7 8
*/

const uzvaras_nosacijumi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const visi_laucini = document.querySelectorAll('.cell')
const rezultatu_logs = document.querySelector('#resultBox')
const rezultatu_teksts = document.querySelector('#resultInfo')
const atjaunot = document.querySelector('#restartButton')
const attelot_speletaju = document.querySelector('#display')
const rezultati = document.querySelector('#score')
const dzest_rezultatu = document.querySelector('#delteScore')
var aw
var bw
var cw
let taimeris = null
let interval = null
let laiksbeidzas = false
let speleUzvara = false
let loops = 0

let x_rezultats = JSON.parse(localStorage.getItem("x_score")) || 0
let o_rezultats = JSON.parse(localStorage.getItem("o_score")) || 0

let speletajs_O = false

function saglabat_rezultatu(){
    localStorage.setItem("x_score", JSON.stringify(x_rezultats))
    localStorage.setItem("o_score", JSON.stringify(o_rezultats))
}

visi_laucini.forEach(laucins => {
    laucins.addEventListener("click", veikt_gajienu, {once: true})
    laucins.addEventListener("click", () =>{ loops = 0}, {once: true})
})

function laika_parbaude(){
    
    laiksbeidzas = false

    if(loops >= 5){
        const aktivais_speletajs = speletajs_O ? klase_O : klase_x

        if(!speleUzvara){
            if(speletajs_O)
                x_rezultats++;
            else
                o_rezultats++;

            saglabat_rezultatu()


            rezultatu_teksts.textContent = `Spēlētājs ${speletajs_O ? "o" : "x"} uzvarēja! Laika dēļ`
            rezultati.textContent = `X spēlētāja rezultāts ir: ${x_rezultats} un O spēlētāja rezultāts ir: ${o_rezultats}`
            rezultatu_logs.classList.add('show')
        }
    }
}

function startCountdown(seconds) {
    let counter = seconds;
    const timer_text = document.querySelector("#timer")


    interval = setInterval(() => {
        if(!speleUzvara){
            timer_text.textContent = counter
            counter--;
            loops++
        }
        if(loops > 5){
            laika_parbaude()
            clearInterval(interval)
        }
    }, 1000);
    
}

function veikt_gajienu(klikskis){
    const laucins = klikskis.target
    const aktivais_speletajs = speletajs_O ? klase_O : klase_x
    const bg_page = document.querySelector("body")

    if(!speleUzvara){
        laucins.classList.add(aktivais_speletajs)
        clearTimeout(interval)
        startCountdown(5)
    }
    if(!speletajs_O){
        bg_page.classList.add("o-player")
        bg_page.classList.remove("x-player")
    }else{
        bg_page.classList.add("x-player")
        bg_page.classList.remove("o-player")
    }

    if(parbaudit_uzvaru(aktivais_speletajs)){

        if(speletajs_O && !speleUzvara){
            o_rezultats++;
            speleUzvara = true
        }else if(!speleUzvara){
            x_rezultats++;
            speleUzvara = true
        }

        saglabat_rezultatu()
        

            timeouts = setTimeout(() => {
                visi_laucini[aw].classList.add("uzvaras-laucins")
            }, 400);
            timeouts = setTimeout(() => {
                visi_laucini[bw].classList.add("uzvaras-laucins")
            }, 500);
            timeouts = setTimeout(() => {
                visi_laucini[cw].classList.add("uzvaras-laucins")
            }, 800);
            timeouts = setTimeout(() => {
                rezultatu_teksts.textContent = `Spēlētājs ${speletajs_O ? "o" : "x"} uzvarēja!`
                rezultati.textContent = `X spēlētāja rezultāts ir: ${x_rezultats} un O spēlētāja rezultāts ir: ${o_rezultats}`
                rezultatu_logs.classList.add('show')
            }, 1400);
            

    } else if(vai_ir_neizskirts()){
        timeouts = setTimeout(() => {
                rezultatu_teksts.textContent = `Neišķirts`
                rezultati.textContent = `X spēlētāja rezultāts ir: ${x_rezultats} un O spēlētāja rezultāts ir: ${o_rezultats}`
                rezultatu_logs.classList.add('show')
            }, 1400);
    }else{
        speletajs_O = !speletajs_O
        attelot_speletaju.textContent = speletajs_O ? "O" : "X"
    }
}

function parbaudit_uzvaru(aktivais){
    

    for(let i = 0; i < uzvaras_nosacijumi.length; i++){
        const kombinacija = uzvaras_nosacijumi[i]
        const a = kombinacija[0]
        const b = kombinacija[1]
        const c = kombinacija[2]
        
        if(visi_laucini[a].classList.contains(aktivais) &&
            visi_laucini[b].classList.contains(aktivais) &&
            visi_laucini[c].classList.contains(aktivais)){ 
                aw = a
                bw = b
                cw = c
                return true
        }
    }
    return false
}


function vai_ir_neizskirts(){
    for(let i =0; i < visi_laucini.length; i++){
        const laucins = visi_laucini[i]

        if(!laucins.classList.contains(klase_x) && !laucins.classList.contains(klase_O)){
           return false 
        }
    }

    return true
}

atjaunot.addEventListener("click", () => {
    location.reload()
})

dzest_rezultatu.addEventListener("click", () => {
    o_rezultats = 0
    x_rezultats = 0
    saglabat_rezultatu()
    location.reload()
})