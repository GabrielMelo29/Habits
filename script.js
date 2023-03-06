// ==================== adicionar titulo ====================
let listTitle = JSON.parse(localStorage.getItem("lista-titulo"))
const data = JSON.parse(localStorage.getItem("NLWhabits")) || {}


const newHabits = document.querySelector(".new-habits");
const btnHabit = document.querySelector(".btn-habit")
const titulos = document.querySelectorAll(".habits div")

const modalOptions = document.querySelector(".modal-options"),
  btnClose = document.querySelector("#close"),
  btnChange = document.querySelector("#change"),
  btnDelete = document.querySelector("#delete"),
  modalBackdrop = document.querySelector(".modal-backdrop");

btnHabit.addEventListener("click", addTitle)

// ---- adicionar titulo
function addTitle() {
  let myTitle = prompt("Digite o nome da tarefa")

  if (myTitle) {
    if (!listTitle) {
      listTitle = []
    }

    let titleInfo = { name: myTitle }
    listTitle.push(titleInfo)

    localStorage.setItem("lista-titulo", JSON.stringify(listTitle))
    showTitle()

  }
}

// ---- mostrar titulo
function showTitle() {
  let div = ""

  if (listTitle) {
    listTitle.forEach((myTitle, id) => {
      div += `<div class="habit" id="${id}" data-name="${myTitle.name}">${myTitle.name}</div>`
    })
  }
  newHabits.innerHTML = div
}
showTitle()

for (var titulo of titulos) {
  titulo.addEventListener("click", (e) => {
    let target = e.target,
      idEdit = target.id

    modalOptions.classList.add("active")
    modalBackdrop.classList.add("active")

    // ---- mudar titulo
    btnChange.onclick = function () {
      var newTitulo = window.prompt("Qual o título?")
      if (newTitulo != null && newTitulo != "") {
        target.innerHTML = newTitulo

        listTitle[idEdit].name = newTitulo
      }
      localStorage.setItem("lista-titulo", JSON.stringify(listTitle))
      closeOptions()
    }
    // ---- apagar titulo
    btnDelete.onclick = function () {
      listTitle.splice(idEdit, 1)
      localStorage.setItem("lista-titulo", JSON.stringify(listTitle))
      
      closeOptions()
      showTitle()
    }
  })
}

// ---- fechar options
btnClose.addEventListener("click", closeOptions);
function closeOptions() {
  modalOptions.classList.remove("active");
  modalBackdrop.classList.remove("active");
}



// ---- adicionar dias
const form = document.querySelector("#form-habits")
const button = document.querySelector("header button")
const nlwSetup = new NLWSetup(form)

button.addEventListener("click", addDay)
form.addEventListener("change", save)


function addDay() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)

  if (dayExists) {
    alert("Dia já incluso")
    return
  }

  nlwSetup.addDay(today)
}

function save() {
  localStorage.setItem("NLWhabits", JSON.stringify(nlwSetup.data))
}

nlwSetup.setData(data)
nlwSetup.load()
