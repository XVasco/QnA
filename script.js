const questions = [
  {
    question: "Kenali Dirimu Sendiri",
    answer: null
  },
  {
    question: "Di pagi hari, aku berjalan dengan empat kaki. Saat siang, aku berjalan dengan dua kaki. Dan di malam hari, aku berjalan dengan tiga kaki. Siapakah aku?",
    answer: "manusia"
  }
];

const questionContainer = document.getElementById("question-container");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const quizForm = document.getElementById("quiz-form");

let currentQuestionIndex = 0;
let correctSound = new Audio("correct.mp3"); // Ganti dengan path file suara yang diinginkan
let fireworksContainer = document.createElement("div");
fireworksContainer.classList.add("fireworks");

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  answerInput.value = "";
  resultContainer.textContent = "";
  clearFireworks(); // menghapus efek kembang api sebelumnya
}

function checkAnswer(event) {
  event.preventDefault();
  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = currentQuestion.answer?.toLowerCase(); // menggunakan operator nullish coalescing (?.)

  if (correctAnswer === null || userAnswer === correctAnswer) {
    resultContainer.textContent = "Jawaban Anda benar!";
    correctSound.play(); // memainkan suara saat jawaban benar
    showFireworks(); // menampilkan efek kembang api
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      quizForm.removeEventListener("submit", checkAnswer);
      resultContainer.textContent = "Selamat! Anda telah menyelesaikan kuis ini.";
    }
  } else {
    resultContainer.textContent = `Jawaban Anda salah. Jawaban yang benar adalah ${currentQuestion.answer}.`;
  }
}

function showFireworks() {
  document.body.appendChild(fireworksContainer);
  // kode untuk membuat efek kembang api
  for (let i = 0; i < 50; i++) {
    let firework = document.createElement("div");
    firework.classList.add("firework");
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 100}vh`;
    firework.style.opacity = Math.random();
    fireworksContainer.appendChild(firework);
  }
}

function clearFireworks() {
  if (document.body.contains(fireworksContainer)) {
    document.body.removeChild(fireworksContainer);
  }
}

displayQuestion();
quizForm.addEventListener("submit", checkAnswer);

// animasi partikel
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// Objek Partikel
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `rgba(210, 180, 140, ${Math.random() * 0.5 + 0.2})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
  particleArray.push(new Particle());
}

animate();
