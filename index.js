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

// Reducer
function todo(state=[], action) {
    switch(action.type) {
        case 'ADD_TODO' :
          return state.concat([action.todo])
        case 'REMOVE_TODO' :
          return state.filter((todo) => todo.id !== action.todo.id)
        case 'TOGGLE_TODO' :
          return state.map((todo) => todo.id !== action.todo.id ? todo :Object.assign({}, todo, { complete: !todo.complete }))
        default :
          return state
      }
}

// CODE
// Create store
const store = createStore(todo);

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
    todo: {
        id: 0
    }
};

const toggleTodo = {
    type: 'TOGGLE_TODO',
    todo: {
        id: 0
    }
};

// Dispatch Action
store.dispatch(addTodo);
store.dispatch(toggleTodo);
store.dispatch(removeTodo);

// Unsubscribe
unsubscribe();

// Dispatch Action after unsubscribe
store.dispatch(addTodo);