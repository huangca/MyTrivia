const startButton = document.getElementById('start-btn');
const nextButton=document.getElementById('next-btn');
const resultButton=document.getElementById('result-btn');
const questionContainer = document.getElementById('question-container');
const questions=document.getElementById('question');
const resultDisplay=document.getElementById('scoreContainer');
const answerButton=document.getElementById('answer-buttons');
const progressDisplay=document.getElementById('progress');

let questionData,currentQuestion,score;
startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',()=>{
  currentQuestion++;
  setNextQuestion();
});
resultButton.addEventListener('click',resultPage);

function startGame(){
	//console.log('start function run'); //debug print
	loadJSON(function(response) {
  questionData=JSON.parse(response).sort(()=>Math.random()-.5); //shuffled questions
    //questionData=JSON.parse(response);
    //console.log(questionData); // this will log out the json object
    currentQuestion=0;
    score=0;

	  startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    answerTrogress();
    resetScore();
    setNextQuestion();
  });
  
}

function setNextQuestion(){
  resetState()
  showQuestion();
}

function showQuestion(){
  //console.log(questionData[0]);
  questions.innerText=questionData[currentQuestion].question;
  question.style.fontSize = "x-large";
  //answers
  let tempAanswerArray=[];
  questionData[currentQuestion].incorrect.forEach(element => {
    tempAanswerArray.push({text:element,correct:false});
  });
  tempAanswerArray.push({text:questionData[currentQuestion].correct,correct:true});
  tempAanswerArray.sort(()=>Math.random()-.5);
  //console.log(tempAanswerArray); //debug print
  tempAanswerArray.forEach(answer=>{
    const button=document.createElement('button');
    button.innerText=answer.text;
    button.classList.add('btn');
    button.style.fontSize = "large";
    if(answer.correct){
      button.dataset.correct=answer.correct;
    }
    button.addEventListener('click',selectAnswer);
    answerButton.appendChild(button);
  });
}

function resetState(){
  nextButton.classList.add('hide')
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function resetScore(){
  resultDisplay.classList.add('hide')
  while(resultDisplay.firstChild){
    resultDisplay.removeChild(resultDisplay.firstChild);
  }
}

function selectAnswer(e){
  //console.log('cleck answer button');//debug
  const selectButton=e.target;
  const correct=selectButton.dataset.correct;
  let tempProcess=document.getElementById(currentQuestion);
  if(correct){
    tempProcess.classList.add('correct');
    score++;    
  }else{
    tempProcess.classList.add('wrong');
  }
  //console.log(score); //debug
  //setStatusClass(document.body,correct);
  Array.from(answerButton.children).forEach(button=>{
    setStatusClass(button,button.dataset.correct);
    button.disabled=true;
  });
  if(currentQuestion<9){
    nextButton.classList.remove('hide');
  }else{
    resultButton.classList.remove('hide');
  }
 

}

function setStatusClass(element,correct){
  clearStatusClass(element);
  if(correct){
    element.classList.add('correct');
  }else{
    element.classList.add('wrong');
  }
}

function clearStatusClass(element){
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function answerTrogress(){
  while(progressDisplay.firstChild){
    progressDisplay.removeChild(progressDisplay.firstChild);
  }
  for(let i=0;i<10;i++){
    let process=document.createElement("div");
    process.classList.add('prog');
    process.id=i;
    progressDisplay.appendChild(process);
  }
}

function resultPage(){
  resultButton.classList.add('hide');
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
  questions.innerText=`you score is`;
  let h = document.createElement("H1");
  let t = document.createTextNode(score+"0%");
  h.appendChild(t);
  h.classList.add('result');
  resultDisplay.appendChild(h);
  resultDisplay.classList.remove('hide');
  startButton.innerText='Restart';
  startButton.classList.remove('hide');
}


function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'Apprentice_TandemFor400_Data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
