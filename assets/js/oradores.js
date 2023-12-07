const formOrador = document.getElementById('formAltaOrador');
const btnSave = document.getElementById('btnSave');
const tbOradores = document.getElementById('tbOradores');
let modoEdicion = false;
let oradores = [];

formOrador.addEventListener('submit', function (e) {
    e.preventDefault();
});


const saveOrador = async () => {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const mail = document.getElementById('mail').value;
    const tema = document.getElementById('tema').value;

    if (!nombre || !apellido || !mail || !tema)
        return;

    const orador = {
        nombre,
        apellido,
        mail,
        tema
    }

    await fetch('http://localhost:8080/wep-app/orador', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orador),
    })
        .then(response => response.json())
        .then(data => {
            const { message } = data;
            console.log('Respuesta', message);
            if (message)
                Swal.fire(message);

        })
        .catch(error => {

            const { message } = error.cause;
            console.error('Error', { message });
        });

    cargaOradores();
}

const deleteOrador = (id) => {

    const tr = document.getElementById(`idx${id}`);

    Swal.fire({
        title: "Desea eliminar el orador?",
        showCancelButton: true,
        confirmButtonText: "SI"
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`http://localhost:8080/wep-app/orador?id=${id}`, {method: 'DELETE'})
                .then(resp => {
                    tr.remove();
                })
                .catch(err => console.log(err));

            Swal.fire("Eliminado!", "", "success");

        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}


const updateOrador = async (orador) => {

    return fetch('http://localhost:8080/wep-app/orador', {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orador),
    })
        .then(response => response.json())
        .then(data => {
            const { message } = data;

            if (message) {
                return message;
            }

        })
        .catch(error => {
            //console.error('Error', error);
        });

}

btnSave.addEventListener('click', saveOrador);

const cargaOradores = () => {

    tbOradores.innerHTML = '';

    fetch('http://localhost:8080/wep-app/orador',{method: 'GET'}).then(resp =>
        resp.json()
    ).then(data => {
        //console.log(data);
        oradores = data;
        data.forEach((x) => {
            const tr = document.createElement('tr');
            tr.id = `idx${x.id}`;
            tr.innerHTML = `
         <th>${x.id}</th>
         <td class="nombre">${x.nombre}</td>
         <td class="apellido">${x.apellido}</td>
         <td class="mail">${x.mail}</td>
         <td class="tema">${x.tema}</td>
         <td class="fechaAlta">${x.fechaAlta}</td>         
         <td
         <div> 
         <button class="btn btn-sm btn-primary" onclick="editarOrador(${x.id})">Editar</button>
         <button class="btn btn-sm btn-danger" onclick="deleteOrador(${x.id})">Eliminar</button>
         </div>
         </td>
         `
            tbOradores.appendChild(tr);
        })
    }
    );
}

function editarOrador(id) {

    const fila = document.getElementById(`idx${id}`);

    modoEdicion = !modoEdicion;

    if (!modoEdicion) {
        guardarOrador(id);
        return;
    }

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
    //btnEditar.removeEventListener('click', editarOrador);
    //btnEditar.addEventListener('click', () => guardarOrador(id));
}

async function guardarOrador(id) {

    const fila = document.getElementById(`idx${id}`);

    if (modoEdicion)
        return;

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
        nombre: nombreElement.textContent,
        apellido: apellidoElement.textContent,
        mail: emailElement.textContent,
        tema: temaElement.textContent,
    }

    const ko = await updateOrador(orador);

    if (ko) {
        const { mail } = oradores.find(x => x.id === id);
        emailElement.textContent = mail;
        Swal.fire(ko);
    }

    const btnEditar = fila.querySelector('.btn');
    btnEditar.innerText = 'Editar';

    modoEdicion = false;
    //btnEditar.removeEventListener('click', guardarOrador);
    //btnEditar.addEventListener('click', editarOrador.bind(null, id));
}

cargaOradores();