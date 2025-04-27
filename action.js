const today = new Date();

// Kurdish calendar data
const kurdishMonthesRanges = [
  {
    name: "خاکەلێو",
    start: [3, 21],
    end: [4, 20],
    describe: "خاک دەم دەکاتەوە بۆ بوژانەوەی سروشت و نەورۆز دەست پێدەکات",
  },
  {
    name: "بانەمەڕ",
    start: [4, 21],
    end: [5, 21],
    describe:
      "مەڕ و ماڵات دەتوانن بڕۆنە بان و چیا دوورەکان لەبەر گەرمبوونی کەش و هەوا",
  },
  {
    name: "جۆزەردان",
    start: [5, 22],
    end: [6, 21],
    describe: "دەشتودەر زەرد دەبێت، گەنم و جۆ پێدەگات و دروێنە دەکرێن",
  },
  {
    name: "پوشپەڕ",
    start: [6, 22],
    end: [7, 22],
    describe: "پووش و پەڵاش زیاد دەبێت و بەدەم باوە بڵاودەبنەوە",
  },
  {
    name: "گەلاوێژ",
    start: [7, 23],
    end: [8, 22],
    describe:
      "دوای ٤٥ ڕۆژەی هاوین ئەستیرەیەکی گەش دەردەکەوێت کە پێی دەڵین گەلاوێژ",
  },
  {
    name: "خەرمانان",
    start: [8, 23],
    end: [9, 22],
    describe:
      "جوتیاران خەرمان و بەرهەمەکانیان کۆدەکەنەوە کە بە درێژای ساڵ چاوەڕوانی بوون",
  },
  {
    name: "ڕەزبەر",
    start: [9, 23],
    end: [10, 22],
    describe: "ڕەزی ترێ و باخەکان دێنە بەرهەم و ئامادەن بۆ چنینەوە",
  },
  {
    name: "گەڵاڕێزان",
    start: [10, 23],
    end: [11, 21],
    describe:
      "گەڵای درەختەکان زەرد دەبن و دەوەرن و لەگەڵ شنەی بادا بڵاودەبنەوە",
  },
  {
    name: "سەرماوەرز",
    start: [11, 22],
    end: [12, 21],
    describe: "گەڵای درەختەکان بە تەواوی دەوەرن و وەرزی سەرما دەستپێدەکات",
  },
  {
    name: "بەفرانبار",
    start: [12, 22],
    end: [1, 20],
    describe: "کەش و هەوا بە تەواوی سارد دەبیت و بەفر بارین دەستپیدەکات",
  },
  {
    name: "ڕێبەندان",
    start: [1, 21],
    end: [2, 19],
    describe:
      "ڕێگاکان لەبەر بەفری زۆر دەیبەستن و دەگیرین بۆیە هاتووچۆ ئەستەم دەبیت",
  },
  {
    name: "ڕەشەمێ",
    start: [2, 20],
    end: [3, 20],
    describe:
      "هەتاو زۆر دەردەکەویت و کاری دەرەوەی مال زیاد دەکات ئەمەش کار دەکاتە سەر پێستی ڕەنجبەران",
  },
];

// Main logic, finding current month.
function getKurdishMonth(date = today) {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  for (const range of kurdishMonthesRanges) {
    const [startMonth, startDay] = range.start;
    const [endMonth, endDay] = range.end;

    const isCrossYear = startMonth > endMonth;

    const inRange =
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (isCrossYear &&
        ((month === startMonth && day >= startDay) ||
          (month === endMonth && day <= endDay)));
console.log(inRange);

    if (inRange) {
      return {
        ...range,
        daysNum: calculateDaysInRange(range.start, range.end),
      };
    }
  }

  return null;
}

// Counte Number of days in the month
function calculateDaysInRange(start, end) {
  const year = today.getFullYear();
  const startDate = new Date(year, start[0] - 1, start[1]);
  
  let endDate = new Date(year, end[0] - 1, end[1]);
  if (start[0] > end[0]) endDate.setFullYear(year + 1);

  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
}

document.addEventListener("DOMContentLoaded", () => {
 
});

// Define starting day of the first week of month
function getStartWeekday(start) {
  const year = today.getFullYear();
  const date = new Date(year, start[0] - 1, start[1]);
  if (start[0] > today.getMonth() + 1) date.setFullYear(year - 1);
return date.getDay();
}

// Convertning digits to Kurdish digit
function toKurdishNum(num) {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}


// Render calendar
let currentMonth = getKurdishMonth();
if (currentMonth) {
  const monthNameElement = document.getElementById("month-name");
  const describeMonth = document.getElementById("discribe-month");
  const dateContainer = document.getElementById("date-container");

  monthNameElement.textContent = currentMonth.name;
  describeMonth.textContent = currentMonth.describe;

  const startWeekDay = getStartWeekday(currentMonth.start);
  const totalDays = currentMonth.daysNum;

  // Add blank days
  for (let i = 0; i < startWeekDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("date", "empty");
    dateContainer.appendChild(empty);
  }

  // Add dates
  for (let i = 1; i <= totalDays; i++) {
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.textContent = toKurdishNum(i);

    const year = today.getFullYear();
    let date = new Date(
      year,
      currentMonth.start[0] - 1,
      currentMonth.start[1] + (i - 1)
    );

    if (currentMonth.start[0] > currentMonth.end[0] && date.getMonth() === 0)
      date.setFullYear(year + 1);

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      currentMonth.today=i;
      dateDiv.classList.add("today");
    }

    dateContainer.appendChild(dateDiv);
  }
}

let nextMonth = document.querySelector(".next-left");
nextMonth.addEventListener("click", function () {
  // Find current month index
  let currentIndex = kurdishMonthesRanges.findIndex(
    (month) => month.name === currentMonth.name
  );

  // Move to the next month
  let nextIndex = (currentIndex + 1) % kurdishMonthesRanges.length;
  currentMonth = {
    ...kurdishMonthesRanges[nextIndex],
    daysNum: calculateDaysInRange(
      kurdishMonthesRanges[nextIndex].start,
      kurdishMonthesRanges[nextIndex].end
    ),
  };

  // Re-render the calendar
  renderCalendar(currentMonth);
});

const prevMonth = document.querySelector(".prev-right");
prevMonth.addEventListener("click", function () {
  // Find current month index
  let currentIndex = kurdishMonthesRanges.findIndex(
    (month) => month.name === currentMonth.name
  );

  // Move to the previous month
  let prevIndex = (currentIndex - 1 + kurdishMonthesRanges.length) % kurdishMonthesRanges.length;
  
  currentMonth = {
    ...kurdishMonthesRanges[prevIndex],
    daysNum: calculateDaysInRange(
      kurdishMonthesRanges[prevIndex].start,
      kurdishMonthesRanges[prevIndex].end
    ),
  };

  // Re-render the calendar
  renderCalendar(currentMonth);
});


function renderCalendar(month) {
  const monthNameElement = document.getElementById("month-name");
  const describeMonth = document.getElementById("discribe-month");
  const dateContainer = document.getElementById("date-container");
  const dateDivs = document.querySelectorAll('.date');
  const emptyDivs = document.querySelectorAll('.empty');
  
  // Remove all date divs
  dateDivs.forEach(div => div.remove());
  emptyDivs.forEach(div => div.remove());
  

  monthNameElement.textContent = month.name;
  describeMonth.textContent = month.describe;

  const startWeekDay = getStartWeekday(month.start);
  const totalDays = month.daysNum;

  const year = today.getFullYear();

  // Add blank days
  for (let i = 0; i < startWeekDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("date", "empty");
    dateContainer.appendChild(empty);
  }

  // Add dates
  for (let i = 1; i <= totalDays; i++) {
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.textContent = toKurdishNum(i);

    // FIX: create the correct date
    let date = new Date(
      year,
      month.start[0] - 1,
      month.start[1] + (i - 1)
    );

    // Handle cross-year months (like Dec ➔ Jan)
    if (month.start[0] > month.end[0] && date.getMonth() === 0) {
      date.setFullYear(year + 1);
    }

    // Check if it is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      dateDiv.classList.add("today");
    }

    dateContainer.appendChild(dateDiv);
  }
}


// Render Current Date
const currentTime=document.querySelector(".current-time");
const currentDay=document.querySelector(".current-day");

const currentHoure=toKurdishNum(today.getHours());
const currentMinutre=toKurdishNum(today.getMinutes());
currentTime.textContent=currentHoure+":" + currentMinutre;

const currentDays=toKurdishNum(today.getDate());
const currentMonths=toKurdishNum(today.getMonth()+1);
const currentYear=toKurdishNum(today.getFullYear());
currentDay.textContent=currentDays+" / " + currentMonths+" / "+currentYear;

const currentKurdishDay=document.querySelector('.current-kurdish-day');
currentKurdishDay.textContent=toKurdishNum(currentMonth.today)+currentMonth.name+"ی"+toKurdishNum(today.getFullYear()+700);