const SUPABASE_URL = "https://euonswmeufydxurbjgiq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1b25zd21ldWZ5ZHh1cmJqZ2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MzgwNjgsImV4cCI6MjA5NzMxNDA2OH0.0xapkPjdjt8hWeJRWxns9Zrncb3ryVoRNtAUGhnT7po";

async function fetchContent() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_content?select=id,value`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) throw new Error('Fetch failed');
    const rows = await res.json();
    const map = {};
    rows.forEach(r => map[r.id] = r.value);
    return map;
  } catch (err) {
    console.error('Could not load content:', err);
    return null;
  }
}

function applyContent(data) {
  if (!data) return;
  document.querySelectorAll('[data-cms]').forEach(el => {
    const key = el.getAttribute('data-cms');
    if (data[key] !== undefined) {
      el.textContent = data[key];
      el.classList.remove('skel');
    }
  });
  // Handle comma-separated pill lists
  document.querySelectorAll('[data-cms-pills]').forEach(el => {
    const key = el.getAttribute('data-cms-pills');
    if (data[key] !== undefined) {
      const items = data[key].split(',').map(s => s.trim()).filter(Boolean);
      el.innerHTML = items.map(i => `<span class="pill">${i}</span>`).join('');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchContent();
  applyContent(data);
});
