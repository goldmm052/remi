האתגר: להרכיב סדרות של מספרים ע"פ חוקי משחק "רמי", בקלפים העומדים לרשות השחקן, בזמן קצוב בהתאם לרמה שנבחרה.
הלוגיקה: בכל מהלך מתבצעת בדיקה האם המהלך בוצע ע"פ חוקי המשחק. בסיום המשחק מתבצעת בדיקת כל האריחים שהונחו על לוח השחק ומתקבלת הודעה מתאימה: נצחון/כשלון.
עיצוב: נעים לעין, רספונסיביות מלאה  שמוש ב-flex, שנוי גודל האובייקטים בהתאם לגודל המסך.
הפרויקט מכיל 2 עמודים: עמוד הבית ועמוד המשחק. 
1.	עמוד הבית – homepage.html
הקשת שם השחקן, בחירת רמה ומספר שחקנים.
הנתונים נשמרים ב- localStorage

2.	 עמוד המשחק – Remi.html
בתחילת המשחק: לוח משחק ריק ושורת האריחים של השחקן גלויה.
השחקן רשאי למקם אריחים על לוח המשחק בהתאם לחוקי המשחק. מיקום האריח על הלוח מתבצע ע"י לחיצה עם העכבר על האריח המבוקש, ולחיצה נוספת על לוח המשחק  - במיקום עליו הוא מעוניין להניח את האריח. במידה והאריח הונח שלא ע"פ חוקי במשחק מתקבלת הודעה מתאימה והאריח חוזר למקומו.

תעוד פונקציות :

פונקציות הכנה למשחק : יצירת האובייקטים ,פונקציות לציור לוח המשחק
// פונקציה שיוצרת מערך ובו מאגר כל האריחים המשתתפים במשחק, כל אריח מופיע פעמיים במשחק
function FillStonArr()

//פונקציה המגרילה 14 אריחים מתוך מערך האריחים, שומרת אותם במערך השחקן ומוחקת אותם מהמערך הכללי
function randomStonsToPlayer()

//פונקציה המציירת  את האריחים של השחקן על הלוח  
function DrawPlayerSton()

//פונקציה המציירת לוח משחק ריק
function drawBoard()
פונקציות של מהלך המשחק:
//פונקציה להזזת אריח מהשחקן ללוח
function move()

//פונקציה למיקום אריח על הלוח
function paste(btn)

//פונקציות הבודקות האם האריח הונח ע"פ כללי המשחק

// מקבלות את המיקום של האריח על הלוח ומחזירות אמת/שקר  האם המהלך חוקי/לא חוקי  
//בדיקת האריח שהונח על הלוח ביחס לאריח שאחריו, רק אם האריח שאחריו מלא 
function check_right(mikum)

//בדיקת האריח שהונח על הלוח ביחס לאריח שלפניו,רק אם האריח שלפניו מלא 
function check_left(mikum)

//  פונקציה המוחקת מהמערך של השחקן את האריח שהניח על הלוח לאחר שנבדק האם המהלך חוקי
function removeStonFromPlayer()

//  פונקציה המוחקת מהמערך של לוח המשחק את האריח שהורם לאחר שנבדק האם המהלך חוקי
function removeStonFromBaord()

//פונקציה המוסיפה לשחקן אריח מהקופה ומוחקת אותו מהמערך של הקופה 
function addSton()

// חזרה לעמוד הבית
function to_homepage()

// התחלת המשחק
function beginPlay()

//הפעלת הטיימר ע"פ הרמה שנבחרה
function begin_timer()

// פונקציה הבודקת בסיום המשחק האם יש נצחון
function checkWin()

// סיום המשחק
function end()




המשחק מיישם את עקרונות התכנות ב – js  :
1.	תכנות בסיסי: 
מערכים  - שימוש בפונקציות לדוגמא   Push –Splice   

Remi.js  line 53 – 54:
playerArr.push(stonarr[randomnumber]);
       stonarr.splice(randomnumber, 1);

    לולאות ופונקציות מתקדמות על מערכים: 
	
Remi.js  line 330:
for (child of board.children)
        child.style.pointerEvents = "auto";


Remi.js line 243:
  
line  243:    const index = playerArr.findIndex((element) => {
 		       return (element.number) === parseInt(temp.innerHTML)


מערך אובייקטים:
Remi.js line 17:

let game_arr = [];
for (let i = 0; i < 130; i++) {
    game_arr.push({ color: "", number: null });
}

פונקציות:

פונקציות שמקבלות ומחזירות ערך:
Remi.js line 168:
function check_right(mikum)

פונקציה אנונימית:
Remi.js line 99:
 btn.onclick = function ()
2.	DOM  :

שימוש ב getElementById  / querySelector
קבלה ושנוי ערכי מאפיינים וקלאסים
קבלה ושנוי ערכי שדות קלט מהגולש
Remi.js line 364:
document.querySelector("#beginplay").disabled = false;
Remi.js line 393:
document.getElementById("game").innerHTML = "The game for two pleyer is not ready yet!please ,go bake to homepage!";
Remi.js line 87:
btn.classList.add("stons");
קבלה ושנוי ערכי שדות קלט מהגולש:
remihomepage.js line 23:
const user_name = document.getElementById("input_name").value;

טיול על עץ ה-HTML באמצעות children
Remi.js line 331:
for (child of board.children)
יצירת אלמנטים באמצעות createElement + append
Remi.js line 62:
const new_btn = document.createElement("button");
Remi.js line 71:
document.querySelector("#player").append(new_btn)

3.	אירועים
ארועי לחיצה:
Remi.js line 70:
new_btn.onclick = move;

ארוע שליחת טופס , 
שמוש באובייקט  : Event
remihomepage.js line 4: document.getElementById('homepage').addEventListener('submit', function (event) {
  event.preventDefault();


4.	שמירה ושליפה של נתוני גולשים: 
remihomepage.js line 25:
localStorage.setItem('user_name', user_name);
5.	טיימר:
Remi.js line 346:
my_timer = setInterval(begin, 1000);

6.	שמוש באובייקטים   - 	window,  location
function loadPlayPage() {
  if (choose_num_of_players == "two players") {
    window.location.href = "../html/Remi2.html";
  }

