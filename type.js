const textArray = [
  "The blue sky shone brightly as people gathered in the park. Children played joyfully, while adults chatted over coffee. Nature's beauty offered peace, and everyone embraced the simple pleasure of fresh air and vibrant surroundings.",
  "Technology advances rapidly, shaping our everyday lives. Smartphones, smart homes, and AI-driven devices have become essential tools. As the digital landscape evolves, people must adapt and learn new skills to remain relevant in this interconnected global society.",
  "Healthy eating habits significantly impact physical and mental well-being. Incorporating fruits, vegetables, and whole grains into daily meals helps maintain energy levels and supports the body's functions. Nutrition is key to a balanced and fulfilling lifestyle.",
  "Traveling opens one's mind to different cultures and experiences. Exploring foreign lands introduces new traditions, cuisines, and languages. The journey not only offers adventure but also builds meaningful connections with people from diverse backgrounds and perspectives.",
  "Books are gateways to endless worlds of imagination and knowledge. Whether fiction or non-fiction, they captivate readers, sparking curiosity and expanding horizons. The joy of reading connects generations and fosters a lifelong love for stories and learning.",
  "The sun set over the horizon, painting the sky with hues of orange and pink. Birds returned to their nests, and calmness enveloped the world. Such moments remind us to pause, breathe, and appreciate nature's beautiful artistry.",
  "Music has the power to heal and connect people across boundaries. Its melodies and rhythms evoke emotions, inspire creativity, and strengthen bonds. From classical compositions to modern beats, music remains a universal language transcending cultural differences and time.",
  "Friendship is a precious bond that fills life with joy and support. True friends stand by us through thick and thin, offering laughter in good times and comfort in challenging moments. They make life's journey meaningful and enjoyable.",
  "The city streets bustled with life as commuters hurried to their destinations. Street vendors displayed colorful goods, enticing passersby with tempting offers. Amid the chaos, the vibrant energy of urban life showcased the resilience and spirit of the community.",
  "Education is the cornerstone of progress and empowerment. It equips individuals with the knowledge and skills needed to achieve their goals and contribute to society. Investing in education is investing in a brighter, more inclusive, and prosperous future.",
  "Art is a reflection of culture, emotion, and imagination. Through various forms like painting, sculpture, and performance, artists communicate stories that resonate with audiences. Art has the power to challenge perspectives and inspire meaningful conversations.",
  "The aroma of freshly brewed coffee filled the air as customers lined up at the café. Baristas crafted each cup with care, creating delicious beverages that fueled conversations, study sessions, and moments of quiet reflection throughout the day.",
  "Exercise is essential for maintaining physical health and mental well-being. Regular physical activity boosts energy levels, improves mood, and strengthens the body. Whether it's yoga, running, or strength training, finding a workout that brings joy is key.",
  "The vast ocean stretched endlessly, shimmering under the golden sunlight. Waves crashed rhythmically against the shore, creating a soothing melody. Standing at the water's edge, one feels both humbled by nature's grandeur and connected to its timeless rhythm.",
  "Volunteering is a powerful way to give back to the community and make a positive impact. Helping those in need fosters empathy and compassion, strengthening social ties and creating a sense of fulfillment that extends beyond individual achievements."
];


let timer;
let timeLeft;
let isTimerRunning = false;

function genRndPara() {
  const rndTextIdx = Math.floor(Math.random() * textArray.length);
  return textArray[rndTextIdx];
}

function displayRndText() {
  const randomText = genRndPara();
  document.querySelector(".text-display-area p").textContent = randomText;
}

window.onload = displayRndText;

document.querySelector(".resetbtn").addEventListener("click", () => {
  displayRndText();
  resetTimer();
});

function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  timeLeft = 0;
  document.getElementById("timeLeft").textContent = "0";
  document.querySelector(".userinput").disabled = false;
  document.getElementById("accuracy").textContent = "100%";
  document.getElementById("wpm").textContent = "0";
  document.querySelector(".userinput").value = ""; 

}

function startTimer() {
  const selectDuration = parseInt(document.getElementById("testDuration").value) * 60;
  timeLeft = selectDuration;

  document.getElementById("timeLeft").textContent = timeLeft;

  if (isTimerRunning) return;
  isTimerRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timeLeft").textContent = timeLeft;
    findWpm();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isTimerRunning = false;
      alert("Time is up!! Please");
      document.querySelector(".userinput").disabled = true;
    }
  }, 1000);
}

document.querySelector(".userinput").addEventListener("input", () => {
  if (!isTimerRunning) {
    startTimer();
  }
  console.log("update acccuracy")
  updateAccuracy();
});

function findWpm () {
  const userinput = document.querySelector(".userinput").value;
  const words = userinput.length / 5;
  const remTime = (parseInt(document.getElementById("testDuration").value) *60 - timeLeft)/60;
  const wpm = remTime > 0 ? Math.round(words/remTime) : 0;
  document.getElementById("wpm").textContent = wpm;
}


function resetAccuracy () {
  document.getElementById("accuracy").textContent = 0;
  console.log('reset accuracy');
}

function updateAccuracy() {
  

  const userinput = document.querySelector(".userinput").value;
  const refrenceText = document.querySelector(".text-display-area p").textContent;
  const maxLength = Math.min(userinput.length, refrenceText.length);
console.log("accuracy work");
  let countChar = 0;
  for(let i=0; i<maxLength; i++){
    if(userinput[i] === refrenceText[i]){
      countChar++;
    }
  }
console.log("updating accuracy 2nd time");
  const Accuracy = userinput.length > 0 ? Math.round((countChar / userinput.length)* 100):100;
  document.getElementById("accuracy").textContent = `${Accuracy}%`;
  console.log("written the accuracy value");
}