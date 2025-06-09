const tests = [
  { type: 'Protan', difficulty: 'Easy', correctAnswer: 1, mediaUrl: 'images/protan(easy).mp4', mediaType: 'video' },
  { type: 'Tritan', difficulty: 'Moderate', correctAnswer: 2, mediaUrl: 'images/tritan(moderate).mp4', mediaType: 'video' },
  { type: 'Deutan', difficulty: 'Easy', correctAnswer: 2, mediaUrl: 'images/deutan(easy).mp4', mediaType: 'video' },
  { type: 'Protan', difficulty: 'Moderate', correctAnswer: 1, mediaUrl: 'images/protan(moderate).mp4', mediaType: 'video' },
  { type: 'Deutan', difficulty: 'Moderate', correctAnswer: 3, mediaUrl: 'images/deutan(moderate).mp4', mediaType: 'video' },
  { type: 'Protan', difficulty: 'Hard', correctAnswer: 2, mediaUrl: 'images/protan(hard).mp4', mediaType: 'video' },
  { type: 'Tritan', difficulty: 'Easy', correctAnswer: 1, mediaUrl: 'images/tritan(easy).mp4', mediaType: 'video' },
  { type: 'Deutan', difficulty: 'Hard', correctAnswer: 3, mediaUrl: 'images/deutan(hard).mp4', mediaType: 'video' },
  { type: 'Tritan', difficulty: 'Hard', correctAnswer: 2, mediaUrl: 'images/tritan(hard).mp4', mediaType: 'video' }
];

let currentTest = -1;
let score = { Protan: 0, Deutan: 0, Tritan: 0 };


document.getElementById('next-btn').addEventListener('click', showNextTest);
document.querySelector('.video-crop').classList.add('hidden');


document.querySelectorAll('.options svg').forEach(e =>{
    e.classList.add('hidden');
})

document.querySelectorAll('#answer-buttons svg').forEach(btn => {
  btn.addEventListener('click', () => {
    const userAnswer = parseInt(btn.getAttribute('data-answer'));
    checkAnswer(userAnswer);
  });
});

function showNextTest() {

   document.getElementById("next-btn").classList.add('hidden');
   document.querySelector('.video-crop').classList.remove('hidden');

   document.querySelectorAll('.options svg').forEach(e =>{
    e.classList.remove('hidden');
})
  currentTest++;

  if (currentTest >= tests.length) {
    document.querySelector('.video-crop').classList.add('hidden');
    document.querySelectorAll('.options svg').forEach(e =>{
    e.classList.add('hidden');
    document.querySelector('.test-container').classList.add('start-test-container');
})
    showResults();
    return;
  }

  const test = tests[currentTest];

  document.getElementById('test-title').textContent = `Test ${currentTest + 1}/9`;

  const mediaHTML = test.mediaType === 'video'
    ? `<video src="${test.mediaUrl}" autoplay loop muted style="width: 300px;"></video>`
    : `<img src="${test.mediaUrl}" style="width: 300px;">`;

  document.getElementById('test-media').innerHTML = mediaHTML;
}

function checkAnswer(userAnswer) {
  const test = tests[currentTest];
  if (userAnswer === test.correctAnswer) {
    score[test.type]++;
  }

  showNextTest();
}

function showResults() {
  let resultHTML = '<h3>Results: </h3>';
  let totalScore=0;
  let deficiencies = [];

  for (const type of ['Protan', 'Deutan', 'Tritan']) {
      totalScore += score[type];   
        if (`${type}`=='Protan' && score[type] < 3) {
    deficiencies.push(`<p>  You may have reduced sensitivity to red colors (protanopia), making reds harder to distinguish. Specialized red-enhancing glasses can help improve your color perception. Click on this link to view the recommended glasses.</p>`);
  }else if(`${type}`=='Deutan' && score[type] < 3){
    deficiencies.push(`<p>  This suggests reduced sensitivity to green light, affecting the M-cones. Corrective glasses designed to enhance green contrast may aid in distinguishing green shades more accurately. Click on this link to view the recommended glasses.</p>`);
  } if (`${type}`=='Tritan' && score[type] < 3) {
    deficiencies.push(`<p>  Indicates a challenge in perceiving blue and yellow colors, linked to S-cone dysfunction. Glasses that improve blue-yellow contrast can help alleviate these issues. Click on this link to view the recommended glasses.</p>`);
  }
  }

  resultHTML += totalScore+'/9';

  if (deficiencies.length === 0) {
  resultHTML +='<p> Your color vision seem to be normal</p>';
} else {
  resultHTML +=deficiencies.join('');
}

  document.getElementById('result').innerHTML = resultHTML;
}

  
