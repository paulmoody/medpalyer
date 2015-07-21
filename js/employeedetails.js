var employee;

$('body').on('pagebeforeshow','#detailsPage', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON('datas.json', function(data) {
		employee = data.items[id];
		console.log(employee);	
	
        bicharango(employee);
		
		$('#employeePic').attr('src', 'pics/' + employee.picture);
		$('#fullName').text(employee.firstName + ' ' + employee.lastName);
		$('#employeeTitle').text(employee.title);
		$('#city').text(employee.city);
		console.log(employee.officePhone);
		if (employee.managerId>0) {
			$('#actionList').append('<li><a href="employeedetails.html?id=' + employee.managerId + '"><h3>View Manager</h3>' +
					'<p>' + employee.managerFirstName + ' ' + employee.managerLastName + '</p></a></li>');
		}
		if (employee.reportCount>0) {
			$('#actionList').append('<li><a href="reportlist.html?id=' + employee.id + '"><h3>View Direct Reports</h3>' +
					'<p>' + employee.reportCount + '</p></a></li>');
		}
		if (employee.email) {
			$('#actionList').append('<li><a href="mailto:' + employee.email + '"><h3>Email</h3>' +
					'<p>' + employee.email + '</p></a></li>');
		}
		if (employee.officePhone) {
			$('#actionList').append('<li><a href="tel:' + employee.officePhone + '"><h3>Call Office</h3>' +
					'<p>' + employee.officePhone + '</p></a></li>');
		}
		if (employee.cellPhone) {
			$('#actionList').append('<li><a href="tel:' + employee.cellPhone + '"><h3>Call Cell</h3>' +
					'<p>' + employee.cellPhone + '</p></a></li>');
			$('#actionList').append('<li><a href="sms:' + employee.cellPhone + '"><h3>SMS</h3>' +
					'<p>' + employee.cellPhone + '</p></a></li>');
		}
		$('#actionList').listview('refresh');
		
		
	
	});

	
function bicharango(caca){
	$('#playlist li:first-child').attr('mp3',caca.title);
$('#playlist').listview('refresh');
	initAudio($('#playlist li:first-child'));
}
//replace song

	
	
var audio;
//Hide Pause Initially
$('#pause').hide();
	
//Initializer - Play First Song
//initAudio($('#playlist li:first-child'));
	
function initAudio(element){
	var mp3 = element.attr('mp3')
	var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

	//Create a New Audio Object
	audio = new Audio(mp3);
	
	if(!audio.currentTime){
		$('#duration').html('0.00');
	}

	$('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);
	
	//Insert Cover Image
	$('img.cover').attr('src','images/covers/' + cover);
	
	$('#playlist li').removeClass('active');
    element.addClass('active');
}

	
//Play Button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

//Pause Button
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});
	
//Stop Button
$('#stop').click(function(){
	audio.pause();		
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

//Next Button
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
	audio.play();
	showDuration();
});

//Prev Button
$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
	audio.play();
	showDuration();
});

//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});

//Volume Control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});
	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + '.' + s);	
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}
	
	
	
	
	
	
	
	
	
	
});


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}




