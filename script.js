// TO-DO-LIST

// Capturando elementos
var text = document.getElementsByTagName('input')[0];
var btnSave = document.getElementById('btnSalvar');
var btnLimpar = document.getElementById('btnLimpar');
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

function newTask(task){
    // Criando e anexando cada elemento da task
    var tarefa = document.createElement('div');
    tarefa.classList.add('tarefa');
    // txt da task
    var name = document.createElement('p');
    name.innerText = task.name;
    tarefa.appendChild(name);
    // btn de check da task
    var btnCheck = document.createElement('button');
    btnCheck.id = 'checkTask';
    tarefa.appendChild(btnCheck);

    var img0 = document.createElement('img');
     img0.src = task.checked ? 'assets/check.png' : 'assets/png.webp'; // Aplica estado salvo
    btnCheck.appendChild(img0);
    img0.classList.add('imagens')
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
    tarefa.addEventListener('dblclick', function(){
        check(img0)
    })

    // Fazendo o check da task
    // Fazendo o check da tarefa e salvando o estado
    img0.addEventListener('click', function () {
        task.checked = !task.checked; // Alterna estado
        img0.src = task.checked ? 'assets/check.png' : 'assets/png.webp';
        updateTask(task); // Salva mudança no localStorage
    });

    // Deletando uma tarefa
    btnDelete.addEventListener('click',function(){
        deleteTask(task)
    })

}

// Função que traz todas as tasks armazenadas
function trazendoTasks(){
    // Limpando Container
    container.innerHTML = '';

    // Trazendo conteudo do localStorage
    var recoveryTasks = JSON.parse(localStorage.getItem('Tarefas'));
    // Percorrendo cada elemento do localStorage e aplicando a função que gera car da tarefa
    recoveryTasks.forEach(task => {
        newTask(task)
    });
}

// Trazendo tasks que estão no localStorage ao entrar no site
 trazendoTasks()

// Função que salva nova task
function saveTask() {
    if (text.value != '') {
        var recoveryArray = JSON.parse(localStorage.getItem('Tarefas'));

        if (!recoveryArray.some(task => task.name === text.value)) {
            recoveryArray.push({ name: text.value, checked: false }); // Agora armazena o estado checked
            text.value = '';
            text.placeholder = 'Insira o nome da tarefa aqui';
        } else {
            text.value = '';
            text.placeholder = 'Esse item já existe!';
        }

        localStorage.setItem('Tarefas', JSON.stringify(recoveryArray));
        trazendoTasks();
    } else {
        text.placeholder = 'A tarefa deve ter um nome!!!';
    }
}

// Adicionando nova Task ao clicar no btnSave
btnSave.addEventListener('click', function(){
    saveTask();
})

// Adicionando nova Task ao pressionar a tecla Enter
text.addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
        saveTask();
    }
})

// Limpando Lista de tarefas
btnLimpar.addEventListener('click', function(){
    // Limpa o localStorage
    localStorage.removeItem('Tarefas');
    // Limpa o container
    container.innerHTML = '';
    // Adiciona novamente key e value 
    localStorage.setItem('Tarefas', JSON.stringify(array))
})

// Função que apaga task
function deleteTask(task) {
    var fullArray = JSON.parse(localStorage.getItem('Tarefas'));
    
    // Encontrar o índice corretamente usando findIndex()
    var index = fullArray.findIndex(t => t.name === task.name);
    
    if (index !== -1) {
        fullArray.splice(index, 1); // Remove a tarefa do array
    }

    localStorage.setItem('Tarefas', JSON.stringify(fullArray)); // Atualiza o LocalStorage
    
    trazendoTasks(); // Atualiza a interface
}

// Salvando mudanças de marcação do usuário;
function updateTask(updatedTask) {
    var recoveryArray = JSON.parse(localStorage.getItem('Tarefas'));

    var index = recoveryArray.findIndex(task => task.name === updatedTask.name);
    if (index !== -1) {
        recoveryArray[index] = updatedTask;
        localStorage.setItem('Tarefas', JSON.stringify(recoveryArray));
    }
}
