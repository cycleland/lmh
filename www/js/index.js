/* activate localStorage */
var localStore = window.localStorage;
/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
var surveyQuestions = [
                      /*0*/ 
                      {
                       "type":"mult1",
                       "variableName": "overall_food_rating",
                       "questionPrompt": "How would you rate your overall experience with your meal at LMH today?",
                       "minResponse": 1,
                       "maxResponse": 5,
                       "labels": [
                                {"label": "1"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                ]
                       },
                       /*1*/
                       {
                       "type":"text",
                       "variableName": "overall_food_text",
                       "questionPrompt": "Do you have a comment on your food experience?",
                       },
                       /*2*/
                       {
                       "type":"mult1",
                       "variableName": "individual_food_continue_query_1",
                       "questionPrompt": "Would you like to rate an individual food item? (e.g. fish, chicken, potato, salad)",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "Yes"},
                                {"label": "No"}
                                ]
                       },
                       /*3*/
                       {
                       "type":"text",
                       "variableName": "individual_food_query_1",
                       "questionPrompt": "Which food item would you like to rate? (you can rate up to 3 individual items)",
                       },
                       /*4*/
                       {
                       "type":"mult1",
                       "variableName": "individual_food_rating_1",
                       "questionPrompt": "How would you rate that item?",
                       "minResponse": 1,
                       "maxResponse": 5,
                       "labels": [
                                {"label": "1"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                ]
                       },
                       /*5*/
                       {
                       "type":"text",
                       "variableName": "individual_food_text_1",
                       "questionPrompt": "Do you have a comment on that food item?",
                       },
                       /*6*/
                       {
                       "type":"mult1",
                       "variableName": "individual_food_continue_query_2",
                       "questionPrompt": "Would you like to rate another individual food item?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "Yes"},
                                {"label": "No"}
                                ]
                       },
                       /*7*/
                       {
                       "type":"text",
                       "variableName": "individual_food_query_2",
                       "questionPrompt": "Which food item would you like to rate? ",
                       },
                       /*8*/
                       {
                       "type":"mult1",
                       "variableName": "individual_food_rating_2",
                       "questionPrompt": "How would you rate that item?",
                       "minResponse": 1,
                       "maxResponse": 5,
                       "labels": [
                                {"label": "1"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                ]
                       },
                       /*9*/
                       {
                       "type":"text",
                       "variableName": "individual_food_text_2",
                       "questionPrompt": "Do you have a comment on that food item?",
                       },
                       /*10*/
                       {
                       "type":"mult1",
                       "variableName": "individual_food_continue_query_3",
                       "questionPrompt": "Would you like to rate another individual food item?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "Yes"},
                                {"label": "No"}
                                ]
                       },
                       /*11*/
                       {
                       "type":"text",
                       "variableName": "individual_food_query_3",
                       "questionPrompt": "Which food item would you like to rate? ",
                       },
                       /*12*/
                       {
                       "type":"mult1",
                       "variableName": "individual_food_rating_3",
                       "questionPrompt": "How would you rate that item?",
                       "minResponse": 1,
                       "maxResponse": 5,
                       "labels": [
                                {"label": "1"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                ]
                       },
                       /*13*/
                       {
                       "type":"text",
                       "variableName": "individual_food_text_3",
                       "questionPrompt": "Do you have a comment on that food item?",
                       }
                       ];
var lastPage = [
                {
                "message": "Thank you for completing the food service survey. Please wait while the data is sent to our servers..."
                },
                {
                "message": "Thank you for installing our app. Please wait while the data is sent to our servers..."
                }];
var participantSetup = [
                       ];

var NUMSETUPQS = participantSetup.length;
//var SNOOZEQ = 0;
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{questionPrompt}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl = "<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Enter</button></li>";
var checkListTmpl =  "<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Next</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Enter</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = '<li><input id="{{id}}" data-format="HH:mm" data-template="HH : mm" name="time"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name"});});</script>';
var lastPageTmpl = "<h3>{{message}}</h3>";
var unique_key; 
var name;

var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onResume, false);
    document.addEventListener("pause", this.onPause, false);
},
onDeviceReady: function() {
    app.init();
},
onResume: function() {app.sampleParticipant();},
onPause: function() {app.pauseEvents();},
//Beginning our app functions
/* The first function is used to specify how the app should display the various questions. You should note which questions 
should be displayed using which formats before customizing this function*/
renderQuestion: function(question_index) {
    //First load the correct question from the JSON database
    var question;
    if (question_index <= -1) {question = participantSetup[question_index + NUMSETUPQS];}
    else {question = surveyQuestions[question_index];}
    var questionPrompt = question.questionPrompt;
	if (questionPrompt.indexOf('NAME') >= 0) {
		questionPrompt = questionPrompt.replace("NAME", function replacer() {return name;});
      	}
    question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt});
    
    //Now populate the view for this question, depending on what the question type is
    switch (question.type) {
    	case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
    		question.buttons = "";
        	var label_count = 0;
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	question.buttons += Mustache.render(buttonTmpl, {
                                                id: question.variableName+i,
                                                value: i,
                                                label: label
                                                });
        	}
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;
        case 'mult2': // Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
    		question.buttons = "";
            var label_count = 0;
            for (var j = question.maxResponse; j >= question.minResponse; j--) {
                var label = question.labels[label_count++].label;
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+j,
                                                    value: j,
                                                    label: label
                                                    });
            }
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;		
        case 'checklist':
        	question.buttons = "";
        	var label_count = 0;
        	var checkboxArray = [];
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	question.buttons += Mustache.render(checkListTmpl, {
                                                	id: question.variableName+i,
                                                	value: i,
                                                	label: label
                                                	});
        	}
        	question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click( function(){
                                          checkboxArray.push(question.variableName);
                                          $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                          app.recordResponse(String(checkboxArray), question_index, question.type);
            });
            break;
        case 'slider':
        	question.buttons = Mustache.render(sliderTmpl, {id: question.variableName+"1"}, {min: question.minResponse}, {max: question.maxResponse}, {value: (question.maxResponse)/2});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var slider = [];
        	$("#question ul li button").click(function(){
        			slider.push(question.variableName);
        			slider.push($("input[type=range]").val());
        			app.recordResponse(String(slider), question_index, question.type);
        	});
        	break;
        case 'instructions':
        	question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){ 
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break;
        case 'text': //default to open-ended text
        	 question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				if (app.validateResponse($("textarea"))){
        		 	app.recordResponse($("textarea"), question_index, question.type);
                } 
                else {
                    alert("Please enter something.");
                }
            });
            break;
        case 'datePicker':
        	question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;    
        case 'dateAndTimePicker':
        	question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;
        case 'timePicker':
        	question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var time, timeSplit, variableName = [], timeArray = [];
        	$("#question ul li button").click(function(){
        		time = $("input").combodate('getValue');
        		timeArray.push(question.variableName);
        		timeArray.push(time);
        		app.recordResponse(String(timeArray), question_index, question.type);
        	});
        	break;	        		                 
        }
},

renderLastPage: function(pageData, question_index) {
    $("#question").html(Mustache.render(lastPageTmpl, pageData));
    //if ( question_index == SNOOZEQ ) {
        //app.snoozeNotif();
        //localStore.snoozed = 1;
        //app.saveData();        
    //}
    /*else*/ if ( question_index == -1) {
    	app.saveDataLastPage();
    }
    else {
    	//var datestamp = new Date();
    	//var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds();
    	//localStore[unique_key + '.' + "completed" + "_" + "completedSurvey"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds] = 1;	
    	localStore["completed"] = 1;
        app.saveDataLastPage();
    }
},
    /* Record User Responses */
recordResponse: function(button, count, type) {
    //Record date (create new date object)
    var datestamp = new Date();
    var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds();
    //Record value of text field
    var response, currentQuestion, uniqueRecord;
    if (type == 'text') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }
    else if (type == 'slider') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record the array
    else if (type == 'checklist') {
        response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    else if (type == 'instructions') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record value of clicked button
    else if (type == 'mult1') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    //Record value of clicked button
    else if (type == 'mult2') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    else if (type == 'datePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'dateAndTimePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'timePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    //if (count == 6) {name = response;}
    //if (count <= -1) {uniqueRecord = currentQuestion;}
    //else {uniqueRecord = unique_key + "_" + currentQuestion + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds;}
    //Save this to local storage
    //localStore[uniqueRecord] = response;
    if (count > 0) {localStore[currentQuestion] = response;}
    //Identify the next question to populate the view
    //This is where you do the Question Logic
    if (count <= -1) {console.log(uniqueRecord);}
   	if (count == -1) {app.scheduleNotifs(); app.renderLastPage(lastPage[2], count);}
    else if (count == 2 && response == 1) {app.renderLastPage(lastPage[0], count);}
    else if (count == 6 && response == 1) {app.renderLastPage(lastPage[0], count);}
    else if (count == 10 && response == 1) {app.renderLastPage(lastPage[0], count);}
    /*
    else if (count == SNOOZEQ && response == 0) {app.renderLastPage(lastPage[1], count);}
    else if (count == 5 && response == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 5 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(6);});}
    else if (count == 7 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(9);});}
    else if (count == 7 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(8);});}
    else if (count == 10 && response < 11) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});}
    else if (count == 10 && response == 11) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(11);});}
    else if (count == 13 && response == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 13 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
    else if (count == 16 && response == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 16 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
    */
    else if (count < surveyQuestions.length-1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});}
    else {app.renderLastPage(lastPage[0], count);}
},
    /* Prepare for Resume and Store Data */
    /* Time stamps the current moment to determine how to resume */
pauseEvents: function() {
    localStore.pause_time = new Date().getTime();
    //app.saveData();
}, 
    /* Initialize the whole thing */
init: function() {
    unique_key = new Date().getTime();
    //localStore.participant_id = "1234";
    //if (localStore.participant_id === " " || !localStore.participant_id) {app.renderQuestion(-NUMSETUPQS);}
    //else {
    	unique_key = new Date().getTime();
        localStore.unique_key = unique_key;
        app.renderQuestion(0);
    //}
    //localStore.snoozed = 0;
},
    
sampleParticipant: function() {
    var current_moment = new Date();
    var current_time = current_moment.getTime();
    //if ((current_time - localStore.pause_time) > 600000 || localStore.snoozed == 1) {
    if ((current_time - localStore.pause_time) > 600000) {
        unique_key = new Date().getTime();
        //localStore.snoozed = 0;
        app.renderQuestion(0);
    }
    else {
        unique_key = localStore.unique_key;
    }
    //app.saveData();
},  
saveData:function() {
    $.ajax({
           type: 'post',
           url: 'http://52.208.68.38/cgi-bin/data_collector.cgi', 
           data: localStore,
           crossDomain: true,
           success: function (result) {
           //var pid = localStore.participant_id;
           //var snoozed = localStore.snoozed, 
           var unique_key = localStore.unique_key, 
               pause_time = localStore.pause_time;
           localStore.clear();
           //localStore.participant_id = pid;
           //localStore.snoozed = snoozed;
           localStore.unique_key = unique_key;
           localStore.pause_time = pause_time;
           },
           error: function (request, error) {console.log(error);},
           });
},
saveDataLastPage:function() {
    $.ajax({
           type: 'post',
           url: ' http://52.208.68.38/cgi-bin/data_collector.cgi', 
           data: localStore,
           crossDomain: true,
           success: function (result) {	
           		//var pid = localStore.participant_id; 
                //var snoozed = localStore.snoozed, 
                var unique_key = localStore.unique_key;
           		localStore.clear();
            	//localStore.participant_id = pid;
           		//localStore.snoozed = snoozed;
           		localStore.unique_key = unique_key;
           		$("#question").html("<h3>Thank you very much! Your feedback is highly appreciated.</h3>");
           },
           error: function (request, error) {
           		console.log(error);
                $("#question").html("<h3>Please try resending data. If problems persist, please contact the admin.</h3><br><button>Resend data</button>");
                $("#question button").click(function () {app.saveDataLastPage();});           		
           	},
           });
},
scheduleNotifs:function() {
	//cordova.plugins.backgroundMode.enable();
   	var interval1, interval2, interval3, interval4, interval5, interval6, interval7
   	var a, b, c, d, e, f, g;
   	var date1, date2, date3, date4, date5, date6, date7;
   	var currentMaxHour, currentMaxMinutes, currentMinHour, currenMinMinutes, nextMinHour, nextMinMinutes;
   	var currentLag, dinnerLag, maxInterval;
   	var day = 86400000;
   	var minLag = 5400000;
   	var randomLag = 1800000;
	var weekendDinnerTime = localStore.weekendDinnerTime.split(":");
	var weekendWakeTime = localStore.weekendWakeTime.split(":");
	var weekdayDinnerTime = localStore.weekdayDinnerTime.split(":");
	var weekdayWakeTime = localStore.weekdayWakeTime.split(":");
	var dateObject = new Date();
    var now = dateObject.getTime(); 
    var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();
   	for (i = 0; i < 7; i ++) {
   		var alarmDay = dayOfWeek + 1 + i; 
   			if (alarmDay > 6) {alarmDay = alarmDay - 7;}
   			if (alarmDay == 0 || alarmDay == 6) {
   				currentMaxHour = weekendDinnerTime[0];
   				currentMaxMinutes = weekendDinnerTime[1];
   				currentMinHour = weekendWakeTime[0];
   				currenMinMinutes = weekendWakeTime[1];
   				if (alarmDay == 0) {
   					nextMinHour = weekdayWakeTime[0];
   					nextMinMinutes = weekdayWakeTime[1];
   				}
   				else {
   					nextMinHour = weekendWakeTime[0];
   					nextMinMinutes = weekendWakeTime[1];
   				}
   				currentLag = (((((24 - parseInt(currentHour) + parseInt(weekendWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekendWakeTime[1]))*60)*1000);
				
   			}
   			else {
   				currentMaxHour = weekdayDinnerTime[0];
   				currentMaxMinutes = weekdayDinnerTime[1];
   				currentMinHour = weekdayWakeTime[0];
   				currenMinMinutes = weekdayWakeTime[1];   				
   				if (alarmDay == 5) {
   					nextMinHour = weekendWakeTime[0];
   					nextMinMinutes = weekendWakeTime[1];
   				}
   				else {
   					nextMinHour = weekdayWakeTime[0];
   					nextMinMinutes = weekdayWakeTime[1];   				
   				}
                currentLag = (((((24 - parseInt(currentHour) + parseInt(weekdayWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekdayWakeTime[1]))*60)*1000);
   			}
   			if (alarmDay == 5 || alarmDay == 0) {nightlyLag = currentLag;}
   			else {
            	nightlyLag= (((((24 - parseInt(currentHour) + parseInt(nextMinHour))*60) - parseInt(currentMinute) + parseInt(nextMinMinutes))*60)*1000);
   			}
   			maxInterval = (((((parseInt(currentMaxHour) - parseInt(currentMinHour))*60) + parseInt(currentMaxMinutes) - parseInt(currenMinMinutes))*60)*1000);
   			interval1 = parseInt(currentLag) + (parseInt(Math.round(Math.random()*randomLag)+minLag)) + day*i;
   			interval2 = interval1 + (parseInt(Math.round(Math.random()*randomLag)+minLag));
   			interval3 = interval2 + (parseInt(Math.round(Math.random()*randomLag)+minLag));
   			interval4 = interval3 + (parseInt(Math.round(Math.random()*randomLag)+minLag));
   			interval5 = interval4 + (parseInt(Math.round(Math.random()*randomLag)+minLag));
   			interval6 = interval5 + (parseInt(Math.round(Math.random()*randomLag)+minLag));
   			dinnerInterval = parseInt(currentLag) + parseInt(maxInterval) + day*i;
   			
   			a = 101+(parseInt(i)*100);
            b = 102+(parseInt(i)*100);
            c = 103+(parseInt(i)*100);
            d = 104+(parseInt(i)*100);
            e = 105+(parseInt(i)*100);
            f = 106+(parseInt(i)*100);
            
        	date1 = new Date(now + interval1);
        	date2 = new Date(now + interval2);
        	date3 = new Date(now + interval3);
        	date4 = new Date(now + interval4);
        	date5 = new Date(now + interval5);
        	date6 = new Date(now + interval6);
        	
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: a, at: date1, text: 'Time for your next  Survey!', title: ' Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: b, at: date2, text: 'Time for your next  Survey!', title: ' Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: c, at: date3, text: 'Time for your next  Survey!', title: ' Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: d, at: date4, text: 'Time for your next  Survey!', title: ' Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: e, at: date5, text: 'Time for your next  Survey!', title: ' Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: f, at: date6, text: 'Time for your next  Survey!', title: ' Survey'}); 
            /*
        	localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
        	localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
        	localStore['notification_' + i + '_3'] = localStore.participant_id + "_" + c + "_" + date3;
        	localStore['notification_' + i + '_4'] = localStore.participant_id + "_" + d + "_" + date4;
        	localStore['notification_' + i + '_5'] = localStore.participant_id + "_" + e + "_" + date5;
        	localStore['notification_' + i + '_6'] = localStore.participant_id + "_" + f + "_" + date6;
        	*/
            localStore['notification_' + i + '_1'] = a + "_" + date1;
        	localStore['notification_' + i + '_2'] = b + "_" + date2;
        	localStore['notification_' + i + '_3'] = c + "_" + date3;
        	localStore['notification_' + i + '_4'] = d + "_" + date4;
        	localStore['notification_' + i + '_5'] = e + "_" + date5;
        	localStore['notification_' + i + '_6'] = f + "_" + date6;

            }
},
snoozeNotif:function() {
    var now = new Date().getTime(), snoozeDate = new Date(now + 600*1000);
    var id = '99';
    cordova.plugins.notification.local.schedule({
                                         icon: 'ic_launcher',
                                         id: id,
                                         title: 'LMH Food Survey',
                                         text: 'Please complete survey now!',
                                         at: snoozeDate,
                                         });
},     
validateResponse: function(data){
        var text = data.val();
        /*
        if (text === ""){
        	return false;
        } else { 
        	return true;
        }
        */
        return true;
    },      
};
