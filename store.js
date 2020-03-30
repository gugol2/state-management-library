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
            listener.filter(l => l != listener)
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


// App Code
function todosReducer(state=[], action) {
    if (action.type === 'ADD_TODO') {
        return [...state, action.todo]
    }

    return state;
}

// Use
const store = createStore(todosReducer);

// Subscribe to changes in the state
const unsubscribe = store.subscribe(() => console.log('state', store.getState()));

// Unsubscribe
unsubscribe();