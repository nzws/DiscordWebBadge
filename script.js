const name = decodeURIComponent(location.search.substring(1)).split('#');
const username = document.getElementById("username");
const status = document.getElementById("status");
const status_color = document.getElementById("status_color");
const link = document.querySelector("a");

console.log(name);

if (!name[0] || !name[1] || isNaN(name[1])) {
  username.textContent = "#Unknown#";
  status.textContent = "#ERR:Param#";
} else {
  username.textContent = name[0] + "#" + name[1];
  fetch("https://discordapp.com/api/guilds/518394474431250433/embed.json", {
    method: 'GET'
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  }).then(function (json) {
    let i = 0, data;
    while (json['members'][i]) {
      if (json['members'][i]['username'] === name[0] && json['members'][i]['discriminator'] === name[1]) {
        data = json['members'][i];
        break;
      }
      i++;
    }

    if (data) {
      link.href = "https://discordapp.com/users/" + data["id"];
      status_color.className = "right " + data["status"];
      status.textContent = data["status"];
    } else {
      status.textContent = "OFFLINE";
    }
  }).catch(function (error) {
    status.textContent = "#ERR:Invalid#";
  });
}
