// --- 날짜 달력 팝업 ---
const dateInput = document.getElementById('dateInput');
const calendarEl = document.getElementById('calendar');
let currentDate = new Date();

// 오늘 날짜 초기값 설정
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
dateInput.value = formatDate(currentDate);

// 달력 렌더링 함수
function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  calendarEl.innerHTML = '';

  // 헤더
  const header = document.createElement('div');
  header.className = 'calendar-header';
  const prev = document.createElement('span');
  prev.className = 'prev';
  prev.innerHTML = '&lt;';
  const title = document.createElement('span');
  title.className = 'month-year';
  title.textContent = `${year} . ${String(month+1).padStart(2,'0')}`;
  const next = document.createElement('span');
  next.className = 'next';
  next.innerHTML = '&gt;';
  header.append(prev, title, next);
  calendarEl.append(header);

  // 요일
  const daysNames = ['일','월','화','수','목','금','토'];
  const daysRow = document.createElement('div');
  daysRow.className = 'days-names';
  daysNames.forEach(dn => {
    const cell = document.createElement('div');
    cell.textContent = dn;
    daysRow.append(cell);
  });
  calendarEl.append(daysRow);

  // 날짜 그리드
  const grid = document.createElement('div');
  grid.className = 'date-grid';
  const firstDay = new Date(year, month, 1).getDay();
  for(let i=0; i<firstDay; i++){
    const empty = document.createElement('div');
    empty.className = 'date-cell empty';
    grid.append(empty);
  }
  const lastDate = new Date(year, month+1, 0).getDate();
  for(let d=1; d<=lastDate; d++){
    const cell = document.createElement('div');
    cell.className = 'date-cell';
    cell.textContent = d;
    // 날짜 클릭 시 입력값 설정
    cell.addEventListener('click', () => {
      dateInput.value = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      calendarEl.classList.remove('show');
    });
    // 선택된 날짜 표시
    if (dateInput.value === `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`) {
      cell.classList.add('selected');
    }
    grid.append(cell);
  }
  calendarEl.append(grid);

  // 이전/다음 달 네비게이션
  prev.addEventListener('click', () => {
    currentDate = new Date(year, month-1);
    renderCalendar(currentDate);
  });
  next.addEventListener('click', () => {
    currentDate = new Date(year, month+1);
    renderCalendar(currentDate);
  });
}

// 달력 토글
dateInput.parentElement.addEventListener('click', () => {
  calendarEl.classList.toggle('show');
  if (calendarEl.classList.contains('show')) {
    renderCalendar(currentDate);
  }
});
document.addEventListener('click', e => {
  if (!dateInput.parentElement.contains(e.target)) {
    calendarEl.classList.remove('show');
  }
});


// --- 의사 선택 드롭다운 ---
const doctorSelect = document.getElementById('doctorSelect');
const selectedBox = doctorSelect.querySelector('.selected');
const optionsBox  = doctorSelect.querySelector('.options');

doctorSelect.addEventListener('click', e => {
  optionsBox.classList.toggle('show');
});
optionsBox.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', e => {
    e.stopPropagation();
    // 선택된 내용을 .selected 에 복사
    selectedBox.innerHTML = li.innerHTML;
    optionsBox.classList.remove('show');
  });
});
document.addEventListener('click', e => {
  if (!doctorSelect.contains(e.target)) {
    optionsBox.classList.remove('show');
  }
});


// --- 환자 목록 클릭/활성화 ---
document.querySelectorAll('.patient-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.patient-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});
