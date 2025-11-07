const btn1 = document.getElementById("btn-1")
const btn2 = document.getElementById("btn-2")
const btn3 = document.getElementById("btn-3")
const questao = document.querySelector(".questao")
const questao2 = document.querySelector(".questao2")
const questao3 = document.querySelector(".questao3")
const resultado = document.querySelector(".resultado")


btn1.addEventListener("click", () => {
    questao.style.display = "none"
    questao2.style.display = "flex"
})

btn2.addEventListener("click", () => {
    questao2.style.display = "none"
    questao3.style.display = "flex"
})

btn3.addEventListener("click", () => {
    questao3.style.display = "none"
    resultado.style.display = "flex"
})
