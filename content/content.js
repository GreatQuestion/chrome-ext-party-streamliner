// Default settings (same as popup.js)
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

// Convert glob pattern to regex
function globToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape special regex chars
    .replace(/\*/g, '.*'); // Convert * to .*
  return new RegExp(`^${escaped}$`);
}

// Check if current URL matches any pattern
function urlMatchesPatterns(url, patterns) {
  return patterns.some(pattern => {
    const regex = globToRegex(pattern);
    return regex.test(url);
  });
}

// Detect if page has a GQ participant form
function detectForm() {
  // Look for name input
  const nameInput = document.querySelector('input#name, input[name*="name"][type="text"]');
  if (!nameInput) return null;

  // Look for email input
  const emailInput = document.querySelector('input#email, input[type="email"]');
  if (!emailInput) return null;

  // Look for consent checkboxes
  const consentCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="consent"]');
  if (consentCheckboxes.length === 0) return null;

  // Look for submit button
  const submitButton = document.querySelector('input[type="submit"], button[type="submit"]');

  return {
    nameInput,
    emailInput,
    consentCheckboxes: Array.from(consentCheckboxes),
    submitButton
  };
}

// Fill the form with generated data
function fillForm(form, settings) {
  const randomString = generateRandomString();
  
  // Fill name
  const fullName = `${settings.namePrefix} ${randomString}`;
  form.nameInput.value = fullName;
  form.nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  form.nameInput.dispatchEvent(new Event('change', { bubbles: true }));

  // Fill email
  const atIndex = settings.baseEmail.indexOf('@');
  const username = atIndex > 0 ? settings.baseEmail.substring(0, atIndex) : settings.baseEmail;
  const domain = atIndex > 0 ? settings.baseEmail.substring(atIndex + 1) : 'example.com';
  const fullEmail = `${username}+${randomString}@${domain}`;
  
  form.emailInput.value = fullEmail;
  form.emailInput.dispatchEvent(new Event('input', { bubbles: true }));
  form.emailInput.dispatchEvent(new Event('change', { bubbles: true }));

  // Check consent checkboxes
  form.consentCheckboxes.forEach(checkbox => {
    if (!checkbox.checked) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  // Auto-submit if enabled
  if (settings.autoSubmit && form.submitButton) {
    // Small delay to ensure form state is updated
    setTimeout(() => {
      form.submitButton.click();
    }, 100);
  }

  console.log('[GQ Party Streamliner] Form filled:', { name: fullName, email: fullEmail });
}

// Main function
async function main() {
  // Get settings
  const settings = await chrome.storage.sync.get(DEFAULTS);
  
  // Check if extension is enabled
  if (!settings.enabled) {
    console.log('[GQ Party Streamliner] Extension is disabled');
    return;
  }

  // Check if URL matches patterns
  const currentUrl = window.location.href;
  if (!urlMatchesPatterns(currentUrl, settings.urlPatterns)) {
    console.log('[GQ Party Streamliner] URL does not match patterns');
    return;
  }

  // Detect form
  const form = detectForm();
  if (!form) {
    console.log('[GQ Party Streamliner] No matching form found');
    return;
  }

  // Fill the form
  fillForm(form, settings);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
