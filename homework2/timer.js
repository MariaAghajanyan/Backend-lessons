const EventEmitter=require('events')
class Timer extends EventEmitter {
    constructor(duration) {
        super();
        this.duration = duration;
    }

    start() {
        this.emit('start');  
        let remainingTime = this.duration;
        
        while (remainingTime > 0) {
            this.emit('tick', remainingTime);  
            remainingTime--;
        }
        
        this.emit('end'); 
    }
}