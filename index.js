// Library Code
function createStore (reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state.
    // 4. Update the state
  
    let state;
    let listeners = [];
  
    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l != listener)
        }
    };

    const dispatch = (action) => {
        // update the state
        state = reducer(state, action);

        // nofify the change in the state to the listeners
        listeners.forEach(listener => listener());
    }
  
    return {
        getState,
        subscribe,
        dispatch
    }
} 

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

//TODOS reducer
function todos(state=[], action) {
    switch(action.type) {
        case ADD_TODO :
          return state.concat([action.todo])
        case REMOVE_TODO :
          return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
          return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, { completed: !todo.completed }))
        default :
          return state
      }
}

// GOALS reducer
function goals(state=[], action) {
    switch(action.type) {
        case ADD_GOAL:
          return state.concat([action.goal])
        case REMOVE_GOAL:
          return state.filter((goal) => goal.id !== action.id)
        default :
          return state
      }
}

// Unique reducer
function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

// CODE
// Create store
const store = createStore(app);

// Subscribe to changes in the state
const unsubscribe = store.subscribe(() => console.log('state', store.getState()));

// Dispatch Action
store.dispatch(addTodoAction({
    id: 0,
    name: 'Eat healthy',
    completed: true
}));

store.dispatch(toggleTodoAction(0));
store.dispatch(removeTodoAction(0));

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
}));
store.dispatch(removeGoalAction(0));

// Unsubscribe
unsubscribe();

// Dispatch Action after unsubscribe
store.dispatch(addTodo);