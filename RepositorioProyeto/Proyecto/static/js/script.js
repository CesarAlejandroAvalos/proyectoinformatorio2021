
//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

const quiz_boxf = document.querySelector(".quiz_boxf"); /****/
const quiz_boxd = document.querySelector(".quiz_boxd");  /******/

const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

const option_listf  = document.querySelector(".option_listf"); /***/
const option_listd  = document.querySelector(".option_listd"); /***/

const time_line = document.querySelector("header .time_line");
const time_linef = document.querySelector("header .time_linef"); /***/
const time_lined = document.querySelector("header .time_lined");/****/
const timeText = document.querySelector(".timer .time_left_txt");    
const timeTextf = document.querySelector(".timer .time_left_txtf");/***/
const timeTextd = document.querySelector(".timer .time_left_txtd");/***/
const timeCount = document.querySelector(".timer .timer_sec");
const timeCountf = document.querySelector(".timer .timer_secf");/***/
const timeCountd = document.querySelector(".timer .timer_secd");/***/


const dif_box = document.querySelector(".dif_box");
const niv_med = dif_box.querySelector(".botones .b_med");
const niv_fac = dif_box.querySelector(".botones .b_fac");
const niv_hard = dif_box.querySelector(".botones .b_dif");

const bandera = document.querySelector(".banderac");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    bandera.classList.add("sacar");
}


// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
     bandera.classList.remove("sacar");
}

// if continuar button clicked 
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    dif_box.classList.add("activeDif"); //show menu de niveles
}

// if nivel facil button clicked
niv_fac.onclick = ()=>{
    dif_box.classList.remove("activeDif"); //hide  menu de niveles
    quiz_boxf.classList.add("activeQuizf"); //show quiz box
    showQuetionsf(0); //calling showQestions nivel facil function
    queCounterf(1); //passing 1 parameter to queCounter
    startTimerf(20); //calling startTimer function
    startTimerLinef(0); //calling startTimerLine function
}

// if nivel medio  button clicked
niv_med.onclick = ()=>{
    dif_box.classList.remove("activeDif"); //hide  menu de niveles
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}


// if nivel dificil  button clicked
niv_hard.onclick = ()=>{
    dif_box.classList.remove("activeDif"); //hide  menu de niveles
    quiz_boxd.classList.add("activeQuizd"); //show quiz box
    showQuetionsd(0); //calling showQestions function
    queCounterd(1); //passing 1 parameter to queCounter
    startTimerd(10); //calling startTimer function
    startTimerLined(0); //calling startTimerLine function
}

let timeValue =  15;
let timeValuef =  20;/***/
let timeValued =  10;/***/
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    dif_box.classList.add("activeDif");
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
}

    

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Tiempo"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}




// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}



// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Genial!🎉, acertaste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p>Puntaje: '+userScore*20+' </span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 5){ // if user scored more than 1
        let scoreTag = '<span>Bien!😎, acertaste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p>Puntaje: '+userScore*20+' </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 6
        let scoreTag = '<span>Lastima😐, acertaste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p>Puntaje: '+userScore*20+' </span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Tiempo agotado"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}


///////////////////////////////////////////////las preguntas faciles//////////////////////////////////////////////////////////////


const next_btnf = document.querySelector("footer .next_btnf");
const bottom_ques_counterf = document.querySelector("footer .total_quef");

// if Next Que button clicked
next_btnf.onclick = ()=>{
    if(que_count < pfacil.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetionsf(que_count); //calling showQestions function
        queCounterf(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimerf(timeValuef); //calling startTimer function
        startTimerLinef(widthValue); //calling startTimerLine function
        timeTextf.textContent = "Tiempo"; //change the timeText to Time Left ***********
        next_btnf.classList.remove("show"); //hide the next button  *******************
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResultf(); //calling showResult function
    }
}


function showQuetionsf(index){
    const que_textf = document.querySelector(".que_textf");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tagf = '<span>'+ pfacil[index].numb + ". " + pfacil[index].question +'</span>';
    let option_tagf = '<div class="option"><span>'+ pfacil[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ pfacil[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ pfacil[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ pfacil[index].options[3] +'</span></div>';
    que_textf.innerHTML = que_tagf; //adding new span tag inside que_tag
    option_listf.innerHTML = option_tagf; //adding new div tag inside option_tag
    
    const optionf = option_listf.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < optionf.length; i++){
        optionf[i].setAttribute("onclick", "optionSelectedf(this)"); //***********************************
    }
}




function optionSelectedf(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = pfacil[que_count].answer; //getting correct answer from array
    const allOptions = option_listf.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_listf.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_listf.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_listf.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_listf.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btnf.classList.add("show"); //show the next button if user selected any option
}


function showResultf(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_boxf.classList.remove("activeQuizf"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Genial!🎉, acertaste <p>'+ userScore +'</p> de <p>'+ pfacil.length +'</p>Puntaje: '+userScore*10+'  </span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 5){ // if user scored more than 1
        let scoreTag = '<span>Bien! 😎, acertaste<p>'+ userScore +'</p>de<p>'+ pfacil.length +'</p> Puntaje: '+userScore*10+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 6
        let scoreTag = '<span>Lastima😐, acertaste <p>'+ userScore +'</p> de <p>'+ pfacil.length +'</p>Puntaje: '+userScore*10+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimerf(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCountf.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCountf.textContent; 
            timeCountf.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeTextf.textContent = "Tiempo agotado"; //change the time text to time off
            const allOptions = option_listf.children.length; //getting all option items
            let correcAns = pfacil[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_listf.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_listf.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_listf.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_listf.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btnf.classList.add("show"); //show the next button if user selected any option
        }
    }
}






function startTimerLinef(time){
    counterLine = setInterval(timer, 38);
    function timer(){
        time += 1; //upgrading time value with 1
        time_linef.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounterf(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ pfacil.length +'</p> Preguntas</span>';
    bottom_ques_counterf.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}


//////////////////////////////////////////las preguntas dif/////////////////////////////////////////////////////////////////////


const next_btnd = document.querySelector("footer .next_btnd");
const bottom_ques_counterd = document.querySelector("footer .total_qued");

// if Next Que button clicked
next_btnd.onclick = ()=>{
    if(que_count < pdif.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetionsd(que_count); //calling showQestions function
        queCounterd(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimerd(timeValued); //calling startTimer function
        startTimerLined(widthValue); //calling startTimerLine function
        timeTextd.textContent = "Tiempo"; //change the timeText to Time Left ***********
        next_btnd.classList.remove("show"); //hide the next button  *******************
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResultd(); //calling showResult function
    }
}


function showQuetionsd(index){
    const que_textd = document.querySelector(".que_textd");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tagd = '<span>'+ pdif[index].numb + ". " + pdif[index].question +'</span>';
    let option_tagd = '<div class="option"><span>'+ pdif[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ pdif[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ pdif[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ pdif[index].options[3] +'</span></div>';
    que_textd.innerHTML = que_tagd; //adding new span tag inside que_tag
    option_listd.innerHTML = option_tagd; //adding new div tag inside option_tag
    
    const optiond = option_listd.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < optiond.length; i++){
        optiond[i].setAttribute("onclick", "optionSelectedd(this)"); //***********************************
    }
}

function optionSelectedd(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = pdif[que_count].answer; //getting correct answer from array
    const allOptions = option_listd.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_listd.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_listd.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_listd.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_listd.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btnd.classList.add("show"); //show the next button if user selected any option
}

function showResultd(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_boxd.classList.remove("activeQuizd"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Genial!🎉, acertaste <p>'+ userScore +'</p> de <p>'+ pdif.length +'</p>Puntaje: '+userScore*30+'  </span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 5){ // if user scored more than 1
        let scoreTag = '<span>Bien!😎, acertaste<p>'+ userScore +'</p>de<p>'+ pdif.length +'</p> Puntaje: '+userScore*30+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 6
        let scoreTag = '<span>Lastima😐, acertaste <p>'+ userScore +'</p> de <p>'+ pdif.length +'</p>Puntaje: '+userScore*30+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimerd(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCountd.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCountd.textContent; 
            timeCountd.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeTextd.textContent = "Tiempo agotado"; //change the time text to time off
            const allOptions = option_listd.children.length; //getting all option items
            let correcAns = pdif[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_listd.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_listd.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_listd.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_listd.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btnd.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLined(time){
    counterLine = setInterval(timer, 20);
    function timer(){
        time += 1; //upgrading time value with 1
        time_lined.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounterd(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ pdif.length +'</p> Preguntas</span>';
    bottom_ques_counterd.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
