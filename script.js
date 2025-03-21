// TO-DO-LIST

// Capturando elementos

var text = document.getElementsByTagName('input')[0];
var btnSave = document.getElementById('btnSalvar');
var container = document.querySelector('.container');

// Função que gera tarefa

function newTask(txt){
    var tarefa = document.createElement('div');
    tarefa.classList.add('tarefa');

    var name = document.createElement('p');
    name.innerText = txt;
    tarefa.appendChild(name);
    
    var btnCheck = document.createElement('button');
    btnCheck.id = 'checkTask';
    tarefa.appendChild(btnCheck);
    var img0 = document.createElement('img');
    img0.src = 'assets/check.png';
    btnCheck.appendChild(img0);

    var btnDelete = document.createElement('button');
    btnDelete.id = 'deleteTask';
    tarefa.appendChild(btnDelete);
    var img1 = document.createElement('img');
    img1.src = 'assets/trash.png';
    btnDelete.appendChild(img1);

    container.appendChild(tarefa)
}

newTask('NomeTarefa')