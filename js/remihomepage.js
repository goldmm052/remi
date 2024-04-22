let choose_num_of_players;
let choose_level;

document.getElementById('homepage').addEventListener('submit', function (event) {
  event.preventDefault();
  const num_of_Players = document.querySelector("#num_of_players");

  for (child of num_of_Players.children) {
    if (child.checked === true) {
      choose_num_of_players = child.value;
      localStorage.setItem('num_of_players', choose_num_of_players);
    }
  }

  const level = document.querySelector("#choose_level_div");

  for (child of level.children) {
    if (child.checked === true) {
      choose_level = child.value;
      localStorage.setItem('level', choose_level);
    }
  }
  const user_name = document.getElementById("input_name").value;
  if (user_name) {
    localStorage.setItem('user_name', user_name);
    loadPlayPage()

  }
  else { alert("לא הוכנס שם שחקן") }

});

function loadPlayPage() {
  if (choose_num_of_players == "two players") {
    window.location.href = "../html/Remi2.html";
  }
  else {
    window.location.href = "../html/Remi.html";
  }
}




