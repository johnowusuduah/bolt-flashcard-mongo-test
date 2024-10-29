// SuperMemo 2 Algorithm Implementation
export function calculateNextReview(quality: number, card: any) {
  // quality: 0-5 rating of how well the card was remembered
  // Returns: { interval, repetitions, easeFactor }
  
  let { interval, repetitions, easeFactor } = card;
  
  // Update ease factor
  const newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calculate new interval
  let newInterval;
  if (quality < 3) {
    // If rating is less than 3, reset the card
    repetitions = 0;
    newInterval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      newInterval = 1;
    } else if (repetitions === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
  }

  return {
    interval: newInterval,
    repetitions,
    easeFactor: newEaseFactor,
    dueDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000),
  };
}