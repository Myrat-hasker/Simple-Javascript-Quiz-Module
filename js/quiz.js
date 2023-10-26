
import Timer from "./timer.js";
import Random from "./random.js";
import {engArr} from "./engWords.js";
import {rusArr} from "./rusWords.js";

export default class Quiz{
    #answerButtonCondition = false;
    #element;
    #currAnswers;
    #currQuestion;
    #currStep;
    #score;
    #testLength;
    constructor(elem, length){
        this.#element = document.querySelector(elem);
        this.#testLength = length;
        this.#currStep = 1;
        this.#score = 0;
        this.#testLength = 10;
    }

    start(){

        const startBtn = this.#element.querySelector(".start-btn");
        let setTempl = () => {
            new Audio("/sounds/pushBtn.mp3").play();
            this.#setTemplate();
            this.#pushButton();
            this.setQuestion();
            const timer = new Timer(".timer");
            timer.start();
            startBtn.remove();
        }
        startBtn.addEventListener("click", setTempl);
    }

       
    setQuestion(){
        if(this.#currStep > this.#testLength){
            this.#showResult();
        }else{
            this.#setStep();
            this.#answerButtonCondition = false;
            let rand = new Random();  
            this.#currAnswers = rand.getRandomNumbersArr(4, 0, engArr.length - 1);
            this.#currQuestion = this.#currAnswers[rand.getRandomNumber(0, 3)];

            this.#element.querySelector(".question").textContent = engArr[this.#currQuestion];
            let btns = this.#element.querySelector(".btn-group");
            btns.children[0].textContent = rusArr[this.#currAnswers[0]];
            btns.children[1].textContent = rusArr[this.#currAnswers[1]];
            btns.children[2].textContent = rusArr[this.#currAnswers[2]];
            btns.children[3].textContent = rusArr[this.#currAnswers[3]];
            
 
        }
        
    }

    #showResult(){
        let result = this.#score * 100 / this.#testLength;
        let time = this.#element.querySelector(".timer").textContent;
        this.#element.querySelector(".quiz-content").innerHTML = `<h2>Your results - ${result}%</h2><p><h2>You time is ${time}</h2></p>`;
    }

    #pushButton(){
        const quizContent = document.querySelector(".quiz-content");
        const correct = quizContent.querySelectorAll(".correct");
        let checkButton = (event) =>{
            if(this.#answerButtonCondition == false && event.target.closest(".answer-btn")){
                if(event.target.textContent == rusArr[this.#currQuestion]){
                    new Audio("/sounds/correct.mp3").play();
                    event.target.style.background = "rgb(63 255 63)";
                    this.#score++;
                }else{
                    new Audio("/sounds/mistake.mp3").play();
                    event.target.style.background = "rgb(255 65 65)";
                }
                this.#answerButtonCondition = true;
            }else {
                if(event.target.closest(".next-btn")){
                    new Audio("/sounds/pushBtn.mp3").play();
                    quizContent.querySelectorAll(".answer-btn").forEach(element => {
                        element.style.background = "white";
                    });
                    this.#currStep++;
                    correct.innerHTML = "";
                    this.setQuestion();
                }
            }  
        }
        quizContent.addEventListener("click", checkButton);        
    }

    #setStep(){
        this.#element.querySelector(".step").innerHTML = `${this.#currStep}/${this.#testLength}`;
    }

    #setTemplate(){
        this.#element.querySelector(".quiz-content").insertAdjacentHTML("afterbegin", 
        `<p><span class="question"></span></p>             
        <div class="btn-group">
            <button class="answer-btn">1</button>
            <button class="answer-btn">2</button>
            <button class="answer-btn">3</button>
            <button class="answer-btn">4</button>
        </div>
        <p class="correct"></p>
        <div class="next">
            <button class="next-btn">Next</button>
            <span class="step"></span>
        </div>
        <div class="timer"></timer>`);
    }

}
