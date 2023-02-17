//------------- Variables del codigo.--------------------
const car = document.querySelector('#carrito');
const contCar = document.querySelector('#lista-carrito tbody');
const emptyCarBtn = document.querySelector('#vaciar-cursos');
const listCursos = document.querySelector('#lista-cursos');
let addArticlesCart = [];


loadEventListeners();

function loadEventListeners() {
    //cuando aggregas u ncurso
    listCursos.addEventListener('click', addCourse); //addCourse agrega un curso
}


// ---------------  Funciones --------------------------
function addCourse(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;

        readDateCourse(cursoSelecionado);
    }

};

//lee el contenido del curso y lo extrae
function readDateCourse(curso) {

    //creo un objecto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
    }

    //Agrego elemento al arreglo del carrito
    addArticlesCart = [...addArticlesCart, infoCurso,];

    console.log(addArticlesCart);

    carritoHTML();
}

//  ------------ Muestra el Carrito en el HTML ---------------
function carritoHTML() {

    //limpiar el html
    limpiarHtml();

    //recorre el carrito y genera el html
    addArticlesCart.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        
        `;

        //agrega el html del carrito en el tbody
        contCar.appendChild(row);
    })
}

//elimina los curso del Tbody
function limpiarHtml(){

    //forma lenta
    // contCar.innerHTML = '';

    while(contCar.firstChild){
        contCar.removeChild(contCar.firstChild);
    }
}