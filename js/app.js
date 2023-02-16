//Variables
const car = document.querySelector('#carrito');
const contCar = document.querySelector('#lista-carrito tbody');
const emptyCarBtn = document.querySelector('#vaciar-cursos');
const listCursos = document.querySelector('#lista-cursos');

loadEvenListener();

function loadEvenListener (){
    //cuando agrego un curso 
    listCursos.addEventListener('click', agregarCurso);
}

//Funciones

function agregarCurso(e){
    if( e.target.classList.contains('')){

    }
    console.log(e.);
}