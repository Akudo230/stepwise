// Tab Switching
function showTab(tabId) {
  const allTabs = document.querySelectorAll('.tab-content');
  allTabs.forEach(tab => tab.classList.add('hidden'));

  document.getElementById(tabId).classList.remove('hidden');
}

// Toggle "Switch Career?" extra dropdown
function toggleSwitchField() {
  const checkbox = document.getElementById('switch-career');
  const newFieldDiv = document.getElementById('new-field-div');
  newFieldDiv.classList.toggle('hidden', !checkbox.checked);
}

// Dummy form processing
function saveAndContinue() {
  let activeTab = document.querySelector('.tab-content:not(.hidden)');
  alert("Preferences saved for: " + activeTab.querySelector('h2').innerText);
}
