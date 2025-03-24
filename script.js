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
    img0.src = 'http://127.0.0.1:5500/assets/png.webp'
    btnCheck.appendChild(img0);

    var btnDelete = document.createElement('button');
    btnDelete.id = 'deleteTask';
    tarefa.appendChild(btnDelete);
    var img1 = document.createElement('img');
    img1.src = 'assets/trash.png';
    btnDelete.appendChild(img1);

    container.appendChild(tarefa)

    img0.addEventListener('click', function(){check(img0)})
    tarefa.addEventListener('dblclick', function(){
        check(img0)
    })
}

// Função que alterna a confirmação da tarefa
function check(img){
    if(img.src == 'http://127.0.0.1:5500/assets/check.png'){
        img.src = 'assets/png.webp';
    }
    else if(img.src == 'http://127.0.0.1:5500/assets/png.webp'){
        img.src = 'assets/check.png'
    }
    
}

newTask('NomeTarefa')