import { d } from './js/helpers'
import ToDoList from './js/todo-list'
import './scss/main.scss'

const task = d.querySelector('#task'),
  list = d.querySelector('#list'),
  todo = new ToDoList('edList')

todo.render()
