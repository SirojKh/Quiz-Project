class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex]
    }

    // guess(answer){
    //     if(this.getQuestionIndex().isCorrectAnswer(answer)){
    //         this.score++
    //     }
    //     this.questionIndex++;
    // }

    guess(answer){
        if(this.getQuestionIndex().isCorrectAnswer(answer)){
            this.score++
        }
        this.questionIndex++;
        }

    isEnded() {
        if (!this.questions || !this.questions.length) return false;

        let ended = this.questionIndex === this.questions.length;
        if (ended) {
            localStorage.setItem("result", JSON.stringify(this));
        }
        return ended;
    }

}
