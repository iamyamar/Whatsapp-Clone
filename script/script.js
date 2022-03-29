const friends = document.querySelector(".friends")
const chatpage = document.querySelector(".chatpage")
const search = document.querySelector(".search")
const searchup = document.querySelector(".searchup")
const close = document.querySelector(".close")
const flmsg = document.querySelector(".flmsg")
const fuName = document.querySelector(".fuName")
const chatcolumn = document.querySelector(".chatcolumn")

// Disablisg copy
const disableselect = (e) => {
  return false
}
friends.onselectstart = disableselect
friends.onmousedown = disableselect
// chatpage.onselectstart = disableselect
// chatpage.onmousedown = disableselect

// Rendering Friend
function Buildlist(data) {
  if (data.length > 0) {
    data.forEach((element) => {
      // console.log(element.name)
      let div = document.createElement("div")
      div.classList.add("sfriend")
      div.innerHTML = `
      <div class="fpic">
      <div class="fimg"></div>
      </div>
      <div class="fdata">
      <div class="fone">
        <p class="fname">${
          !search.value == ""
            ? element.name.replace(search.value, "<b>$&</b>")
            : element.name
        }</p>
        <p class="ftime">2:30 pm</p>
          </div>
          <div class="ftwo">
        <p class="flmsg">ghar jaa</p>
        </div>
        </div>`
      // friends.appendChild(div)
      friends.insertAdjacentElement("beforeend", div)
    })
  } else {
    friends.innerHTML = `<div class="nomes"><p>No chats, contacts or messages found!<p><div>`
  }
}

// Searching Friends
search.addEventListener("keyup", (e) => {
  let value = search.value
  let data = searchUser(value, friend)
  friends.innerHTML = ``
  Buildlist(data)
  if (!search.value == "") {
    console.log("show")
    close.classList.remove("hide")
  } else {
    close.classList.add("hide")
  }
})

close.addEventListener("click", () => {
  search.value = ""
  friends.innerHTML = ""
  Buildlist(friend)
  close.classList.add("hide")
  search.focus()
})

Buildlist(friend)

function searchUser(value, data) {
  var filteredData = []
  for (var i = 0; i < data.length; i++) {
    value = value.toLowerCase()
    let name = data[i].name.toLowerCase()

    if (name.includes(value)) {
      filteredData.push(data[i])
    }
  }
  return filteredData
}

//rendering friends on chat
const sfriend = document.querySelectorAll(".sfriend")
//! event listner on friends container
friends.addEventListener("click", (e) => {
  //! removing active from each sfriend
  sfriend.forEach((e) => {
    e.classList.remove("active")
  })
  //! selecting sfriend using event delegation
  if (e.target.closest(".sfriend")) {
    chatcolumn.innerHTML = ``
    // console.log(e.target.closest(".sfriend"))
    e.target.closest(".sfriend").classList.add("active")
    // console.log(e.target.closest(".sfriend").childNodes[3])
    let actname =
      e.target.closest(".sfriend").childNodes[3].childNodes[1].childNodes[1]
        .textContent
    //!
    friend.forEach((e) => {
      if (e.name == actname) {
        chatcolumn.innerHTML = `<div class="friendshead">
        <div class="fpropic">
        <div class="fimg"></div>
      <div class="fdesp">
      <div class="fuName">${e.name}</div>
        <div class="fustatus">${e.status}</div>
        </div>
    </div>
    <div class="ftools">
    <div class="ftool1">
    <i class="fa-solid fa-magnifying-glass searchicon"></i>
      </div>
      <div class="ftool2">
        <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
    </div>
    </div>
    <div class="chatpage">
      </div>
      <div class="message">
      <div class="tool">
      <i class="fa-regular fa-face-laugh"></i>
      </div>
    <div class="tool">
    <i class="fa-solid fa-paperclip"></i>
    </div>
    <div class="msgcont">
    <div class="msgcountin">
    <input class="msgtype" type="text" placeholder="Type a Message" />
    </div>
    </div>
    <div class="send-msg">
      <i class="fa-solid fa-microphone"></i>
      </div>
      </div>`
      }
    })
  }

  const msgtype = document.querySelector(".msgtype")
  const sendmsg = document.querySelector(".send-msg")
  const chatpage = document.querySelector(".chatpage")
  const act = document.querySelector(".active")
  msgtype.focus()

  let actname = act.childNodes[3].childNodes[1].childNodes[1].textContent
  // console.log(actname)

  friend.forEach((el) => {
    if (el.name == actname) {
      sendmsg.addEventListener("click", (e) => {
        // console.log(msgtype.value)
        msgtype.value = ""
      })
      msgtype.addEventListener("keyup", (e) => {
        // console.log(e)
        if (e.key === "Enter") {
          console.log(el.chat)
          el.chat.push({ status: "send", msg: `${msgtype.value}` })
          msgtype.value = ""
          console.log(el.chat)
        }
      })

      console.log(el.chat)
      el.chat.forEach((elem) => {
        // chatpage.innerHTML = ``
        console.log(elem)
        if (elem.status == "received") {
          console.log(`rec + ${el.name} + ${elem.msg}`)
          let div = document.createElement("div")
          div.classList.add("recevied")
          div.innerHTML = `<div class="toolpit-r"></div>
                <div class="receviedm">
                <p>${elem.msg}</p>
                  </div>
                  </div>`
          chatpage.insertAdjacentElement("beforeend", div)
        } else {
          console.log(`sen + ${el.name} + ${elem.msg}`)
          let div = document.createElement("div")
          div.classList.add("send")
          div.innerHTML = `
                <div class="sendm">
                <p>${elem.msg}</p>
                  </div>
                  <div class="toolpit-s"></div>
                `
          chatpage.insertAdjacentElement("beforeend", div)
        }
      })
    }
  })

  // console.log(chatpage)
})
