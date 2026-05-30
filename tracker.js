// Track time spent on each page
(function () {
  const page  = window.location.pathname.split('/').pop() || 'index.html';
  const start = Date.now();

  function save() {
    const seconds = Math.round((Date.now() - start) / 1000);
    if (seconds < 1) return;
    const data = JSON.parse(localStorage.getItem('timeTracking') || '{}');
    data[page] = (data[page] || 0) + seconds;
    data['_total'] = (data['_total'] || 0) + seconds;

    // Log a visit
    const visits = JSON.parse(localStorage.getItem('visits') || '[]');
    visits.unshift({ page, seconds, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() });
    if (visits.length > 100) visits.pop();
    localStorage.setItem('visits', JSON.stringify(visits));
    localStorage.setItem('timeTracking', JSON.stringify(data));
  }

  window.addEventListener('beforeunload', save);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') save();
  });
})();
