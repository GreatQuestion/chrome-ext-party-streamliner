// Word lists for generating human-readable random strings
const ADJECTIVES = [
  'swift', 'bright', 'calm', 'bold', 'clever',
  'eager', 'fancy', 'gentle', 'happy', 'jolly',
  'keen', 'lively', 'merry', 'noble', 'proud',
  'quick', 'rapid', 'sharp', 'sunny', 'tender',
  'vivid', 'warm', 'zesty', 'agile', 'brave',
  'crisp', 'daring', 'epic', 'fresh', 'grand',
  'humble', 'ideal', 'jazzy', 'kindly', 'lucky',
  'mighty', 'neat', 'optimal', 'plucky', 'quiet',
  'robust', 'sleek', 'tidy', 'unique', 'vital',
  'witty', 'young', 'zealous', 'active', 'cosmic'
];

const NOUNS = [
  'tiger', 'falcon', 'river', 'mountain', 'ocean',
  'forest', 'meadow', 'canyon', 'valley', 'island',
  'comet', 'planet', 'galaxy', 'nebula', 'phoenix',
  'dragon', 'griffin', 'panther', 'eagle', 'wolf',
  'bear', 'hawk', 'dolphin', 'otter', 'fox',
  'badger', 'raven', 'swan', 'crane', 'heron',
  'cedar', 'maple', 'willow', 'birch', 'aspen',
  'crystal', 'amber', 'jade', 'coral', 'pearl',
  'thunder', 'breeze', 'storm', 'spark', 'flame',
  'frost', 'dawn', 'dusk', 'star', 'moon'
];

function generateRandomString() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = Math.floor(Math.random() * 90) + 10; // 10-99
  return `${adjective}-${noun}-${number}`;
}
