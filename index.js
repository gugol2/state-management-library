import { createStore } from "./store";
import { todosReducer } from "./todosReducer";

// Create store
const store = createStore(todosReducer);

// Subscribe to changes in the state
const unsubscribe = store.subscribe(() => console.log('state', store.getState()));

const todoAction = {
    type: 'ADD_TODO',
    todo: 'First TODO'
};

// Dispatch Action
store.dispatch(todoAction);

// Unsubscribe
unsubscribe();

// Dispatch Action after unsubscribe
store.dispatch(todoAction);