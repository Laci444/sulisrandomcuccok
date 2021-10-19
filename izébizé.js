let box = []
let shotgun = 0
let f_player = 0
let s_player = 0
let round = 0

function __init__() {
    let green_cube = ["agy", "agy", "agy", "láb", "láb", "shotgun", "zöld"]
    let yellow_cube = ["agy", "agy", "láb", "láb", "shotgun", "shotgun", "sárga"]
    let red_cube = ["agy", "láb", "láb", "shotgun", "shotgun", "shotgun", "piros"]

    for (let i = 0; i < 6; i++) box.push(green_cube)
    for (let i = 0; i < 4; i++) box.push(yellow_cube)
    for (let i = 0; i < 3; i++) box.push(red_cube)
}

function roll(cube) {
    return cube[Math.floor(Math.random() * 6)]
}

function pick_a_dice() {
    let rnd = Math.floor(Math.random() * box.length)
    let cube = box[rnd]
    box.splice(rnd, 1)
    
    return cube
}

function refact(dice, result) {
    console.log(`Dobsz a ${dice[6]} színű kockával, az eredmény: ${result}`)

    if (result == "shotgun") shotgun++;
    if (result == "agy") round++;
    if (result == "láb") box.push(dice);
}

function main() {
    let player = true
    let zsa = true

    __init__()

    let choice = "y"

    while (zsa) {
        if (player) console.log("----- 1. játékos -----")
        else console.log("----- 2. játékos -----")

        let dice1 = pick_a_dice()
        let dice2 = pick_a_dice()
        let dice3 = pick_a_dice()
        console.log(`A kezedben van egy ${dice1[6]}, egy ${dice2[6]} és egy ${dice3[6]} színű kocka.`)
        choice = prompt("Szertnél dobni? [y/n]: ")
        if (choice == "y") {
            refact(dice1, roll(dice1))
            refact(dice2, roll(dice2))
            refact(dice3, roll(dice3))
            if (shotgun >= 3) {
                round = 0
                console.log("Túl sok hp-t vesztettél, meghaltál!")
                console.log("Hp: " + (3 - shotgun))

                player = !player
                box = []
                shotgun = 0
                __init__()
            }
            console.log(`Agyak: ${round}, Shotgun: ${shotgun}`)
        }
        else {
            if (player) f_player += round
            else s_player += round

            console.log(`A pontjaid: ${round}`)

            if (!player) {
                console.log(`Állás: ${f_player} : ${s_player}`)
            }

            round = 0
            shotgun = 0
            player = !player

            box = []
            __init__()
        }

    }
}