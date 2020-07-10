class Memento {
    constructor(state) {
        this._state = JSON.stringify(state);
    }

    get state() {
        return JSON.parse(this._state);
    }
}

class EventSource {
    constructor() {
        this.nums = [];
    }

    addNum(num) {
        this.nums.push(num);
    }

    getState() {
        return new Memento(this.nums);
    }

    restoreState(memento) {
        this.nums = memento.state;
    }
}

class EventSourcer {
    constructor() {
        this.eventSource = new EventSource();
        this.states = [];
        this.currentState = 0;
        this.value = 0;
    }

    saveState(state) {
        this.states.push(state);
        this.currentState = this.states.length - 1;
    }

    add(num) {
        console.log('add');
        if (this.currentState === 0) {
            this.value += num;
        } else {
            this.value += num;
        }

        this.eventSource.addNum(this.value)
        this.saveState(this.eventSource.getState())
    }

    subtract(num) {
        console.log('subtract');
        if (this.currentState === 0) {
            this.value -= num;

        } else {
            this.value -= num;

        }
        this.eventSource.addNum(this.value)
        this.saveState(this.eventSource.getState())
    }

    undo() {
        console.log('undo');
        if (this.currentState === 0) {
            return;
        }

        this.currentState -= 1;
        this.value = this.states[this.currentState].state[this.currentState];
        this.eventSource.restoreState(this.currentState);

    }

    bulk_undo(num) {
        console.log('bulk_undo');

        this.currentState = num - 1;
        this.value = this.states[this.currentState].state[this.currentState];
        this.eventSource.restoreState(this.currentState);

    }

    redo() {
        console.log('redo');
        if (this.currentState === this.states.length - 1) {
            return;
        }

        this.currentState += 1;
        this.eventSource.restoreState(this.currentState);

        this.value = this.states[this.currentState].state[this.currentState];
    }

    bulk_redo(num) {
        console.log('bulk_redo');

        this.currentState = num + 1;
        this.value = this.states[this.currentState].state[this.currentState];
        this.eventSource.restoreState(this.currentState);

    }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;