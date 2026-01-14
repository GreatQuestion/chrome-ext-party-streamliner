// Default settings
const DEFAULTS = {
  enabled: true,
  namePrefix: 'Test',
  baseEmail: 'e4e@greatquestion.co',
  autoSubmit: false,
  urlPatterns: [
    '*://greatquestion.co/*/*/direct*',
    '*://greatquestion.co/*/*/bookings/new*',
    '*://greatquestion.co/*/*/external/apply*'
  ]
};

// DOM elements
const elements = {
  enabled: document.getElementById('enabled'),
  namePrefix: document.getElementById('namePrefix'),
  baseEmail: document.getElementById('baseEmail'),
  autoSubmit: document.getElementById('autoSubmit'),
  urlPatterns: document.getElementById('urlPatterns'),
  patternCount: document.getElementById('patternCount'),
  namePreview: document.getElementById('namePreview'),
  emailPreview: document.getElementById('emailPreview'),
  saveBtn: document.getElementById('saveBtn'),
  status: document.getElementById('status')
};

// Load settings from storage
async function loadSettings() {
  const result = await chrome.storage.sync.get(DEFAULTS);
  
  elements.enabled.checked = result.enabled;
  elements.namePrefix.value = result.namePrefix;
  elements.baseEmail.value = result.baseEmail;
  elements.autoSubmit.checked = result.autoSubmit;
  elements.urlPatterns.value = result.urlPatterns.join('\n');
  
  updatePreviews();
  updatePatternCount();
}

// Save settings to storage
async function saveSettings() {
  const patterns = elements.urlPatterns.value
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const settings = {
    enabled: elements.enabled.checked,
    namePrefix: elements.namePrefix.value || DEFAULTS.namePrefix,
    baseEmail: elements.baseEmail.value || DEFAULTS.baseEmail,
    autoSubmit: elements.autoSubmit.checked,
    urlPatterns: patterns.length > 0 ? patterns : DEFAULTS.urlPatterns
  };

  await chrome.storage.sync.set(settings);
  
  // Show saved status
  elements.status.textContent = '✓ Saved';
  elements.status.classList.add('show');
  setTimeout(() => {
    elements.status.classList.remove('show');
  }, 2000);
}

// Update preview text
function updatePreviews() {
  const namePrefix = elements.namePrefix.value || DEFAULTS.namePrefix;
  const baseEmail = elements.baseEmail.value || DEFAULTS.baseEmail;
  
  // Parse email
  const atIndex = baseEmail.indexOf('@');
  const username = atIndex > 0 ? baseEmail.substring(0, atIndex) : baseEmail;
  const domain = atIndex > 0 ? baseEmail.substring(atIndex + 1) : 'example.com';
  
  const exampleRandom = 'bright-falcon-42';
  
  elements.namePreview.textContent = `"${namePrefix} ${exampleRandom}"`;
  elements.emailPreview.textContent = `"${username}+${exampleRandom}@${domain}"`;
}

// Update pattern count display
function updatePatternCount() {
  const patterns = elements.urlPatterns.value
    .split('\n')
    .filter(p => p.trim().length > 0);
  elements.patternCount.textContent = `(${patterns.length})`;
}

// Event listeners
elements.namePrefix.addEventListener('input', updatePreviews);
elements.baseEmail.addEventListener('input', updatePreviews);
elements.urlPatterns.addEventListener('input', updatePatternCount);
elements.saveBtn.addEventListener('click', saveSettings);

// Also save on Enter key in text fields
elements.namePrefix.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') saveSettings();
});
elements.baseEmail.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') saveSettings();
});

// Load settings on popup open
loadSettings();
