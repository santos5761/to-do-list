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
    img0.addEventListener('click', function(){check(img0)})
    tarefa.addEventListener('dblclick', function(){
        check(img0)
    })

    // Deletando uma tarefa
    btnDelete.addEventListener('click',function(){
        deleteTask(txt)
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

// Fazendo o check da tarefa fora da criação do card
// setTimeOut de 1 segundo para todos os elementos serem carreados
setTimeout(() => {
    var imgChecks = document.getElementsByClassName('imagens');
    var checksArray = Array.from(imgChecks);
    console.log(checksArray);

    checksArray.forEach(img=>{
        img.addEventListener('click', function(img){
            check(img)
        })
    })

    

}, 1000); 


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

// Função que salva nova task
function saveTask(){
        // Verifica se a tarefa não está sendo criada vazia
        if(text.value != ''){
            // Trazendo todos os elementos do localStorage
            var recoveryArray = JSON.parse(localStorage.getItem('Tarefas'))

            // Verifica se já existe uma task com esse nome
            if(!recoveryArray.includes(text.value)){
            // Adicionando o novo valor ao array
            recoveryArray.push(text.value);
            text.value = '';
            text.placeholder = 'Insira o nome da tarefa aqui' 
        }
            else{
                text.value = ''
                text.placeholder = 'Esse item já existe!'
            }
            // Devolvend o array para o localStorage
            localStorage.setItem('Tarefas', JSON.stringify(recoveryArray));
        
            // Executando a função que traz as tasks
            trazendoTasks()
        
            // Limpa o input de texto
            
        }
        // Caso vazia, muda o placeholder do input
        else{
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
function deleteTask(txt){
    var fullArray = JSON.parse(localStorage.getItem('Tarefas'));
    var index = fullArray.indexOf(txt);
    fullArray.splice(index, 1); 
    if(fullArray.length>0){
        localStorage.setItem('Tarefas', JSON.stringify(fullArray));
    }

    else{
        localStorage.setItem('Tarefas', JSON.stringify(array))
    }
    
    trazendoTasks();
}