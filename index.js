// selectors
let spanCount=document.querySelector('.count span');
let bullets=document.querySelector('.bullets .spans');
let theOriginalBullets=document.querySelector('.bullets');
let quizArea=document.querySelector('.quiz-area');
let answersArea=document.querySelector('.answers-area');
let submit=document.querySelector('.submit-button');
let result=document.querySelector('.results');
let countQuestion=0;
let rightAnswerCount=0;






function getQuestionsFromJsonFile(){
    
    let req=new XMLHttpRequest();
    req.open("GET","question.json",true);
    req.send();
    req.onreadystatechange=function(){
        if( this.status ===200 && this.readyState === 4){
            let questions=JSON.parse(this.responseText);
            let questionNumber=questions.length;
            
            createBullets(questionNumber);
            addData(questions[countQuestion],questionNumber);
            submit.onclick=function(){
                checkData(questions[countQuestion].right_answer,questionNumber);
                countQuestion++;
                // Empty the question
                quizArea.innerHTML='';
                answersArea.innerHTML='';
                // going to the next question
                addData(questions[countQuestion],questionNumber);
                // to handle the bullets below
                handBullets();

                showResults(questionNumber);
            }
            
        }
    }
    
}

getQuestionsFromJsonFile();

function createBullets(number){
    spanCount.innerHTML=number;
    for (let index = 0; index < number; index++) {
        let bulletSpan=document.createElement('span');
        bullets.appendChild(bulletSpan);
        if(index===0)
        {
            bulletSpan.className='on';
        }
    }
}

function addData(question,count){
    if(countQuestion<count){
            // The title of the question
    let questionTitle=document.createElement('h2');
    questionTitle.textContent=question['title'];
    quizArea.appendChild(questionTitle);
    
    // the Answers
    for(let i=1;i<5;i++){
        let answer=document.createElement('div');
        answer.className='answer';
        answersArea.appendChild(answer);
        let input=document.createElement('input');
        input.type='radio';
        input.name='question';
        input.id=`ans_${i}`;
        input.dataset.answer = question[`answer_${i}`];
        let label=document.createElement('label');
        label.htmlFor=`ans_${i}`;
        
        label.textContent=question[`answer_${i}`];
        answer.appendChild(input);
        answer.appendChild(label);
        if(i===1){
            input.checked=true;
        }
    }
    }
    
}

function checkData(rightAnswer,count){
    let answers=document.getElementsByName('question');
    
    let chosenAns;
    for(let i=0;i<answers.length;i++){
        if(answers[i].checked){
            chosenAns=answers[i].dataset.answer;
            
        }
    }
    if(rightAnswer===chosenAns){
        rightAnswerCount++;
    }
    
}

function handBullets(){
    let allBullets=document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans=Array.from(allBullets);
    arrayOfSpans.forEach(function(ele,index){
        if(countQuestion===index){
            ele.className='on';
        }
    })
}


function showResults(count){
    if(count===countQuestion){
        quizArea.remove();
        answersArea.remove();
        theOriginalBullets.remove();
        if(rightAnswerCount>(count/2) && rightAnswerCount<count){
            result.innerHTML=`<span class="good">Good,</span> You answered ${count} of ${rightAnswerCount} `;
        }  
        else if(count===rightAnswerCount){
            result.innerHTML=`<span class="perfect">Perfect,</span> You answered ${count} of ${rightAnswerCount} `;
        }  
        else{
            result.innerHTML=`<span class="bad">Bad,</span> You answered ${count} of ${rightAnswerCount} `;

        }
    }
}

