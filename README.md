# MyTrivia
[Live Demo](https://huangca.github.io/MyTrivia/)

## HTML/CSS,JavaScript and Bootstrap single player or local 2 players Trivia game
I choose to do a Trivia as a web application because web application is the most easy way to showcase the project. The only thing you need just a browser. No need to additional setup, click on the live demo link, choose 1 or 2 players game to play the game. 


## UI
![UI1](/img/trivia_01.png)
![UI2](/img/trivia_02.png)
* Question:Show the question
* Answers:Have 3 or 4 choices,click the answer you think is right.
* Timer:For each question, player have 15 second to make a choice. Run out of time will be considered as click a wrong answer.
* Process:10 questions for a round. The process bar show how many questions left, how many answer right and how many question answer wrong. In two players game, each player will answer 5 questions.
* Magic skills: Player have two magic skill for each round game. Skip will let player skip a question don't know the answer. 50/50 will let just 1 right answer and 1 wrong answer stay, others will be remove. In two players game, each play have one Skip and one 50/50 skill.

Player will know the choice right or wrong immediately, the timer will stop until the player click next button.

## Jest and Puppeteer for testing
<a href="url"><img src="./img/pass-test.png" align="left" height="250" width="375" ></a>
![Test2](/img/test3.png)

I use Jest and Pupppeteer to implement the end to end(e2e) total random test. Cause the logic of this project is all about DOM, it is hard to do the unit testing but e2e test can do the job. So I choise total random test to test this project. I write a test program randomly do all the possible operations and run it multiple time. It maybe not get good code coverage for each time test, but run it multiple time can make up this weakness and test the stability. 

## Code Challenge Form Tandem
This project is code challenge topic form Tandem. All the questions from a given JSON file. I try to read this file without modify so you can see I do a asynchronous call when at the code.
