import React, {Component} from 'react';
import { Container } from 'flux-utils';
import { autobind } from 'core-decorators';

import HomeStore from './home-store';
import HomeAction from './home-action';

@autobind
class HomePage extends Component {
    static getStores() {
        return [HomeStore];
    }

    static calculateState() {
        return HomeStore.getAll(['count', 'stop']).toJS();
    }

    onIncrement() {
        HomeAction.increment();
    }

    onDecrement() {
        HomeAction.decrement();
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.onIncrement();
        } 
    }

    incrementAuto() {
        HomeAction.toggle();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.stop !== this.state.stop) {
            if (this.state.stop) {
                clearInterval(this.interval);
            } else {
                this.interval = setInterval(this.onIncrement, 500);
            }
        }
    }

    render() {
        const { count } = this.state;

        return (
            <div className="container">
                <h1>This is Home Page</h1>
                <p>
                    Clicked: {count} times
                    {' '}
                    <button onClick={this.onIncrement}>
                        +
                    </button>
                    {' '}
                    <button onClick={this.onDecrement}>
                        -
                    </button>
                    {' '}
                    <button onClick={this.incrementIfOdd}>
                        Increment if odd
                    </button>
                    {' '}
                    <button onClick={this.incrementAuto}>
                        {this.state.stop ? 'Start' : 'Stop' }
                    </button>
                </p>
            </div>
        );
    }
}

export default Container.create(HomePage);;