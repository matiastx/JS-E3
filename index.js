const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// Declarando Variables
const frmBusqueda = document.querySelector(".frm-buscar");
const txtBusqueda = document.querySelector(".frm-text");
const ErrorMsg = document.querySelector(".error-msg");
const CardBusqueda = document.querySelector(".resultContainer");

let ContBusqueda = 0;
let UltimaBusqueda = JSON.parse(localStorage.getItem("LastSearch")) || [];

const saveOnLocalStorage = () => {
  localStorage.setItem("LastSearch", JSON.stringify(UltimaBusqueda));
};

// Funciones Adicionales
const ShowError = (mensaje) => {
  ErrorMsg.textContent = mensaje;
};

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isNumber = (input) => {
  const re = /^[0-9]+$/;
  return !re.test(input.value.trim());
};

const notExist = (input) => {
  return !pizzas.some((item) => item.id == input.value.trim());
};

const BorrarBusqueda = () => {
  CardBusqueda.innerHTML = "";
  CardBusqueda.style.display = "none";
  txtBusqueda.value = "";
};

// Funciones de Validacion

const validation = () => {
  let valid = false;
  if (isEmpty(txtBusqueda)) {
    ShowError("Este campo es obligatorio");
    BorrarBusqueda();
    return;
  }

  if (isNumber(txtBusqueda)) {
    ShowError("Este campo es solo puede ser un numero");
    BorrarBusqueda();
    return;
  }

  if (notExist(txtBusqueda)) {
    ShowError("Esta Opcion no existe");
    BorrarBusqueda();
    return;
  }

  valid = true;
  ErrorMsg.textContent = "";
  return valid;
};

// Render de la Card
const renderPizza = (item) => {
  const ingredientes = item.ingredientes;
  return `
        <img class="resultContainerImg" src="${item.imagen}" />
        <div class="resultContainerInfo">
          <p>
            Opcion:&nbsp
            <span class="resultId">${item.id}</span>
          </p>
          <h2 class="resultNombrePizza">${item.nombre}</h2>
          <h3 class="resultPrecio">$ ${item.precio}</h3>
          <p>Ingredientes:</p>
          ${ingredientes
            .map((ingrediente) => {
              return `
              <p id="ingrList">* ${ingrediente}</p>`;
            })
            .join("")}
        </div>
  `;
};

const toggleErrorMsg = () => {
  if (ContBusqueda !== 0) {
    ErrorMsg.classList.remove("green-msg");
    ErrorMsg.classList.add("red-msg");
    return;
  }
  ErrorMsg.classList.remove("red-msg");
  ErrorMsg.classList.add("green-msg");
};

const submitHandler = (e) => {
  e.preventDefault();

  if (validation()) {
    UltimaBusqueda = pizzas.find((item) => item.id == txtBusqueda.value.trim());
    CardBusqueda.innerHTML = renderPizza(UltimaBusqueda);
    saveOnLocalStorage();
    CardBusqueda.style.display = "flex";
    txtBusqueda.value = "";
  }
  ContBusqueda++;
  toggleErrorMsg();
};

const LastSearchRender = () => {
  console.log(ContBusqueda);
  CardBusqueda.innerHTML = renderPizza(UltimaBusqueda);
  CardBusqueda.style.display = "flex";
  toggleErrorMsg();
  ShowError("* Ultima Busqueda Realizada");
};

//init
const init = () => {
  frmBusqueda.addEventListener("submit", submitHandler);
  LastSearchRender();
};

init();
