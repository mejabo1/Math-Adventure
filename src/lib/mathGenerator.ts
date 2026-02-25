
export type MathProblem = {
  question: string;
  answer: string;
  options: string[];
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDistributiveProblem(): MathProblem {
  const a = getRandomInt(2, 9);
  const b = getRandomInt(1, 5);
  const c = getRandomInt(1, 9);
  const isSubtraction = Math.random() > 0.5;
  const variable = 'x';

  // Problem: a(bx +/- c)
  const question = `${a}(${b === 1 ? '' : b}${variable} ${isSubtraction ? '-' : '+'} ${c})`;
  
  // Answer: (a*b)x +/- (a*c)
  const term1 = a * b;
  const term2 = a * c;
  const answer = `${term1}${variable} ${isSubtraction ? '-' : '+'} ${term2}`;

  // Generate wrong options
  const options = new Set<string>();
  options.add(answer);

  let attempts = 0;
  while (options.size < 4 && attempts < 50) {
    attempts++;
    const type = getRandomInt(0, 3);
    let fakeAnswer = "";
    if (type === 0) {
      // Forgot to distribute to second term: abx +/- c
      fakeAnswer = `${term1}${variable} ${isSubtraction ? '-' : '+'} ${c}`;
    } else if (type === 1) {
      // Added instead of multiplied: (a+b)x +/- (a+c)
      fakeAnswer = `${a + b}${variable} ${isSubtraction ? '-' : '+'} ${a + c}`;
    } else if (type === 2) {
      // Wrong sign
      fakeAnswer = `${term1}${variable} ${isSubtraction ? '+' : '-'} ${term2}`;
    } else {
      // Random numbers close to answer
      fakeAnswer = `${term1 + getRandomInt(-2, 2)}${variable} ${isSubtraction ? '-' : '+'} ${term2 + getRandomInt(-2, 2)}`;
    }
    
    if (fakeAnswer !== answer && !options.has(fakeAnswer)) {
      options.add(fakeAnswer);
    }
  }

  // Fill with random junk if we couldn't generate enough smart wrong answers
  while (options.size < 4) {
    const fake = `${getRandomInt(1, 20)}x + ${getRandomInt(1, 20)}`;
    if (!options.has(fake)) options.add(fake);
  }

  return {
    question,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
}

function generateCombiningLikeTermsProblem(): MathProblem {
  const variable = 'x';
  const a = getRandomInt(2, 9);
  const b = getRandomInt(2, 9);
  const c = getRandomInt(2, 9);
  
  // Types: 
  // 1. ax + bx + c
  // 2. ax + b + cx
  // 3. a + bx + c + dx (maybe too complex? stick to 3 terms)
  
  const type = Math.random() > 0.5 ? 1 : 2;
  let question = "";
  let answer = "";
  
  if (type === 1) {
    // ax + bx + c
    question = `${a}${variable} + ${b}${variable} + ${c}`;
    answer = `${a + b}${variable} + ${c}`;
  } else {
    // ax + b + cx
    question = `${a}${variable} + ${b} + ${c}${variable}`;
    answer = `${a + c}${variable} + ${b}`;
  }

  const options = new Set<string>();
  options.add(answer);

  let attempts = 0;
  while (options.size < 4 && attempts < 50) {
    attempts++;
    let fakeAnswer = "";
    const randType = getRandomInt(0, 2);
    
    if (randType === 0) {
      // Combine everything: (a+b+c)x
      fakeAnswer = `${a + b + c}${variable}`;
    } else if (randType === 1) {
      // Combine constants instead of variables or vice versa
      if (type === 1) {
         fakeAnswer = `${a}${variable} + ${b + c}`;
      } else {
         fakeAnswer = `${a + b + c}${variable}`; 
      }
    } else {
       // Math error
       if (type === 1) {
         fakeAnswer = `${a + b + 1}${variable} + ${c}`;
       } else {
         fakeAnswer = `${a + c - 1}${variable} + ${b}`;
       }
    }

    if (fakeAnswer !== answer && !options.has(fakeAnswer)) {
      options.add(fakeAnswer);
    }
  }

  // Fill with random junk if needed
  while (options.size < 4) {
    const fake = `${getRandomInt(1, 20)}x + ${getRandomInt(1, 20)}`;
    if (!options.has(fake)) options.add(fake);
  }

  return {
    question: `Simplify: ${question}`,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
}

export function generateMathProblem(): MathProblem {
  return Math.random() > 0.5 
    ? generateDistributiveProblem() 
    : generateCombiningLikeTermsProblem();
}
