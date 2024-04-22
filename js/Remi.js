const name = localStorage.getItem("user_name")
const choose_num_of_players = localStorage.getItem("num_of_players");
const choose_level = localStorage.getItem("level")
let stonarr = [];//מערך כל האריחים שבמשחק
let playerArr = [];//מערך האריחים של השחקן
let temp;
let mikum;
let flag_stone_from_baord = false;  //משתנה בוליאני שתפקידו לבדוק האם האריח שהורם הוא מהאריחים שעל  הלוח
let flag_stone_from_player = false;  //משתנה בוליאני שתפקידו לבדוק האם האריח שהורם הוא מהאריחים של השחקן
let flag_win = true;
let my_timer;
let f, z;
let time;
let timer = document.querySelector("#timer");
let error;
let firstGame = true;
let game_arr = [];//מערך המתעד את האריחים שהשחקן מניח על הלוח, את המאפינים שלהם והמיקום שלהם בלוח
for (let i = 0; i < 130; i++) {
    game_arr.push({ color: "", number: null });
}

const player = document.querySelector("#player")
const board = document.querySelector("#board")

//////////////////////////////////////////// פונקציות הכנה למשחק ////////////////////////////////////////////////

// פונקציה שיוצרת מערך ובו מאגר כל האריחים המשתתפים במשחק, כל אריח מופיע פעמיים במשחק
function FillStonArr() {
    stonarr = [];
    let i, j;
    const colorarr = ["red", "black", "blue", "orange"];

    for (i = 0; i < 4; i++) {
        for (j = 1; j < 14; j++) {
            stonarr.push({ color: `${colorarr[i]}`, number: j });
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 1; j < 14; j++) {
            stonarr.push({ color: `${colorarr[i]}`, number: j });
        }
    }
}


//פונקציה המגרילה 14 אריחים מתוך מערך האריחים, שומרת אותם במערך השחקן ומוחקת אותם מהמערך הכללי

function randomStonsToPlayer() {
    let randomnumber;
    playerArr = [];
    for (i = 0; i < 14; i++) {
        randomnumber = Math.floor(Math.random() * stonarr.length);
        playerArr.push(stonarr[randomnumber]);
        stonarr.splice(randomnumber, 1)

    }
}
//פונקציה המציירת  את האריחים של השחקן על הלוח  
function DrawPlayerSton() {
    document.querySelector("#player").innerHTML = "";
    for (i = 0; i < playerArr.length; i++) {
        const new_btn = document.createElement("button");

        new_btn.innerHTML = (`${playerArr[i].number}`);
        new_btn.color = playerArr[i].color;
        new_btn.classList.add("playerstons")
        new_btn.style.color = (`${new_btn.color}`);
        new_btn.classList.add("stons");
        new_btn.disabled = false;
        new_btn.onclick = move;
        document.querySelector("#player").append(new_btn)

    }

}

//פונקציה המציירת לוח משחק ריק
function drawBoard() {
    game_arr = [];//מערך המתעד את האריחים שהשחקן מניח על הלוח, את המאפינים שלהם והמיקום שלהם בלוח
    for (let i = 0; i < 130; i++) {
        game_arr.push({ color: "", number: null });
    }
    let i;
    document.querySelector("#board").innerHTML = "";
    for (i = 0; i < 130; i++) {
        const btn = document.createElement("button");
        btn.classList.add("stons");
        btn.classList.add("boardstons");

        btn.number = null;
        btn.dataset.id = i;
        btn.isempty = "empty"
        document.querySelector("#board").append(btn);
        if ((i + 1) % 26 === 0) {
            const lineBreak = document.createElement("br");
            document.querySelector("#board").append(lineBreak);
        }

        btn.onclick = function () {
            if (btn.isempty == "empty") {

                paste(btn);
            } else if (btn.isempty == "full" && temp == null) {

                temp = btn;
                flag_stone_from_baord = true;
                flag_stone_from_player = false;
            }
        }

    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////מהלך המשחק /////////////////////////////////////////////////////
//פונקציה להזזת אריח מהשחקן ללוח
function move() {

    temp = this;
    flag_stone_from_player = true;

}

//פונקציה למיקום אריח על הלוח
function paste(btn) {
    if (temp == null)
        return;

    let res_right = true;
    let res_left = true;

    mikum = parseInt(btn.dataset.id)
    game_arr[mikum] = { color: temp.style.color, number: parseInt(temp.innerHTML) };
    game_arr[parseInt(temp.dataset.id)] = { color: "", number: null };

    if (mikum < 130 && mikum >= 0) {
        res_right = check_right(mikum);
        res_left = check_left(mikum);

        if (res_right == true && res_left == true) {
            btn.innerHTML = temp.innerHTML;
            btn.number = temp.number;
            btn.style.color = temp.style.color;
            btn.isempty = "full";
            if (flag_stone_from_baord == true)
                removeStonFromBaord();

            if (flag_stone_from_player == true)
                removeStonFromPlayer();
            temp = null;
        }
        else {
            game_arr[mikum] = { color: "", number: null };
            game_arr[parseInt(temp.dataset.id)] = { color: temp.style.color, number: parseInt(temp.innerHTML) }
            res_right = true;
            res_left = true;
        }
    }
}



//פונקציות הבודקות האם האריח הונח ע"פ כללי המשחק
// מקבלות את המיקום של האריח על הלוח ומחזירות אמת/שקר  האם המהלך חוקי/לא חוקי  
//בדיקת האריח שהונח על הלוח ביחס לאריח שאחריו, רק אם האריח שאחריו מלא

function check_right(mikum) {
    if ((mikum + 1) % 26 === 0)
        return true;
    z = 1;
    error = name + ",you have a mistake! try again!";

    while (game_arr[mikum + z] && game_arr[mikum + z].color != "") {
        if (game_arr[mikum].color == game_arr[mikum + z].color) {
            if (game_arr[mikum].number + z - 13 >= 1) {
                if (game_arr[mikum].number + z - 13 != game_arr[mikum + z].number) {
                    alert(error);

                    return false;
                }
            }
            else
                if (game_arr[mikum].number + z != game_arr[mikum + z].number) {
                    alert(error);

                    return false;
                }
        }
        else {
            if (game_arr[mikum].number != game_arr[mikum + z].number) {
                alert(error);
                return false;
            }
        }
        z++;
        if (((mikum + z) % 26) === 0)
            return true;

    }

    return true;
}

//בדיקת האריח שהונח על הלוח ביחס לאריח שלפניו,רק אם האריח שלפניו מלא 
function check_left(mikum) {
    if ((mikum % 26) === 0)
        return true;
    f = 1;
    while (game_arr[mikum - f] && game_arr[mikum - f].color != "") {
        if (game_arr[mikum].color == game_arr[mikum - f].color) {
            if (((game_arr[mikum].number) + 1 - f) == 1 || ((game_arr[mikum].number) + 1 - f) < 1) {
                if ((game_arr[mikum].number + 13 - f) != game_arr[mikum - f].number) {
                    alert(error);
                    return false;
                }
            }
            else {
                if (game_arr[mikum].number - f != game_arr[mikum - f].number) {
                    alert(error);
                    return false;
                }
            }
        }
        else {
            if (game_arr[mikum].number != game_arr[mikum - f].number) {
                alert(error);
                return false;
            }
        }

        f++;
        if (((mikum + 1 - f) % 26) === 0)
            return true;
    }
    return true;;
}


//  פונקציה המוחקת מהמערך של השחקן את האריח שהניח על הלוח לאחר שנבדק האם המהלך חוקי
function removeStonFromPlayer() {

    const index = playerArr.findIndex((element) => {
        return (element.number) === parseInt(temp.innerHTML)
            && element.color === temp.style.color;
    });

    if (index > -1) {
        playerArr.splice(index, 1);
    }

    flag_stone_from_player = false;
    DrawPlayerSton();
}

//  פונקציה המוחקת מהמערך של לוח המשחק את האריח שהורם לאחר שנבדק האם המהלך חוקי
function removeStonFromBaord() {
    temp.innerHTML = "";
    temp.style.color = "";
    temp.isempty = "empty";
    mikum = parseInt(temp.dataset.id);
    game_arr[mikum] = { color: "", number: null };
    flag_stone_from_baord = false;
}

//פונקציה המוסיפה לשחקן אריח מהקופה ומוחקת אותו מהמערך של הקופה 
function addSton() {
    let randomnumber;
    randomnumber = Math.floor(Math.random() * stonarr.length);

    playerArr.push(stonarr[randomnumber]);
    new_btn = document.createElement("button");
    new_btn.innerHTML = (`${stonarr[randomnumber].number}`);
    new_btn.color = stonarr[randomnumber].color;
    new_btn.classList.add("playerstons")
    new_btn.onclick = move;
    new_btn.style.color = (`${new_btn.color}`);
    new_btn.classList.add("stons");
    new_btn.disabled = false;
    document.querySelector("#player").append(new_btn)

    stonarr.splice(randomnumber, 1)
}

// פונקציה הבודקת בסיום המשחק האם יש נצחון
function checkWin() {
    //בדיקה האם מערך הקלפים של השחקן ריק
    if (playerArr.length != 0)
        return false;
    //   האם אין סדרה של פחות משלושה אריחים
    let i = 0;
    while (i < 130) {
        let j = 0;
        while (!game_arr[i] && i < 130) i++;
        while (i < 130 && game_arr[i] && game_arr[i].color != "") { i++; j++; }
        if (j > 0 && j < 3)
            return false;

        i++;




    }
    return true;
}
// חזרה לעמוד הבית
function to_homepage() {
    window.location.href = 'homepage.html';
}


// התחלת המשחק
function beginPlay() {
    if (!firstGame) {
        drawBoard();   //פונקציה המציירת לוח משחק ריק
        FillStonArr();     //פונקציה שיוצרת מערך ובו מאגר כל האריחים המשתתפים במשחק
        randomStonsToPlayer();    //פונקציה המגרילה 14 אריחים מתוך מערך האריחים, שומרת אותם במערך השחקן ומוחקת אותם מהמערך הכללי
        DrawPlayerSton();//פונקציה המציירת  את האריחים של השחקן
    }
    firstGame = false;
    document.querySelector("#beginplay").disabled = true;
    document.querySelector("#end").disabled = false;
    document.querySelector("#add_ston").disabled = false;
    document.querySelector("#to_homepage").disabled = true;
    flag_win = true;

    begin_timer();

    //לולאה שעוברת על האריחים של השחקן ושעל הלוח ונותנת את האפשרות של ארוע הלחיצה
    for (child of board.children)
        child.style.pointerEvents = "auto";

    for (child of player.children)
        child.style.pointerEvents = "auto";

}

//הפעלת הטיימר ע"פ הרמה שנבחרה
function begin_timer() {
    //קביעת הזמן הקצוב למשחק ע"פ הרמה שנבחרה
    if (choose_level == "level 1")
        time = 900;
    if (choose_level == "level 2")
        time = 600;
    my_timer = setInterval(begin, 1000);//הפעלת הטיימר


    function begin() {

        time--;
        timer.innerHTML = `${time}`;

        if (time == 0) {

            end();
        }
    }
}

// סיום המשחק
function end() {
    clearInterval(my_timer);
    document.querySelector("#beginplay").disabled = false;
    document.querySelector("#end").disabled = true;
    document.querySelector("#add_ston").disabled = true;
    document.querySelector("#to_homepage").disabled = false;
    //פונקציה הבודקת האם השחקן ניצח או הפסיד
    flag_win = checkWin();
    if (flag_win == true)
        alert(name + ",you are the winner!!")
    else
        alert(name + ",sorry,you failed.");

    //לולאה שעוברת על האריחים של השחקן ושעל הלוח ומונעת את האפשרות של ארוע הלחיצה
    for (child of board.children)
        child.style.pointerEvents = "none";

    for (child of player.children)
        child.style.pointerEvents = "none";

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function main() {
    document.querySelector("#beginplay").onclick = beginPlay;
    document.querySelector("#end").onclick = end;
    document.querySelector("#add_ston").onclick = addSton;
    document.querySelector("#to_homepage").onclick = to_homepage;
    if (choose_num_of_players == "two players") {
        document.querySelector("#beginplay").disabled = true;
        document.getElementById("game").innerHTML = "The game for two pleyer is not ready yet!please ,go bake to homepage!";
        document.querySelector("#to_homepage").disabled = false;
    }
    document.getElementById("hello").innerHTML = `hello  ${name}!   your choice :  ${choose_num_of_players},  ${choose_level} `;
    document.querySelector("#end").disabled = true;
    document.querySelector("#add_ston").disabled = true;
    //לולאה שעוברת על האריחים של השחקן ושעל הלוח ומונעת את האפשרות של ארוע הלחיצה


    drawBoard();   //פונקציה המציירת לוח משחק ריק
    FillStonArr();     //פונקציה שיוצרת מערך ובו מאגר כל האריחים המשתתפים במשחק
    randomStonsToPlayer();    //פונקציה המגרילה 14 אריחים מתוך מערך האריחים, שומרת אותם במערך השחקן ומוחקת אותם מהמערך הכללי
    DrawPlayerSton();//פונקציה המציירת  את האריחים של השחקן
    for (child of board.children)
        child.style.pointerEvents = "none";

    for (child of player.children)
        child.style.pointerEvents = "none";
}
main();







