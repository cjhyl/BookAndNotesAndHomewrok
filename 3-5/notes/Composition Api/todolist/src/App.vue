<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
        >
    </header>
    <section class="main" v-show="count">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li 
          v-for="(todo,i) in filteredTodos" 
          :key="i"
          :class="{ editing:todo === editingTodo, completed:todo.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="remove(todo)"></button>
          </div>
          <input 
            class="edit" 
            type="text" 
            v-editing-focus="todo === editingTodo"
            v-model="todo.text"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          >
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="count">
      <span class="todo-count">
        <strong>{{ remainingCount }}</strong> {{ remainingCount>1?'items':'item' }} left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="count>remainingCount">
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <!-- Remove the below line ↓ -->
    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Created by <a href="https://www.lagou.com">教瘦</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
import './assets/index.css'
import useLocalStorage from './utils/useLocalStorage'
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'

const storage = useLocalStorage()

// 1. 添加待办事项
const useAdd = todos => {
  const input = ref('')
  const addTodo = () => {
    const text = input.value && input.value.trim()
    if (text.length === 0) return
    todos.value.unshift({
      text,
      completed: false
    })
    input.value = ''
  }

  return {
    input,
    addTodo
  }
}

// 2. 删除待办事项
const useRemove = todos => {
  const remove = todo => {
    const index = todos.value.indexOf(todo)
    todos.value.splice(index,1)
  }

  const removeCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  return {
    remove,
    removeCompleted
  }
}

/*
 * 3. 编辑待办项
 * 双击待办项，展示编辑文本框
 * 按回车或者编辑文本框失去焦点，修改数据
 * 按esc取消编辑
 * 把编辑文本框清空按回车，删除这一项
 * 显示编辑文本框的时候获取焦点
 */
const useEdit = (remove) => {
  let beforeEditingText = ''
  const editingTodo = ref(null)

  const editTodo = todo => {
    beforeEditingText = todo.text
    editingTodo.value = todo
  }
  const doneEdit = todo => {
    if (!editingTodo.value) return
    todo.text = todo.text.trim()
    todo.text || remove(todo)
    editingTodo.value = null
  }
  const cancelEdit = todo => {
    editingTodo.value = null
    todo.text = beforeEditingText
  }

  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit
  }
}

/**
 * 4. 切换待办事项状态
 * 点击checkbox, 改变所有待办项状态
 * All/Active/Completed
 * 其他：
 *   显示未完成待办项个数
 *   移除所有完成的项目
 *   如果没有待办项，隐藏main和footer
 */
const useFilter = todos => {
  //getter setter模式的计算属性
  //全选
  const allDone = computed({
    get () {
      return !todos.value.filter(todo => !todo.completed).length
    },
    set (value) {
      todos.value.forEach(todo => {
        todo.completed = value
      })
    }
  })

  const filter = {
    all: list => list,
    active: list => list.filter(todo => !todo.completed),
    completed: list => list.filter(todo => todo.completed)
  }
  const type = ref('all')
  const filteredTodos = computed(() => filter[type.value](todos.value))
  const remainingCount = computed(() => filter.active(todos.value).length)
  const count = computed(() => todos.value.length)
  
  const onHashCHange = () => {
    const hash = window.location.hash.replace('#/','')
    if (filter[hash]) {
      type.value = hash
    } else {
      type.value = 'all'
      window.location.hash = ''
    }
  }

  onMounted(() => {
    window.addEventListener('hashchange', onHashCHange)
    onHashCHange()
  })

  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashCHange)
  })

  return {
    allDone,
    filteredTodos,
    remainingCount,
    count
  }
}

// 5. 本地存储
const useStorage = () => {
  const KEY = 'TODOKEY'
  const todos = ref(storage.getItem(KEY) || [])
  watchEffect(() => {
    storage.setItem(KEY, todos.value)
  })

  return todos
}

export default {
  name: 'App',
  components: {
  },
  setup () {
    const todos = useStorage()//ref([])
    const { remove, removeCompleted } = useRemove(todos)
    return {
      ...useAdd(todos),
      todos,
      remove,
      removeCompleted,
      ...useEdit(remove),
      ...useFilter(todos)
    }
  },
  directives: {
    editingFocus: (el, binding) => {
      binding.value && el.focus()
    }
  }
}
</script>

<style>
</style>
