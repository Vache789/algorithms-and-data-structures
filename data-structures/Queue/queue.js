class Queue {
    #queue;
    #front;
    #back;
    #size;
    #capacity;

    constructor(capacity = 2) {
        if (capacity < 2) {
            throw new Error('Capacity must be above or equal 2');
        }

        this.#queue = new Uint32Array(capacity).fill(null);
        this.#capacity = capacity;
        this.#size = 0;
        this.#back = -1;
        this.#front = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    isEmpty() {
        return this.#size === 0;
    }

    isFull() {
        return this.#size === this.#capacity;
    }

    clear() {
        this.#size = 0;
        this.#front = 0;
        this.#back = 0;
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if (this.isFull()) {
            throw new Error('Queue Overflow');
        }

        this.#back = (this.#back + 1) % this.#capacity;
        this.#queue[this.#back] = value;
        ++this.#size;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }

        let removed = this.#queue[this.#front];
        this.#front = (this.#front + 1) % this.#capacity;
        --this.#size;

        return removed;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }

        return this.#queue[this.#front];
    }

    back() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }

        return this.#queue[this.#back];
    }

    print() {
        for (let i = 0; i < this.#size; ++i) {
            let idx = (this.#front + i) % this.#capacity;
            console.log(this.#queue[idx]);
        }
    }
}