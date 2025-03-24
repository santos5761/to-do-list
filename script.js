// TO-DO-LIST

// Capturando elementos
var text = document.getElementsByTagName('input')[0];
var btnSave = document.getElementById('btnSalvar');
var container = document.querySelector('.container');

// Criando um array no localstorage
var array = [];
// Traz a key Tarefas do localStorage
var chaves = localStorage.key('Tarefas');
// Verifica se essa chave existe
if(chaves == null){
    // Caso não existam, estabelece a chave com o valor de um array vazio
    localStorage.setItem('Tarefas', JSON.stringify(array))
}
// Função que gera tarefa

function newTask(txt){
    // Criando e anexando cada elemento da task
    var tarefa = document.createElement('div');
    tarefa.classList.add('tarefa');
    // txt da task
    var name = document.createElement('p');
    name.innerText = txt;
    tarefa.appendChild(name);
    // btn de check da task
    var btnCheck = document.createElement('button');
    btnCheck.id = 'checkTask';
    tarefa.appendChild(btnCheck);
    var img0 = document.createElement('img');
    img0.src = 'http://127.0.0.1:5500/assets/png.webp'
    btnCheck.appendChild(img0);
    // btn delete da task
    var btnDelete = document.createElement('button');
    btnDelete.id = 'deleteTask';
    tarefa.appendChild(btnDelete);
    var img1 = document.createElement('img');
    img1.src = 'assets/trash.png';
    btnDelete.appendChild(img1);
    // anexando task ao container
    container.appendChild(tarefa)

    // Fazendo o check da tarefa
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
    else{
        img.src = 'assets/check.png'
    }
}

// Função que traz todas as tasks armazenadas
function trazendoTasks(){
    // Limpando Container
    container.innerHTML = '';

    // Trazendo conteudo do localStorage
    var recoveryTasks = JSON.parse(localStorage.getItem('Tarefas'));
    // Percorrendo cada elemento do localStorage e aplicando a função que gera car da tarefa
    recoveryTasks.forEach(nameTask => {
        newTask(nameTask)
    });
}

// Trazendo tasks que estão no localStorage ao entrar no site
 trazendoTasks()

// Adicionando nova Task ao clicar no btnSave
btnSave.addEventListener('click', function(){
    // Trazendo todos os elementos do localStorage
    var recoveryArray = JSON.parse(localStorage.getItem('Tarefas'))
    // Adicionando o novo valor ao array
    recoveryArray.push(text.value)
    // Devolvend o array para o localStorage
    localStorage.setItem('Tarefas', JSON.stringify(recoveryArray));

    // Executando a função que traz as tasks
    trazendoTasks()
})

