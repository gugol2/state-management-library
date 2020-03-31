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

//TODOS reducer
function todos(state=[], action) {
    switch(action.type) {
        case 'ADD_TODO' :
          return state.concat([action.todo])
        case 'REMOVE_TODO' :
          return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
          return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, { completed: !todo.completed }))
        default :
          return state
      }
}

// GOALS reducer
function goals(state=[], action) {
    switch(action.type) {
        case 'ADD_GOAL' :
          return state.concat([action.goal])
        case 'REMOVE_GOAL' :
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

const addTodo = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Eat healthy',
        completed: true
    }
};

const removeTodo = {
    type: 'REMOVE_TODO',
    id: 0
};

const toggleTodo = {
    type: 'TOGGLE_TODO',
    id: 0
};

// Dispatch Action
store.dispatch(addTodo);
store.dispatch(toggleTodo);
store.dispatch(removeTodo);
store.dispatch({
    type: 'ADD_GOAL',
    goal: {
      id: 0,
      name: 'Learn Redux'
    }
});
store.dispatch({
    type: 'REMOVE_GOAL',
    id: 0
});

// Unsubscribe
unsubscribe();

// Dispatch Action after unsubscribe
store.dispatch(addTodo);