const tests = [
  // Protan
  { id: 1, type: 'Protan', difficulty: 'Easy', correctAnswer: 2, mediaUrl: 'images/protan(easy).mp4', mediaType: 'video' },
  { id: 2, type: 'Protan', difficulty: 'Moderate', correctAnswer: 3, mediaUrl: 'images/protan(moderate).mp4', mediaType: 'video' },
  { id: 3, type: 'Protan', difficulty: 'Hard', correctAnswer: 1, mediaUrl: 'images/protan(hard).mp4', mediaType: 'video' },
  
  // Deutan
  { id: 4, type: 'Deutan', difficulty: 'Easy', correctAnswer: 1, mediaUrl: 'images/deutan(easy).mp4', mediaType: 'video' },
  { id: 5, type: 'Deutan', difficulty: 'Moderate', correctAnswer: 2, mediaUrl: 'images/deutan(moderate).mp4', mediaType: 'video' },
  { id: 6, type: 'Deutan', difficulty: 'Hard', correctAnswer: 3, mediaUrl: 'images/deutan(hard).mp4', mediaType: 'video' },
  
  // Tritan
  { id: 7, type: 'Tritan', difficulty: 'Easy', correctAnswer: 3, mediaUrl: 'images/tritan(easy).mp4', mediaType: 'video' },
  { id: 8, type: 'Tritan', difficulty: 'Moderate', correctAnswer: 1, mediaUrl: 'images/tritan(moderate).mp4', mediaType: 'video' },
  { id: 9, type: 'Tritan', difficulty: 'Hard', correctAnswer: 2, mediaUrl: 'images/tritan(hard).mp4', mediaType: 'video' }
];

let currentTestIndex = -1;
let results = {
  Protan: { wrong: 0, total: 0 },
  Deutan: { wrong: 0, total: 0 },
  Tritan: { wrong: 0, total: 0 }
};

function showNextTest() {
  currentTestIndex++;
  const testArea = document.getElementById('test-area');
  const nextBtn = document.getElementById('next-btn');
  const resultDiv = document.getElementById('result');

  if (currentTestIndex >= tests.length) {
    evaluateResults();
    nextBtn.style.display = 'none';
    return;
  }

  const test = tests[currentTestIndex];

  // Select video or image
  const mediaHTML = test.mediaType === 'video' 
    ? `<video src="${test.mediaUrl}" autoplay loop muted style="max-width:300px; display:block; margin-bottom:10px;"></video>` 
    : `<img src="${test.mediaUrl}" alt="Test Media" style="max-width:300px; display:block; margin-bottom:10px;">`;

  // Show current test
  testArea.innerHTML = `
    <h3>Test ${currentTestIndex + 1} / ${tests.length}: ${test.type} (${test.difficulty})</h3>
    ${mediaHTML}
    <button onclick="checkAnswer(${test.id}, 1)">1</button>
    <button onclick="checkAnswer(${test.id}, 2)">2</button>
    <button onclick="checkAnswer(${test.id}, 3)">3</button>
  `;

  resultDiv.innerHTML = '';
}

function checkAnswer(testId, userChoice) {
  const test = tests.find(t => t.id === testId);
  results[test.type].total += 1;
  if (userChoice !== test.correctAnswer) {
    results[test.type].wrong += 1;
  }

  showNextTest();
}

function evaluateResults() {
  const resultDiv = document.getElementById('result');
  let resultHTML = '<h3>Results:</h3><ul>';

  for (const type in results) {
    const { wrong, total } = results[type];
    const errorRate = wrong / total;
    let interpretation = 'No strong indication';
    if (errorRate > 0.6) {
      interpretation = `Possible ${type} color vision deficiency`;
    }
    resultHTML += `<li><strong>${type}</strong>: ${wrong}/${total} wrong (${Math.round(errorRate * 100)}%) → ${interpretation}</li>`;
  }

  resultHTML += '</ul>';
  resultDiv.innerHTML = resultHTML;
}