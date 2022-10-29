
import { lunarToSolar } from "./lunartosolar";
export function processtarot(dayType, dateinyyyymmdd, startYear, endYear) {
  var solarDate
  if (dayType == "solar") {
    solarDate = parse(dateinyyyymmdd.toString());
  }
  else { //if input is lunar date
    console.log(dateinyyyymmdd.toString(), "음력")
    console.log(lunarToSolar(dateinyyyymmdd.toString()), "양력")

    solarDate = parse(lunarToSolar(dateinyyyymmdd.toString()));
  }

  // helpers
  function parse(str) {
    if (!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0, 4),
      m = str.substr(4, 2) - 1,
      d = str.substr(6, 2);
    return new Date(y, m, d);
  }

  // initialize helper functions (these functions are only used inside the global object scope)
  // if limitValue = 23 : sum  the value until result is below 23
  function sumDigitsUntil(n, limitValue) {
    while (n > limitValue) {
      n = n
        .toString()
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
    }

    return n;
  }

  // 양력에서 음력으로 (input, output 모두 date object)
  function toLunar(solarDate) {
    var lunarMonthTable = [
      [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1] /* 1901 */,
      [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2] /* 1911 */,
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
      [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 5, 2, 2, 1, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2] /* 1921 */,
      [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
      [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
      [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1] /* 1931 */,
      [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
      [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
      [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1] /* 1941 */,
      [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
      [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2] /* 1951 */,
      [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
      [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
      [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1961 */,
      [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
      [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2] /* 1971 */,
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
      [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
      [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2] /* 1981 */,
      [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
      [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2] /* 1991 */,
      [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
      [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
      [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
      [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
      [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
      [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1],
      [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
      [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
      [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
      [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
      [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
      [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
      [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
      [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
      [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
      [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
    ];

    function myDate(year, month, day, leapMonth) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.leapMonth = leapMonth;
    }

    function lunarCalc(year, month, day, type, leapmonth) {
      var solYear, solMonth, solDay;
      var lunYear, lunMonth, lunDay;
      var lunLeapMonth, lunMonthDay;
      var i, lunIndex;

      var solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      /* range check */
      if (year < 1900 || year > 2040) {
        alert("1900년부터 2040년까지만 지원합니다");
        return;
      }

      /* 속도 개선을 위해 기준 일자를 여러개로 한다 */
      if (year >= 2000) {
        /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
        solYear = 2000;
        solMonth = 1;
        solDay = 1;
        lunYear = 1999;
        lunMonth = 11;
        lunDay = 25;
        lunLeapMonth = 0;

        solMonthDay[1] = 29; /* 2000 년 2월 28일 */
        lunMonthDay = 30; /* 1999년 11월 */
      } else if (year >= 1970) {
        /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
        solYear = 1970;
        solMonth = 1;
        solDay = 1;
        lunYear = 1969;
        lunMonth = 11;
        lunDay = 24;
        lunLeapMonth = 0;

        solMonthDay[1] = 28; /* 1970 년 2월 28일 */
        lunMonthDay = 30; /* 1969년 11월 */
      } else if (year >= 1940) {
        /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
        solYear = 1940;
        solMonth = 1;
        solDay = 1;
        lunYear = 1939;
        lunMonth = 11;
        lunDay = 22;
        lunLeapMonth = 0;

        solMonthDay[1] = 29; /* 1940 년 2월 28일 */
        lunMonthDay = 29; /* 1939년 11월 */
      } else {
        /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
        solYear = 1900;
        solMonth = 1;
        solDay = 1;
        lunYear = 1899;
        lunMonth = 12;
        lunDay = 1;
        lunLeapMonth = 0;

        solMonthDay[1] = 28; /* 1900 년 2월 28일 */
        lunMonthDay = 30; /* 1899년 12월 */
      }

      lunIndex = lunYear - 1899;

      while (true) {
        if (
          type == 1 &&
          year == solYear &&
          month == solMonth &&
          day == solDay
        ) {
          return new myDate(lunYear, lunMonth, lunDay, lunLeapMonth);
        } else if (
          type == 2 &&
          year == lunYear &&
          month == lunMonth &&
          day == lunDay &&
          leapmonth == lunLeapMonth
        ) {
          return new myDate(solYear, solMonth, solDay, 0);
        }

        /* add a day of solar calendar */
        if (solMonth == 12 && solDay == 31) {
          solYear++;
          solMonth = 1;
          solDay = 1;

          /* set monthDay of Feb */
          if (solYear % 400 == 0) solMonthDay[1] = 29;
          else if (solYear % 100 == 0) solMonthDay[1] = 28;
          else if (solYear % 4 == 0) solMonthDay[1] = 29;
          else solMonthDay[1] = 28;
        } else if (solMonthDay[solMonth - 1] == solDay) {
          solMonth++;
          solDay = 1;
        } else solDay++;

        /* add a day of lunar calendar */
        if (
          lunMonth == 12 &&
          ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) ||
            (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))
        ) {
          lunYear++;
          lunMonth = 1;
          lunDay = 1;

          if (lunYear > 2043) {
            alert("입력하신 달은 없습니다.");
            break;
          }

          lunIndex = lunYear - 1899;

          if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2)
            lunMonthDay = 30;
        } else if (lunDay == lunMonthDay) {
          if (
            lunarMonthTable[lunIndex][lunMonth - 1] >= 3 &&
            lunLeapMonth == 0
          ) {
            lunDay = 1;
            lunLeapMonth = 1;
          } else {
            lunMonth++;
            lunDay = 1;
            lunLeapMonth = 0;
          }

          if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2)
            lunMonthDay = 30;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3)
            lunMonthDay = 29;
          else if (
            lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
            lunLeapMonth == 0
          )
            lunMonthDay = 29;
          else if (
            lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
            lunLeapMonth == 1
          )
            lunMonthDay = 30;
          else if (
            lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
            lunLeapMonth == 0
          )
            lunMonthDay = 30;
          else if (
            lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
            lunLeapMonth == 1
          )
            lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6)
            lunMonthDay = 30;
        } else lunDay++;
      }
    }

    function dayCalcDisplay(startYear, startMonth, startDay) {
      if (
        !startYear ||
        startYear == 0 ||
        !startMonth ||
        startMonth == 0 ||
        !startDay ||
        startDay == 0
      ) {
        alert("날짜를 입력해주세요");
        return;
      }

      var solMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (startYear % 400 == 0 || (startYear % 4 == 0 && startYear % 100 != 0))
        solMonthDay[1] += 1;

      if (
        startMonth < 1 ||
        startMonth > 12 ||
        startDay < 1 ||
        startDay > solMonthDay[startMonth - 1]
      ) {
        if (solMonthDay[1] == 28 && startMonth == 2 && startDay > 28)
          alert("윤년이 아닙니다. 다시 입력해주세요");
        else alert("날짜 범위를 벗어났습니다. 다시 입력해주세요");
        return;
      }

      var startDate = new Date(startYear, startMonth - 1, startDay);

      /* 양력/음력 변환 */
      var date = lunarCalc(startYear, startMonth, startDay, 1);

      return new Date(date.year, date.month - 1, date.day);

      // return date.year + "년 " +
      //   (date.leapMonth ? "윤" : "") + date.month + "월 " +
      //   date.day + "일 ";
    }

    const solarYear = solarDate.getFullYear().toString();
    const solarMonth = solarDate.getMonth() + 1;
    const solarDay = solarDate.getDate();
    return dayCalcDisplay(solarYear, solarMonth, solarDay);
  }

  // input is solar date, returns [혼의수, 선천수, 후천수] (순서대로)
  function getSpecialNumbers(solarDate) {
    const solarYear = solarDate.getFullYear();
    const solarMonth = solarDate.getMonth() + 1;
    const solarDay = solarDate.getDate();

    let lunarDate = toLunar(solarDate);
    const lunarYear = lunarDate.getFullYear();
    const lunarMonth = lunarDate.getMonth() + 1;
    const lunarDay = lunarDate.getDate();

    // 혼의수 : 음력 생일을 숫자별로 더하기
    // 2001/11/7 -> 2 + 1 + 1+ 1+ 7 = 12
    let loneNum = sumDigitsUntil(
      sumDigits(lunarYear) + sumDigits(lunarMonth) + sumDigits(lunarDay),
      22
    );

    // 선천수 : 음력 생일을 그대로 더하기
    // 2001/11/7 -> 2001 + 11 + 7 = 2019 -> 2 + 0 + 1 + 9

    let bornNum = sumDigitsUntil(lunarYear + lunarMonth + lunarDay, 22);

    // 후천수 : 양력 생일을 그대로 더하기
    // 2001/11/7 -> 2001 + 11 + 7 = 2019 -> 2 + 0 + 1 + 9
    let afterNum = sumDigitsUntil(solarYear + solarMonth + solarDay, 22);

    let overallNum = sumDigitsUntil(bornNum + afterNum, 9);

    return [
      { name: "혼의수", value: loneNum },
      { name: "선천수", value: bornNum },
      { name: "후천수", value: afterNum },
      { name: "종합수", value: overallNum }
    ]
  }

  // getYearlyNum : 상반기 수, 하반기 수, 총운 수를 순서대로 보여줌
  // input은 양력 생일 + 대상 연도
  function getYearlyNums(solarDate, targetYear) {
    const solarYear = solarDate.getFullYear().toString();
    const solarMonth = solarDate.getMonth() + 1;
    const solarDay = solarDate.getDate();

    let lunarDate = toLunar(solarDate);

    const lunarYear = lunarDate.getFullYear().toString();
    const lunarMonth = lunarDate.getMonth() + 1;
    const lunarDay = lunarDate.getDate();

    // 상반기 수 : 해당연도 + 음력 생일 중 월 / 일
    let firstHalfNum = sumDigitsUntil(targetYear + lunarMonth + lunarDay, 22);

    // 하반기 수 : 해당연도 + 음력 생일 중 월 / 일
    let secondHalfNum = sumDigitsUntil(targetYear + solarMonth + solarDay, 22);

    // 총운 수
    let totalNum = sumDigitsUntil(firstHalfNum + secondHalfNum, 9);

    return { targetYear, firstHalfNum, secondHalfNum, totalNum };
  }

  ////////helpers
  function sumDigits(number) {
    const sum = number
      .toString()
      .split("")
      .map(Number)
      .reduce(function (a, b) {
        return a + b;
      }, 0);
    return sum;
  }

  let yearArray = [
    ...Array(parseInt(endYear) - parseInt(startYear) + 1).keys(),
  ].map((index) => index + parseInt(startYear));

  let yearlyNums = yearArray.map((targetYear) =>
    getYearlyNums(solarDate, targetYear)
  );

  let resultObject = {
    solarDate: solarDate,
    lunarDate: toLunar(solarDate),
    specialNums: getSpecialNumbers(solarDate),
    startYear: startYear,
    endYear: endYear,
    yearlyNums: yearlyNums,
  };
  console.log(resultObject);
  return resultObject;
};
