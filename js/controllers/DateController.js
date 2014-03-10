var dateApp = angular.module('DateApp', []);
var monthStrings = ['January','February','March',
					'April','May','June',
					'July','August', 'September',
					'October','November','December'];

dateApp.factory('theDate', function(){
	return {
		year: 2013,
		month: 12,
		day: 31
	};
});

function DateCtrl ($scope, theDate) {

	var validInput = true;
	var daysInMonth = 31;
	var chineseCharacter = '';

	$scope.mdate = theDate;
	$scope.getTomorrow = function (year, month, day) {
		//var tomorrow = $scope.date.day;
		//return $scope.mdate;
		var Tomorrow = $scope.calculateTomorrow(year,month,day);

		console.log("Error is "+$scope.enterDate.year.$error.maxlength);
		if (typeof Tomorrow.year ==='undefined' || typeof Tomorrow.month ==='undefined' || typeof Tomorrow.day ==='undefined') {
			console.log(Tomorrow + "This aint working");
		};
		// 
		if ($scope.checkDay(day) === "error" || $scope.checkMonth(month) === "error" 
			|| $scope.checkYear(year) === "error" || $scope.enterDate.year.$error.minlength 
			|| $scope.enterDate.year.$error.pattern || $scope.enterDate.month.$error.pattern
			|| $scope.enterDate.day.$error.pattern || $scope.enterDate.year.$error.maxlength 
			) {
			return {
				"date" : " ",
				"day": " ",
				"chineseYear": " ",
				"chineseCharacter": " "
			};
		}
		else{
			return {
				"date" : Tomorrow.Year + " - " + monthStrings[Tomorrow.Month-1] + " - " + Tomorrow.Day,
				"day": $scope.getDayOfWeek(Tomorrow.Year,Tomorrow.Month,Tomorrow.Day),
				"chineseYear": 'Chinese year of the: ' + $scope.getChineseCalendarDate(Tomorrow.Year),
				"chineseCharacter": $scope.chineseCharacter()
			};
		}

	};

	$scope.isLeapYear = function(year){
		if (year%400 === 0) {
			return true;
		} else if(year%100 ===0){
			return false;
		} else if(year%4 ===0){
			return true;
		} else {
			return false;
		}
	};

	$scope.calculateTomorrow = function(year, month, day) {
		
		var tomorrow = {
			Year: year,
			Month: month,
			Day: day
		};

		day = parseInt(day);
		month = parseInt(month);
		year = parseInt(year);

		if (month === 2) {
			if ($scope.isLeapYear(year)) {
					daysInMonth = 29;
				} else{
					daysInMonth = 28;
				}
		} else if (month === 4 || month === 6 || month === 9 || month === 11) {
			daysInMonth = 30;
		} else {
			daysInMonth = 31;
		}

		if (month === 12 && day === 31) {
			tomorrow.Year = year+1;
			tomorrow.Month = 1;
			tomorrow.Day = 1;
		} 
		else if (day===daysInMonth) {
			tomorrow.Month++;
			tomorrow.Day = 1;
		}
		else 
		{
			tomorrow.Day++;
		}

		return tomorrow;
	};

	$scope.invalidInputWarning	= function(year, month, day){
		if ($scope.checkDay(day) === "error" || $scope.checkMonth(month) === "error" || $scope.checkYear(year) === "error") {
			return "invalidInput";
		}
		else {
			return "";
		}
	};

	$scope.checkYear = function(year) {
		if (year < 1600|| year > 9999) {
			return "error";
		} else {
			return "";
		}
	};

	$scope.checkMonth = function(month) {
		if (month < 1 || month > 12) {
			validInput = false;
			return "error";
		} else {
			return "";
		}
	};

	$scope.checkDay = function(day) {

		if (day < 1 || day > daysInMonth) {
			validInput = false;
			return "error";
		} else {
			return "";
		}
	};

	$scope.numberOfDaysInMonth = function () {
		return daysInMonth;
	};

	$scope.checkInput = function(ip){
		if (typeof ip === 'number' && ip%1 === 0 ) {
			return "";
		} else {
			return "must be an integer";
		}
	};

	$scope.getDayOfWeek = function(year, month, day) { // Function getting the next day
    // Algorithm from http://calendars.wikia.com/wiki/Calculating_the_day_of_the_week

    var dayNames = new Array("Sunday","Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday");

    var monthDayNumbersNoLeap = new Array(0,3,3,6,1,4,6,2,5,0,3,5);

    var monthDayNumbersWithLeap = new Array(6,2,3,6,1,4,6,2,5,0,3,5);
   
    var century = parseInt(year.toString().substr(0, 2));
    
    var yearNumber = parseInt(year.toString().substr(2, 3));

    var centuryNumber = (3-(century%4))*2;

    var numberOfLeapYears = Math.floor(yearNumber/4);

    var monthNumber = 0;

    if($scope.isLeapYear(year)) {
     monthNumber = monthDayNumbersWithLeap[month-1];
    } else {
     monthNumber = monthDayNumbersNoLeap[month-1];
    }

    var sumOfCenturyYearMonthAndDay = centuryNumber+yearNumber+numberOfLeapYears+monthNumber+day;

    var dayOfWeekNumber = sumOfCenturyYearMonthAndDay%7;

    var dayOfWeek = dayNames[dayOfWeekNumber];

	return dayOfWeek;
    };

    $scope.getChineseCalendarDate = function(year){

    	//Algorithm from http://www.hermetic.ch/cal_stud/ch_year.htm

    	//var i = 1983%2 ? (1983+6)%10  - 1: (1983+6)%10;

    	///var i = year%2 ? (year+6)%10  - 1: (year+6)%10;

    	console.log(year);
  
    	var i = 0;

    	if (year%2) {
    		i = year + 6;
    		i = i%10;
    		console.log('I is '+i);
    	} else{
    		i = year + 6;
    		i = i%10;
    		console.log('I is '+i);
    		i--;
    	}


    	var e = i/2;
    	var a = year +8;
    	a = a % 12;

    	//var k = 0;

    	/*while(60*k < year + 2756)
    	{
    		k++;
    	}*/

    	var element = ['Wood','Fire','Earth','Metal','Water'];
    	var animal = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster' ,'Dog','Pig'];
    	//var animalChars = ["鼠"，"牛"，"虎"，"兔"，"龍"，"蛇"，"馬"，"羊"，"猴子"，"網格"，"狗"，"豬"];
    	//chineseCharacter = animalChars[a];
    	//chineseCharacter = 'hello';

    	console.log('A is ' + a+ '\n E is' + e);

    	var animalChars = new Array();
    	animalChars[0] = {value:"鼠"};
    	animalChars[1] = {value:"牛"};
    	animalChars[2] = {value:"虎"};
    	animalChars[3] = {value:"兔"};
    	animalChars[4] = {value:"龍"};
    	animalChars[5] = {value:"蛇"};
    	animalChars[6] = {value:"馬"};
    	animalChars[7] = {value:"羊"};
    	animalChars[8] = {value:"猴子"};
    	animalChars[9] = {value:"網格"};
    	animalChars[10] = {value:"狗"};
    	animalChars[11] = {value:"豬"};

    	chineseCharacter = animalChars[a].value;

    	return element[e] + ' ' + animal[a];
    };

    $scope.chineseCharacter = function(){
    	return chineseCharacter;
    };

}