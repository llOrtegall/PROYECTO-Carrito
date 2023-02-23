//------------- Variables del Codigo--------------------
const car = document.querySelector('#carrito');
const contCar = document.querySelector('#lista-carrito tbody');
const emptyCarBtn = document.querySelector('#vaciar-carrito');
const listCursos = document.querySelector('#lista-cursos');
let addArticlesCart = [];

loadEventListeners();

function loadEventListeners() {
    //Cuando aggregas u ncurso
    listCursos.addEventListener('click', addCourse); //addCourse agrega un curso

    //Elimina cursos del carrito
    car.addEventListener('click', deleteCourse);

    //Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        addArticlesCart = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    }); 
    //Vaciar el carrito
    emptyCarBtn.addEventListener('click', () => {
        addArticlesCart = []; //Reseteamos el arreglo

        limpiarHtml(); //Eliminamos todo el HTML
    });
}

// ---------------  Funciones ------------------------
function addCourse(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;

        readDateCourse(cursoSelecionado);
    }
};

//Eliminar Curso del Carrito
function deleteCourse(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulos del carrrito
        addArticlesCart = addArticlesCart.filter(curso => cursoId !== curso.id);

        carritoHTML(); //iteramos de nuvo en el carrito
    }
}
//Lee el contenido del curso y lo extrae
function readDateCourse(curso) {
    //Creo un objecto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Verificar si el producto ya existe en el carrito
    const existe = addArticlesCart.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = addArticlesCart.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objecto actualizado
            } else {
                return curso; // retoran objecto no duplicados 
            }
        });
        addArticlesCart = [...cursos];
    } else {
        //agregamos al carrito
        //Agrego elemento al arreglo del carrito
        addArticlesCart = [...addArticlesCart, infoCurso,];
    }
    carritoHTML();
}

//  ------------ Muestra el Carrito en el HTML ---------------
function carritoHTML() {

    //Limpiar el HTML
    limpiarHtml();

    //Recorre el carrito y genera el html
    addArticlesCart.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td> 
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
            </td> `;
        //Agrega el html del carrito en el tbody
        contCar.appendChild(row);
    })

    //Agregar El carrito de compras al local Storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(addArticlesCart));
}

//Elimina los curso del Tbody
function limpiarHtml() {
    //Forma lenta
    // ContCar.innerHTML = '';
    while (contCar.firstChild) {
        contCar.removeChild(contCar.firstChild);
    }
}