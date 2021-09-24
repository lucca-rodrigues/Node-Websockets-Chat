const socket = io("http://localhost:3000");
var idChatRoom = "";

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const email = urlParams.get("email");
  // const avatar = urlParams.get("avatar");
  const avatar =
    "https://d.furaffinity.net/art/omnio/1487370223/1487370223.omnio_avatar-github-taurus-omnio_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.png";

  document.querySelector(".user_logged").innerHTML += `
    <img
      class="avatar_user_logged"
      src=${avatar}
    />
    <strong id="user_logged">${name}</strong>
  `;

  socket.emit("start", {
    name,
    email,
    avatar,
  });

  socket.on("new_users", (user) => {
    const existUserInDiv = document.getElementById(`user_${user._id}`);

    if (!existUserInDiv) {
      addUser(user);
    }
  });

  socket.emit("get_users", (users) => {
    console.log("getUsers", users);

    users.map((user) => {
      if (user.email !== email) {
        addUser(user);
      }
    });
  });

  socket.on("message", (data) => {
    // if (data.message.roomId === idChatRoom) {
    //   addMessage(data);
    // }
    console.log(data);
  });
}

function addUser(user) {
  const userList = document.getElementById("users_list");

  userList.innerHTML += `
      <li
      class="user_name_list"
      id="user_${user._id}"
      idUser="${user._id}"
      >
        <img
          class="nav_avatar"
          src=${user.avatar}
        />
      ${user.name}
    </li>
    `;
}

document.getElementById("users_list").addEventListener("click", (e) => {
  if (e.target && e.target.matches("li.user_name_list")) {
    // Ao clicar em um item da lista
    const idUser = e.target.getAttribute("idUser"); // Pega o Id do usuário
    console.log("idUser", idUser);

    socket.emmit("start_chat", { idUser }, (data) => {});
  }
});

document.getElementById("user_message").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const message = e.target.value;
    e.target.value = "";

    const data = {
      message,
      idChatRoom,
    };

    socket.emit("message", data);
  }
});

onLoad();
