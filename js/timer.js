export default class Timer{
    #element;
    constructor(elem){
        this.#element = document.querySelector(elem);
    }
    start(){
        let msec = 0; 
        let sec = 0; 
        let min = 0; 
        this.#createTemplate();
        setInterval(() => {
            if(msec == 100){
                msec = 0; 
                sec++;
            }
            if(sec == 60){
                sec = 0;
                min++;
            }
            
            if(msec / 10 < 1){
                this.#element.children[2].innerHTML = "0" + msec;
            }else{
                this.#element.children[2].innerHTML = msec;
            }

            if(sec / 10 < 1){
                this.#element.children[1].innerHTML = "0" + sec;
            }else{
                this.#element.children[1].innerHTML = sec;
            }

            if(min / 10 < 1){
                this.#element.children[0].innerHTML = "0" + min;
            }else{
                this.#element.children[0].innerHTML = min;
            }
            
            msec++;
        }, 10);
    }



    #createTemplate(){
        this.#element.innerHTML = '<span></span>:<span></span>:<span></span>';
    }
    tick(){
        
    }
}