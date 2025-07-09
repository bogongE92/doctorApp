document.addEventListener('DOMContentLoaded', () => {
    
    /* 
        ****** 날짜 달력 팝업 ******
    */
    const wrapper      = document.querySelector('.date-picker-wrapper');
    const pickerBox    = wrapper.querySelector('.date-picker-box');
    const dateInput    = pickerBox.querySelector('#dateInput');
    const calendarIcon = pickerBox.querySelector('.calendar-icon');
    const calendarEl   = wrapper.querySelector('#calendar');
    let currentDate    = new Date();

    // 오늘 날짜 초기값 설정
    function formatDate(d) {
        const y   = d.getFullYear();
        const m   = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
    dateInput.value = formatDate(currentDate);

    // 달력 렌더링 함수 
    function renderCalendar(date) {
        const year  = date.getFullYear();
        const month = date.getMonth();
        calendarEl.innerHTML = '';

        // 헤더
        const header = document.createElement('div');
        header.className = 'calendar-header';
        const prev  = document.createElement('span');
        prev.className = 'prev';
        const title = document.createElement('span');
        title.className = 'month-year';
        title.textContent = `${year} . ${String(month + 1).padStart(2, '0')}`;
        const next  = document.createElement('span');
        next.className = 'next';
        header.append(prev, title, next);
        calendarEl.append(header);

        // 요일
        const daysNames = ['일','월','화','수','목','금','토'];
        const daysRow   = document.createElement('div');
        daysRow.className = 'days-names';
        daysNames.forEach(dn => {
        const cell = document.createElement('div');
        cell.textContent = dn;
        daysRow.append(cell);
        });
        calendarEl.append(daysRow);

        // 날짜 그리드
        const grid     = document.createElement('div');
        grid.className = 'date-grid';
        const firstDay = new Date(year, month, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'date-cell empty';
            grid.append(empty);
        }

        const lastDate = new Date(year, month + 1, 0).getDate();
        for (let d = 1; d <= lastDate; d++) {
            const cell = document.createElement('div');
            cell.className = 'date-cell';
            cell.textContent = d;
            cell.addEventListener('click', () => {
                dateInput.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                calendarEl.classList.remove('show');
                calendarIcon.classList.remove('active');
            });
            if (dateInput.value === `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`) {
                cell.classList.add('selected');
            }
            grid.append(cell);
        }
        calendarEl.append(grid);

        // prev/next 버튼
        prev.addEventListener('click', e => {
            e.stopPropagation();
            currentDate = new Date(year, month - 1);
            renderCalendar(currentDate);
        });
        next.addEventListener('click', e => {
            e.stopPropagation();
            currentDate = new Date(year, month + 1);
            renderCalendar(currentDate);
        });
    }

    // 달력 내부 클릭 시 외부 클릭 닫기 방지
    calendarEl.addEventListener('click', e => e.stopPropagation());

    // input 또는 아이콘 클릭 → 달력 토글 + 아이콘 active 토글
    [dateInput, calendarIcon].forEach(el =>
        el.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = calendarEl.classList.toggle('show');
            if (isOpen) {
                renderCalendar(currentDate);
                calendarIcon.classList.add('active');
            } else {
                calendarIcon.classList.remove('active');
            }
        })
    );

    // 외부 클릭 시 달력 닫기 + 아이콘 active 제거
    document.addEventListener('click', () => {
        calendarEl.classList.remove('show');
        calendarIcon.classList.remove('active');
    });


    /* 
        ****** 의사 선택 드롭다운  ***** 
    */
    const doctorSelect   = document.getElementById('doctorSelect');
    const selectedTxt    = doctorSelect.querySelector('.selected .selected-txt');
    const selectIcon     = doctorSelect.querySelector('.selected .select-icon');
    const optionsBox     = doctorSelect.querySelector('.options-box');
    const optionItems    = optionsBox.querySelectorAll('li');

    // 1) wrapper 클릭 → 옵션 토글 + 아이콘 회전
    doctorSelect.addEventListener('click', e => {
        e.stopPropagation();
        optionsBox.classList.toggle('show');
        selectIcon.classList.toggle('active');
    });

    // 2) 옵션 클릭 → 선택 텍스트 갱신, 닫기, 아이콘 리셋
    optionItems.forEach(li => {
        li.addEventListener('click', e => {
            e.stopPropagation();
            // 원하는 표시값: 성함만
            const name = li.querySelector('.info .name').textContent;
            selectedTxt.textContent = name;
            optionsBox.classList.remove('show');
            selectIcon.classList.remove('active');
        });
    });

    // 3) 외부 클릭 → 옵션 닫기 + 아이콘 리셋
    document.addEventListener('click', e => {
        if (!doctorSelect.contains(e.target)) {
            optionsBox.classList.remove('show');
            selectIcon.classList.remove('active');
        }
    });


    /* 
        ****** 환자 목록 클릭/활성화 ****** 
    */
    document.querySelectorAll('.patient-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.patient-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
