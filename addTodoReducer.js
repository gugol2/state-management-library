export function todosReducer(state=[], action) {
    if (action.type === 'ADD_TODO') {
        return [...state, action.todo]
    }

    return state;
}