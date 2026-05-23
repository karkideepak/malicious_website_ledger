// ── Seed data (3 example entries) ──────────────────────────────────────
const SEED = [
  { id:1, ticket:'INC1234',  analyst:'robot@company.com', url:'https://malicious.com',         status:'Blocked',       added: new Date(Date.now()-30*864e5), followup:'Case1234' },
  { id:2, ticket:'INC1891',  analyst:'jsmith@company.com', url:'http://phishing-bank.net/login', status:'Monitoring',    added: new Date(Date.now()-7*864e5),  followup:'' },
  { id:3, ticket:'JIRA-442', analyst:'alee@company.com',   url:'https://dropper.evil.io/payload',status:'Investigating', added: new Date(Date.now()-2*864e5),  followup:'VND-9921' },
];
let data = [...SEED];
let nextId = 10;
let query = '';

// ── Defang logic ────────────────────────────────────────────────────────
// Converts a raw URL into a safe, non-clickable defanged string:
//   https://malicious.com  →  hxxp[://]malicious[.]com
function defang(u) {
  return u
    .replace(/^https?/, 'hxxp')      // protocol: https/http → hxxp
    .replace(/\./g, '[.]')            // all dots → [.]
    .replace('://', '[://]');         // :// → [://]
}

// ── Avatar initials ─────────────────────────────────────────────────────
// Takes an email like "jsmith@company.com" and returns "JS"
function initials(email) {
  const parts = email.split('@')[0].split(/[._-]/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : email.slice(0, 2).toUpperCase();
}

// ── Duration ────────────────────────────────────────────────────────────
// Returns whole number of days since the entry was added
function daysSince(d) {
  return Math.floor((Date.now() - new Date(d)) / 864e5);  // 864e5 = ms per day
}

// ── Status pill CSS class ────────────────────────────────────────────────
function pillClass(s) {
  const m = {
    Blocked: 'pill-blocked',
    Monitoring: 'pill-monitoring',
    Resolved: 'pill-resolved',
    Investigating: 'pill-investigating'
  };
  return m[s] || 'pill-monitoring';
}

// ── Status icon (Tabler outline icon name) ───────────────────────────────
function statusIcon(s) {
  const m = {
    Blocked: 'ti-lock',
    Monitoring: 'ti-eye',
    Resolved: 'ti-circle-check',
    Investigating: 'ti-search'
  };
  return m[s] || 'ti-help';
}

// ── Main render function ─────────────────────────────────────────────────
// Filters data by search query, then rebuilds the entire <tbody> and
// updates all four stat counters.
function render() {
  const q = query.toLowerCase();
  const rows = data.filter(r =>
    r.ticket.toLowerCase().includes(q) ||
    r.analyst.toLowerCase().includes(q) ||
    r.url.toLowerCase().includes(q) ||
    r.followup.toLowerCase().includes(q)
  );

  const tbody = document.getElementById('tbody');

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty">No entries found</div></td></tr>`;
  } else {
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td><span class="ticket-link">${r.ticket}</span></td>
        <td>
          <div class="analyst-cell">
            <div class="avatar">${initials(r.analyst)}</div>
            <span>${r.analyst}</span>
          </div>
        </td>
        <td><code class="url-code">${defang(r.url)}</code></td>
        <td><span class="pill ${pillClass(r.status)}">
          <i class="ti ${statusIcon(r.status)}"></i>${r.status}
        </span></td>
        <td>${daysSince(r.added)}d</td>
        <td>${r.followup || '—'}</td>
        <td>
          <button class="btn-del" onclick="del(${r.id})" aria-label="Delete ${r.ticket}">
            <i class="ti ti-trash"></i>
          </button>
        </td>
      </tr>`).join('');
  }

  // Update stat cards
  document.getElementById('badge').textContent    = data.length;
  document.getElementById('s-total').textContent  = data.length;
  document.getElementById('s-blocked').textContent = data.filter(r => r.status === 'Blocked').length;
  document.getElementById('s-mon').textContent    = data.filter(r => r.status === 'Monitoring').length;
  document.getElementById('s-res').textContent    = data.filter(r => r.status === 'Resolved').length;
}

// ── Delete entry ─────────────────────────────────────────────────────────
function del(id) {
  data = data.filter(r => r.id !== id);
  render();
}

// ── Modal: open ──────────────────────────────────────────────────────────
function openModal() {
  ['f-ticket','f-analyst','f-url','f-followup'].forEach(id =>
    document.getElementById(id).value = ''
  );
  document.getElementById('f-status').value = 'Blocked';
  document.getElementById('modal').classList.add('open');
  document.getElementById('f-ticket').focus();
}

// ── Modal: close ─────────────────────────────────────────────────────────
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ── Modal: save ──────────────────────────────────────────────────────────
function saveEntry() {
  const ticket   = document.getElementById('f-ticket').value.trim();
  const analyst  = document.getElementById('f-analyst').value.trim();
  const url      = document.getElementById('f-url').value.trim();
  if (!ticket || !analyst || !url) {
    alert('Ticket, analyst and URL are required.');
    return;
  }
  data.push({
    id:       nextId++,
    ticket,
    analyst,
    url,                   // stored raw; defang() is applied only on display
    status:   document.getElementById('f-status').value,
    added:    new Date(),  // timestamp for duration calculation
    followup: document.getElementById('f-followup').value.trim()
  });
  closeModal();
  render();
}

// ── Search listener ──────────────────────────────────────────────────────
document.getElementById('search').addEventListener('input', e => {
  query = e.target.value;
  render();
});

// ── Click outside modal to close ────────────────────────────────────────
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

// ── Initial render ───────────────────────────────────────────────────────
render();
