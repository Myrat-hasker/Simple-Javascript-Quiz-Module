export default class Random{
    // возвращает массив заданной длины с рандомными не повторяющими числами в диапазоне min - max
    getRandomNumbersArr(quantity, min, max){
        let arr = [];
        for(let i = 0; i < quantity; i++){
            let number = this.getRandomNumber(min, max);
            if(arr.includes(number)){
                i--;
            } else {
                arr[i] = number;
            }
        }
        return arr;
    }
    // взовращает рандомное число в заданном диапазоне
    getRandomNumber(min, max){
        return Math.floor(min + Math.random() * (max + 1 - min));
    }



}