// TODO LIST
const todos = [
    'Buy car signal light|16/1/2021',
    'Return bycycle brake|17/1/2021',
    'Buy A4 Paper',
    'Install Garage Shed|18/1/2021',
    'Service PC|18/1/2021',
    'Fix rooftops|19/1/2021',
    'Watching TV series|19/1/2021',
    'Buy new toys|19/1/2021',
    'Playing Mobile Legends'
]

function splitTodos(todos) {
    // code here
    let outputArray = []
    let innerArray = []
    let temp = ''
    for (let i = 0; i < todos.length; i++) {
        // console.log(todos[i]);t
        // temp = ''
        innerArray = []
        for (let j = 0; j < todos[i].length + 1; j++) {
            // console.log(todos[i][j]);
            let perHuruf = todos[i][j]
            if (perHuruf === '|' || perHuruf === undefined) {
                innerArray.push(temp)
                temp = ''
            } else {
                temp += perHuruf
            }
        }
        if (innerArray.length < 2) {
            innerArray.push('')
        }
        outputArray.push(innerArray)
        // console.log(innerArray)
    }
    return outputArray
}

function filterTodos(todos) {
    // your code here
    // kalo index ke 1 kosong di hilangin
    // console.log(todos, '<<<<<<<<<<<')
    let outputArray = []
    for (let i = 0; i < todos.length; i++) {
        // console.log(todos[i][1]);
        if (todos[i][1] !== '') {
            outputArray.push(todos[i])
        }
    }
    return outputArray
}

function todoStatus(todos, date) {
    // your code here
    for (let i = 0; i < todos.length; i++) {
        // console.log(todos[i]);
        // console.log(`${todos[i][1][todos[i][1].length - 9]}${todos[i][1][todos[i][1].length - 8]}`);
        let perDate = `${todos[i][1][todos[i][1].length - 9]}${todos[i][1][todos[i][1].length - 8]}`
        if (+perDate < date) {
            todos[i].push('done')
        } else if (+perDate > date){
            todos[i].push('pending')
        } else if (+perDate === date) {
            todos[i].push('ongoing')
        }
    }
    return todos
}

function todoStatistic(todos) {
    // your code here
    let outputObj = {}
    for (let i = 0; i < todos.length; i++) {
        let perStatus = todos[i][2]
        // console.log(perStatus);

        if (outputObj[perStatus] === undefined) {
            outputObj[perStatus] = 1
        } else {
            outputObj[perStatus]++
        }
    }
    return outputObj
}

function generateTodo(todos, date) {
    // your code here
    let hasilSplit = splitTodos(todos)
    let hasilFilter = filterTodos(hasilSplit)
    let hasilTodoStatus = todoStatus(hasilFilter, date)
    let hasilTodoStatistic = todoStatistic(hasilTodoStatus)
    // return hasilTodoStatistic

    let outputObj = {}
    let arr = []
    for (let i = 0; i < hasilTodoStatus.length; i++) {
        // console.log(hasilTodoStatus[i]);
        let innerObj = {}
        let perName = hasilTodoStatus[i][0]
        let perDueDate = hasilTodoStatus[i][1]
        let perStatus = hasilTodoStatus[i][2]
        // console.log(perName, perDueDate, perStatus);
        
        // outputObj.statistic = hasilTodoStatistic // * Mendingan di taruh di luar, walaupun hasilnya sama tapi bad practice ex: ada 1 kotak diisi 1 batu, lalu di ulang lagi 100x isinya tetap 1 batu di kotak itu  (ini disebut reassign '='), kalo ditambah ('+=') baru isinya akan 100 batu 
        // outputObj.todos = arr // * Mendingan di taruh di bawah, output nya akan tetap sama, penjelasan ada di atas ^^^
        innerObj = {
            name: perName,
            dueDate: perDueDate,
            status: perStatus,
        }
        arr.push(innerObj)
    }
    
    outputObj.statistic = hasilTodoStatistic // * Di taruh sini
    outputObj.todos = arr // * Di taruh sini
    return outputObj
}

console.log(generateTodo(todos, 18))
/**
 * {
    statistic: { done: 2, ongoing: 2, pending: 3 },
    todos: [
        {
            name: 'Buy car signal light',
            dueDate: '16/1/2021',
            status: 'done'
        },
        {
            name: 'Return bycycle brake',
            dueDate: '17/1/2021',
            status: 'done'
        },
        {
            name: 'Install Garage Shed',
            dueDate: '18/1/2021',
            status: 'ongoing'
        },
        { name: 'Service PC', dueDate: '18/1/2021', status: 'ongoing' },
        { name: 'Fix rooftops', dueDate: '19/1/2021', status: 'pending' },
        {
            name: 'Watching TV series',
            dueDate: '19/1/2021',
            status: 'pending'
        },
        { name: 'Buy new toys', dueDate: '19/1/2021', status: 'pending' }
    ]
  }
 */

// Silahkan tulis kode kamu untuk Manipulasi DOM disini
let output = generateTodo(todos, 18)
let done = document.getElementById('doneNumber')
done.innerHTML = output.statistic.done
let ongoing = document.getElementById('ongoingNumber')
ongoing.innerHTML = output.statistic.ongoing
let pending = document.getElementById('pendingNumber')
pending.innerHTML = output.statistic.pending


// RENDER DI BROWSER
// selectors
const todoList = document.querySelector('.todo-list')

// ABAIKAN code dibawah ini
function render() {
//   get todo list
  let todoObject = generateTodo(todos, 18) //!
//   put all task to html
  for (let i = 0; i < todoObject.todos.length; i++) { //!
    // create div
    const todo = document.createElement('div')
    todo.classList.add('todo')
    // create list
    const newTodo = document.createElement('li') //!
    newTodo.innerText = `${todoObject.todos[i].name} -- ${todoObject.todos[i].dueDate}`
    newTodo.classList.add('todo-item')
    todo.appendChild(newTodo)

    // create completed button
    const infoButton = document.createElement('button')
    infoButton.innerHTML = todoObject.todos[i].status[0].toUpperCase() + todoObject.todos[i].status.substring(1)
    if (infoButton.innerHTML === 'Done') {
      infoButton.classList.add('done-btn')
    } else if (infoButton.innerHTML === 'Ongoing') {
      infoButton.classList.add('ongoing-btn')
    } else {
      infoButton.classList.add('pending-btn')
    }
    todo.appendChild(infoButton)
    // append to todoList
    todoList.appendChild(todo)
  }
}
render()

// Uncomment baris ini untuk melakukan testing
// Comment juga semua code yang berhubungan dengan DOM untuk menjalankan testing
module.exports = {
  splitTodos,
  filterTodos,
  todoStatus,
  todoStatistic,
  generateTodo
}
