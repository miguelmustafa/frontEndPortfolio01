const formOrador = document.getElementById('formAltaOrador');
const btnSave = document.getElementById('btnSave');
const tbOradores = document.getElementById('tbOradores');

formOrador.addEventListener('submit', function (e) {
    e.preventDefault();
});


const saveOrador = async ()=> {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const mail = document.getElementById('mail').value;
    const tema = document.getElementById('tema').value;

    const orador = {
        nombre,
        apellido,
        mail,
        tema
    }

    //debugger;

    await fetch('http://localhost:8080/wep-app/nuevo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orador),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta', data);
        })
        .catch(error => {
            console.error('Error', error);
        });

        cargaOradores();
}


const updateOrador = async (orador)=>{


    //debugger;

    await fetch('http://localhost:8080/wep-app/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orador),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta', data);
        })
        .catch(error => {
            //console.error('Error', error);
        });
}

btnSave.addEventListener('click', saveOrador);


const cargaOradores = ()=> {

    tbOradores.innerHTML = '';

    fetch('http://localhost:8080/wep-app/listado').then(resp=>
     resp.json()    
    ).then(data=> {
        console.log(data);
        data.forEach((x)=>{
         const tr = document.createElement('tr');
         debugger;
         tr.id = `idx${x.id}`;
         tr.innerHTML = `
         <th>${x.id}</th>
         <td class="nombre">${x.nombre}</td>
         <td class="apellido">${x.apellido}</td>
         <td class="mail">${x.mail}</td>
         <td class="tema">${x.tema}</td>
         <td class="fechaAlta">${x.fechaAlta}</td>
         <td class="fechaAlta">${x.fechaAlta}</td>
         <button class="btn btn-primary" onclick="editarOrador(${x.id})">Editar</button>
         <button class="btn btn-danger" onclick="deleteOrador(${x.id})">Eliminar</button>

         `
         tbOradores.appendChild(tr);
         console.log(tr);
        })

    }
    
    );


}

function editarOrador(id) {

    console.log(`idx${id}`);
  
    const fila = document.getElementById(`idx${id}`);

    console.log(fila);    
    
    const nombreElement = fila.querySelector('.nombre');
    const apellidoElement = fila.querySelector('.apellido');
    const emailElement = fila.querySelector('.mail');
    const temaElement = fila.querySelector('.tema');
  
    nombreElement.contentEditable = true;
    apellidoElement.contentEditable = true;
    emailElement.contentEditable = true;
    temaElement.contentEditable = true;
  
    const btnEditar = fila.querySelector('.btn');
    btnEditar.innerText = 'Guardar';
    btnEditar.removeEventListener('click', editarOrador);
    btnEditar.addEventListener('click', () => guardarOrador(id));
}

function guardarOrador(id) {

    const fila = document.getElementById(`idx${id}`);
   
    const nombreElement = fila.querySelector('.nombre');
    const apellidoElement = fila.querySelector('.apellido');
    const emailElement = fila.querySelector('.mail');
    const temaElement = fila.querySelector('.tema');

    nombreElement.contentEditable = false;
    apellidoElement.contentEditable = false;
    emailElement.contentEditable = false;
    temaElement.contentEditable = false;

    const orador = {
    id,
    nombre:nombreElement.textContent,
    apellido:apellidoElement.textContent,
    mail:emailElement.textContent,
    tema:temaElement.textContent,
    }

    console.log(orador);

    updateOrador(orador);
 
    const btnEditar = fila.querySelector('.btn');
    btnEditar.innerText = 'Editar';
    btnEditar.removeEventListener('click', guardarOrador);
    btnEditar.addEventListener('click', () => editarOrador(id));

}


cargaOradores();