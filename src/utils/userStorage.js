// User Data Storage & Export Utility for RRMI

const USERS_STORAGE_KEY = 'rrmi_registered_users';
const UNLOCKED_PHASE_KEY = 'rrmi_unlocked_phase';
const UNLOCKED_STATUS_KEY = 'rrmi_is_unlocked';

export function getStoredUsers() {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading stored users:', err);
    return [];
  }
}

export function saveUserData(userData) {
  try {
    const existing = getStoredUsers();
    const newUser = {
      ...userData,
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [newUser, ...existing];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving user data:', err);
    return [];
  }
}

/**
 * Save the unlocked phase ('celebration' or 'website') to survive page reloads
 */
export function setStoredUnlockedPhase(phase) {
  try {
    localStorage.setItem(UNLOCKED_PHASE_KEY, phase);
    localStorage.setItem(UNLOCKED_STATUS_KEY, 'true');
  } catch (e) {
    console.warn('Storage unavailable', e);
  }
}

/**
 * Get stored unlocked phase if previously completed
 */
export function getStoredUnlockedPhase() {
  try {
    return localStorage.getItem(UNLOCKED_PHASE_KEY);
  } catch {
    return null;
  }
}

export function isMovementUnlocked() {
  try {
    return localStorage.getItem(UNLOCKED_STATUS_KEY) === 'true';
  } catch {
    return false;
  }
}

export function exportUsersToCSV() {
  const users = getStoredUsers();
  if (users.length === 0) {
    alert('No user registrations recorded yet.');
    return;
  }

  const headers = ['Voice ID', 'Name', 'State', 'City', 'Profession', 'Contact (Phone/Email)', 'Pledge', 'Registration Date'];
  const rows = users.map(u => [
    `"${u.id || ''}"`,
    `"${(u.name || '').replace(/"/g, '""')}"`,
    `"${(u.state || '').replace(/"/g, '""')}"`,
    `"${(u.city || '').replace(/"/g, '""')}"`,
    `"${(u.profession || '').replace(/"/g, '""')}"`,
    `"${(u.contact || '').replace(/"/g, '""')}"`,
    `"${(u.quote || u.pledge || '').replace(/"/g, '""')}"`,
    `"${u.dateFormatted || u.date || ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `RRMI_Registered_Users_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
