const Restriction = require('hacktiv8-restriction')
const {splitTodos, filterTodos, todoStatus, todoStatistic, generateTodo} = require('./../index')

describe('Todo App Basic', () => {
  it('Should split a string into an Array in splitTodos function (20)', () => {
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

    const expected = [
      ['Buy car signal light', '16/1/2021'],
      ['Return bycycle brake', '17/1/2021'],
      ['Buy A4 Paper', ''],
      ['Install Garage Shed', '18/1/2021'],
      ['Service PC', '18/1/2021'],
      ['Fix rooftops', '19/1/2021'],
      ['Watching TV series', '19/1/2021'],
      ['Buy new toys', '19/1/2021'],
      ['Playing Mobile Legends', '']
    ]

    expect(splitTodos(todos)).toEqual(expect.arrayContaining(expected))
  })

  it('Should filter a todo without dueDate in filterTodos function (20)', () => {
    const todos = [
      ['Buy car signal light', '16/1/2021'],
      ['Return bycycle brake', '17/1/2021'],
      ['Buy A4 Paper', ''],
      ['Install Garage Shed', '18/1/2021'],
      ['Service PC', '18/1/2021'],
      ['Fix rooftops', '19/1/2021'],
      ['Watching TV series', '19/1/2021'],
      ['Buy new toys', '19/1/2021'],
      ['Playing Mobile Legends', '']
    ]

    const expected = [
      ['Buy car signal light', '16/1/2021'],
      ['Return bycycle brake', '17/1/2021'],
      ['Install Garage Shed', '18/1/2021'],
      ['Service PC', '18/1/2021'],
      ['Fix rooftops', '19/1/2021'],
      ['Watching TV series', '19/1/2021'],
      ['Buy new toys', '19/1/2021']
    ]

    expect(filterTodos(todos)).toEqual(expect.arrayContaining(expected))
  })

  it('Should generate each todo with the correct status (20)', () => {
    const todos = [
      ['Buy car signal light', '16/1/2021'],
      ['Return bycycle brake', '17/1/2021'],
      ['Install Garage Shed', '18/1/2021'],
      ['Service PC', '18/1/2021'],
      ['Fix rooftops', '19/1/2021'],
      ['Watching TV series', '19/1/2021'],
      ['Buy new toys', '19/1/2021']
    ]

    const expected = [
      ['Buy car signal light', '16/1/2021', 'done'],
      ['Return bycycle brake', '17/1/2021', 'done'],
      ['Install Garage Shed', '18/1/2021', 'ongoing'],
      ['Service PC', '18/1/2021', 'ongoing'],
      ['Fix rooftops', '19/1/2021', 'pending'],
      ['Watching TV series', '19/1/2021', 'pending'],
      ['Buy new toys', '19/1/2021', 'pending']
    ]

    expect(todoStatus(todos, 18)).toEqual(expect.arrayContaining(expected))
  })

  it('Should generate a statistic for each status in todoStatistic function (20)', () => {
    const todos = [
      ['Buy car signal light', '16/1/2021', 'done'],
      ['Return bycycle brake', '17/1/2021', 'done'],
      ['Install Garage Shed', '18/1/2021', 'ongoing'],
      ['Service PC', '18/1/2021', 'ongoing'],
      ['Fix rooftops', '19/1/2021', 'pending'],
      ['Watching TV series', '19/1/2021', 'pending'],
      ['Buy new toys', '19/1/2021', 'pending']
    ]

    const expected = {
      done: 2,
      ongoing: 2,
      pending: 3
    }

    expect(todoStatistic(todos)).toEqual(expected)
  })

  it('Should generate all data needeed for our todolist in generateTodo cuntion (20)', () => {
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

    const expected = {
      statistic: {done: 2, ongoing: 2, pending: 3},
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
        {name: 'Service PC', dueDate: '18/1/2021', status: 'ongoing'},
        {name: 'Fix rooftops', dueDate: '19/1/2021', status: 'pending'},
        {
          name: 'Watching TV series',
          dueDate: '19/1/2021',
          status: 'pending'
        },
        {name: 'Buy new toys', dueDate: '19/1/2021', status: 'pending'}
      ]
    }

    expect(generateTodo(todos, 18)).toEqual(expected)
  })

  it('Check restriction (-20)', async () => {
    const checkRestriction = new Restriction('../index.js')
    checkRestriction.rules = ['match', 'split', 'concat', 'search']
    const result = await checkRestriction.readCode()
    expect(result).toBe(null)
  })
})
