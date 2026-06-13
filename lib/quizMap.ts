export type QuizAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
};

// Returns the best program ID based on the user's answers.
export function calculateBestProgram(answers: QuizAnswers): string {
  // Initialize scores for all core programs
  const scores: Record<string, number> = {
    "entrepreneurship-bootcamp": 0,
    "ignite-youth-program": 0,
    "women-empowerment-program": 0,
    "health-wellness-camp": 0,
    "financial-literacy-drive": 0,
    "clean-green-india": 0,
  };

  // --- Q1: What best describes you? ---
  switch (answers.q1) {
    case "Student":
      scores["ignite-youth-program"] += 3;
      scores["clean-green-india"] += 1;
      break;
    case "Working Professional":
      scores["women-empowerment-program"] += 1;
      scores["clean-green-india"] += 1;
      break;
    case "Entrepreneur":
      scores["entrepreneurship-bootcamp"] += 3;
      scores["financial-literacy-drive"] += 1;
      break;
    case "Homemaker":
      scores["women-empowerment-program"] += 3;
      scores["financial-literacy-drive"] += 2;
      scores["health-wellness-camp"] += 1;
      break;
  }

  // --- Q2: What's your primary goal? ---
  switch (answers.q2) {
    case "Learn new skills":
      scores["ignite-youth-program"] += 2;
      scores["women-empowerment-program"] += 2;
      scores["financial-literacy-drive"] += 1;
      break;
    case "Start a business":
      scores["entrepreneurship-bootcamp"] += 3;
      break;
    case "Give back to community":
      scores["clean-green-india"] += 2;
      scores["health-wellness-camp"] += 1;
      break;
    case "Improve health":
      scores["health-wellness-camp"] += 3;
      break;
  }

  // --- Q3: How much time can you commit? ---
  switch (answers.q3) {
    case "A few hours/week":
      scores["clean-green-india"] += 2;
      scores["health-wellness-camp"] += 1;
      break;
    case "Part time":
      scores["financial-literacy-drive"] += 2;
      scores["women-empowerment-program"] += 1;
      break;
    case "Full time":
      scores["entrepreneurship-bootcamp"] += 2;
      scores["ignite-youth-program"] += 1;
      break;
    case "Flexible":
      for (const key in scores) scores[key] += 1;
      break;
  }

  // --- Q4: Where are you based? ---
  switch (answers.q4) {
    case "Metro city":
      scores["entrepreneurship-bootcamp"] += 1;
      scores["women-empowerment-program"] += 1;
      break;
    case "Tier 2 city":
      scores["ignite-youth-program"] += 1;
      scores["financial-literacy-drive"] += 1;
      break;
    case "Rural area":
      scores["health-wellness-camp"] += 3;
      scores["clean-green-india"] += 2;
      scores["financial-literacy-drive"] += 2;
      break;
    case "Open to relocation":
      for (const key in scores) scores[key] += 1;
      break;
  }

  // Find the program with the highest score
  let bestProgramId = "ignite-youth-program"; // Robust Fallback
  let maxScore = -1;

  for (const [programId, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestProgramId = programId;
    }
  }

  return bestProgramId;
}
