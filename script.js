// TO-DO-LIST

// Capturando elementos

var text = document.getElementsByTagName('input')[0];
var btnSave = document.getElementById('btnSalvar');
var container = document.querySelector('.container');

// Criando um array no localstorage
var array = [];
localStorage.setItem('Tarefas', JSON.stringify(array))
// Função que gera tarefa

function newTask(txt){
    // Criando e anexando cada elemento da task
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

    // Fazendo o check da tarefa
    img0.addEventListener('click', function(){check(img0)})
    tarefa.addEventListener('dblclick', function(){
        check(img0)
    })

    // Armazenando no localStorage
    var recoveryArray = JSON.parse(localStorage.getItem('Tarefas'))
    recoveryArray.push(txt)
    localStorage.setItem('Tarefas', JSON.stringify(recoveryArray))

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

// Função que deleta Task

newTask('NomeTarefa')


// Função que traz todas as tasks armazenadas
function trazendoTasks(){
    var recoveryTasks = JSON.parse(localStorage.getItem('Tarefas'));
    recoveryTasks.forEach(nameTask => {
        newTask(nameTask)
    });
}

// Trazendo tasks que estão no localStorage ao entrar no site
trazendoTasks()

// Adicionando nova Task
