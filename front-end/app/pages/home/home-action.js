import { dispatch } from 'dispatcher';

let HomeAction = {
    toggle() {
        dispatch({ type: 'home/toggle' });
    },
    
    increment() {
        dispatch({ type: 'home/increment' });
    },

    decrement() {
        dispatch({ type: 'home/decrement' });
    }
};

export default HomeAction;