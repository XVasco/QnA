const questions = [
  {
    question: "Kenali Dirimu Sendiri",
    answer: null 
  },
  {
    question: "Di pagi hari, aku berjalan dengan empat kaki. Saat siang, aku berjalan dengan dua kaki. Dan di malam hari, aku berjalan dengan tiga kaki. Siapakah aku?",
    answer: "manusia"
  },
  
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
  } else {
    resultContainer.textContent = `Jawaban Anda salah. Jawaban yang benar adalah ${currentQuestion.answer}.`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    quizForm.removeEventListener("submit", checkAnswer);
    resultContainer.textContent = "Selamat! Anda telah menyelesaikan kuis ini.";
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