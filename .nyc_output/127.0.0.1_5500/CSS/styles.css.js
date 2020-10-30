*, *::before, *::after {
  box-sizing: border-box;
  font-family: Gotham Rounded;
}

:root {
  --hue-neutral: 200;
  --hue-wrong: 0;
  --hue-correct: 145;
  --hue-white:white;
}

body {
  --hue: var(--hue-neutral);
  padding: 0;
  margin: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: hsl(var(--hue), 100%, 20%);
}

body.correct {
  --hue: var(--hue-correct);
}

body.wrong {
  --hue: var(--hue-wrong);
}

.containerm {
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px 2px;
}
.btnm{
  margin: 20px;
}

.btn-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
  margin: 20px 0;
}

.start-btn, .next-btn {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px 20px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.prog{
  --hue:var(--hue-white);
  width : 25px;
  height : 25px;
  border: 1px solid #000;
  display: inline-block;
  border-radius: 50%;
  margin-left : 5px;
  margin-right : 5px;
  background-color: hsl(var(--hue), 100%, 50%);
}
.prog.correct{
  --hue: var(--hue-correct);
}

.prog.wrong{
  --hue: var(--hue-wrong);
}

.result{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hide {
  display: none;
}

.invisible{
  visibility:hidden;
}

#timer{

  text-align: center;
  float: left;
}
#counter{
  font-size: 3em;
}
#btimeGauge{
  width : 150px;
  height : 10px;
  border-radius: 10px;
  background-color: lightgray;
  margin-left : 25px;
}
#timeGauge{
  height : 10px;
  border-radius: 10px;
  background-color: mediumseagreen;
  margin-top : -10px;
  margin-left : 25px;
}