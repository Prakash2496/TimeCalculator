var prefix = ['j0','j1','j2','j3','j4','j5','j6','twt','ttw','jira','pause'];
var minutes = [];
var hrs = [];
for(i in prefix){
	minutes.push("#"+prefix[i]+'Min');
	hrs.push("#"+prefix[i]+'Hr');
}
$(document).ready(function(){
	function  updateJ0(){
		var totalMinPause = 0;
		var totalMinJ0 = 0;

		totalMinPause += !isNaN(parseInt($('#pauseHr').val()))?parseInt($('#pauseHr').val()) *60 :0;
		totalMinPause += !isNaN(parseInt($('#pauseMin').val()))?parseInt($('#pauseMin').val()) :0;
		
		totalMinJ0 += !isNaN(parseInt($('#j0Hr').val()))?parseInt($('#j0Hr').val()) *60 :0;
		totalMinJ0 += !isNaN(parseInt($('#j0Min').val()))?parseInt($('#j0Min').val()) :0;
		
		if(totalMinPause<30){
			$('#j0Hr').val("");
			$('#j0Min').val((30-totalMinPause) +30);
		}
		else{
			$('#j0Hr').val("");
			$('#j0Min').val("30");
		}
		
	}
	
	function updateJiraTotal(){
		var i;
		var totalMin = 0;
		for(i=0; i<11;i++){
			var jiraMin = 0;
			jiraMin += !isNaN(parseInt($('#j'+i+'Hr').val()))?parseInt($('#j'+i+'Hr').val()) *60 :0;
			jiraMin += !isNaN(parseInt($('#j'+i+'Min').val()))?parseInt($('#j'+i+'Min').val()) :0;
			totalMin += jiraMin;
		}
		
		var min = totalMin%60;
		var hr = (totalMin-min)/60;
		$('#ttwMin').val(min);
		$('#ttwHr').val(hr);
		
		var jiraMinPerCent = (min/60);
		$('#jiraMin').val(jiraMinPerCent);
		$('#jiraHr').val(hr);
		
	}
	
	//handling minutes
	minutes.forEach(idMin => $(idMin).keyup(function(){
		var index = minutes.indexOf(idMin);
		var idHr = hrs[index];
		var min = parseInt($(this).val());
		if(!isNaN(min)){
			while(min>=60){
				var hr = parseInt($(idHr).val());
				if(isNaN(hr)){
					hr = 0;
				}
				else if(hr<0){
					hr=0;
				}
				min -=60;
				hr	+=1;	
				$(this).val(min);
				$(idHr).val(hr);
				if(index==10){
					updateJ0();
				}
				updateJiraTotal();
				
			}
			$(this).val(min);
			if(index==10){
				updateJ0();
			}
			updateJiraTotal();
		}
		else{
			$(this).val("");
			updateJiraTotal();
		}
	}));
	
	//handling hrs
	hrs.forEach(idHr => $(idHr).keyup(function(){
		var index = hrs.indexOf(idHr);
		var hr = parseInt($(this).val());
		if(!isNaN(hr)){
			if(hr<0){
				hr = 0;	
			}
			$(this).val(hr);
			if(index==10){
					updateJ0();
			}
			updateJiraTotal();
		}
		else{
			$(this).val("");
			updateJiraTotal();
		}
	}));
});
