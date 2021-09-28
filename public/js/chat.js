// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");
let idChatRoom = "";

function onLoad() {
  // eslint-disable-next-line no-undef
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const email = urlParams.get("email");
  const avatar =
    "https://d.furaffinity.net/art/omnio/1487370223/1487370223.omnio_avatar-github-taurus-omnio_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.png";
  // eslint-disable-next-line no-undef
  document.querySelector(".user_logged").innerHTML += `
  <img
    class="avatar_user_logged"
    src=${avatar}
  />
<strong id="user_logged">${name}</strong>
  `;

  socket.emit("start", {
    email,
    name,
    avatar,
  });

  socket.on("new_users", (data) => {
    const existInDiv = document.getElementById(`user_${data._id}`);

    if (!existInDiv) {
      // eslint-disable-next-line no-use-before-define
      addUser(data);
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
    console.log("message", data);
    // eslint-disable-next-line no-use-before-define
    addMessage(data);
  });
}
function addMessage(data) {
  const divMessageUser = document.getElementById("message_user");

  divMessageUser.innerHTML += `
  <span class="user_name user_name_date">
      <img
        class="img_user"
        src=${data.user.avatar}
      />
      <strong>${data.user.name}</strong>
      <span> ${dayjs(data.message.created_at).format(
        "DD/MM/YYYY HH:mm"
      )}</span></span
    >
    <div class="messages">
      <span class="chat_message">${data.message.text}</span>
    </div>
  `;
}

function addUser(user) {
  // eslint-disable-next-line no-undef
  const usersList = document.getElementById("users_list");
  usersList.innerHTML += `
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
</li>`;
}

// eslint-disable-next-line no-undef
document.getElementById("users_list").addEventListener("click", (e) => {
  document.getElementById("message_user").innerHTML = "";
  const inputMessage = document.getElementById("user_message");
  inputMessage.classList.remove("hidden");

  if (e.target && e.target.matches("li.user_name_list")) {
    // Ao clicar em um item da lista
    const idUser = e.target.getAttribute("idUser"); // Pega o Id do usuário

    console.log("idUser", idUser);

    socket.emmit("start_chat", { idUser }, (data) => {
      console.log(data);
      idChatRoom = data.room.idChatRoom;
    });
  }
});
// se ele clicar
document.getElementById("user_message").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const message = e.target.value; // pegando o que esta escrito no input

    console.log("message", message);

    e.target.value = ""; // limpa a mensagem no input

    const data = {
      message,
      idChatRoom,
    };

    socket.emit("message", data);
  }
});
onLoad();
