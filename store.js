function todosReducer(state=[], action) {
    if (action.type === 'ADD_TODO') {
        return [...state, action.todo]
    }

    return state;
}

function createStore () {
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
        state = todosReducer(state, action);

        // nofify the change in the state to the listeners
        listeners.forEach(listener => listener());
    }
  
    return {
        getState,
        subscribe,
        dispatch
    }
} 

// Use
const store = createStore();

// Subscribe to changes in the state
const unsubscribe = store.subscribe(() => console.log('state', store.getState()));

// Unsubscribe
unsubscribe();