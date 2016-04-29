import Immutable from 'immutable';
import { MapStore } from 'flux-utils';
import dispatcher from 'dispatcher';

class HomeStore extends MapStore {
    getInitialState() {
        return Immutable.Map({
            count: 0,
            stop: true
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case 'home/toggle':
                return state.update('stop', stop => !stop);
                
            case 'home/increment':
                return state.update('count', count => count + 1);

            case 'home/decrement':
                return state.update('count', count => count - 1);

            default:
                return state;
        }
    }
}

export default new HomeStore(dispatcher);