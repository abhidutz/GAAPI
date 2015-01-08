
function getForProfileOne($type,$pid){

var html = '<table>';
switch($pid)
{
case 0:
if($type==='Monthly')
{
var lstWeek = $(".0.lastMonthi");
var prevWeek=$(".0.prevMonthi");

}
else
{
var lstWeek = $(".0.lastWeeki");
var prevWeek=$(".0.prevWeeki");

}
break;
case 1:
if($type==='Monthly')
{
var lstWeek = $(".1.lastMonthi");
var prevWeek=$(".1.prevMonthi");
}
else
{
var lstWeek = $(".1.lastWeeki");
var prevWeek=$(".1.prevWeeki");

}

break;
case 2:
if($type==='Monthly')
{
var lstWeek = $(".2.lastMonthi");
var prevWeek=$(".2.prevMonthi");
}
else
{
var lstWeek = $(".2.lastWeeki");
var prevWeek=$(".2.prevWeeki");

}

break;
}

var lstWeekMediumVals = [];
var prevWeekMediumVals = [];
lstWeek.each(function(){
lstWeekMediumVals.push(this.innerHTML);
});
prevWeek.each(function(){
prevWeekMediumVals.push(this.innerHTML);
});


var weeklyComparisonMediumList = concatArraysUniqueWithSort(prevWeekMediumVals,lstWeekMediumVals);
if($type==='Monthly')
{
var title="30 Last Days";}
else
{
var title="Last 7 Days";
}

var table = "<table border='2' class='compare"+$pid+$type+"'><tr><td colspan='7' align='center'>"+title+"</td></tr><tr><td rowspan='2'>Medium</td><td colspan='2' align='center'>Sessions</td><td colspan='2' align='center'> Transacitons</td><td colspan='2' align='center'>Revennue</td></tr><tr><td>t</td><td>t-1</td><td> t</td><td >t-1</td><td> t</td><td> t-1</td></tr>";
if($type==='Monthly')
{
var lstCls="lastMonth";
var prevCls="prevMonth";
}
else
{
var lstCls="lastWeek";
var prevCls="prevWeek";
}

var lstCls 
for(i=0;i<weeklyComparisonMediumList.length;i++)
{
table +="<tr>";


table =table+"<td>"+weeklyComparisonMediumList[i]+"</td>";
if(typeof $("."+$pid+"."+lstCls+"."+weeklyComparisonMediumList[i]+".session")[0]!='undefined')
table += "<td>"+$("."+$pid+"."+lstCls+"."+weeklyComparisonMediumList[i]+".session")[0].innerHTML+"</td>";
else
table += "<td>0</td>";
if(typeof $("."+$pid+"."+prevCls+"."+weeklyComparisonMediumList[i]+".session")[0]!='undefined')
table += "<td>"+$("."+$pid+"."+prevCls+"."+weeklyComparisonMediumList[i]+".session")[0].innerHTML+"</td>";
else
table += "<td>0</td>";
if(typeof $("."+$pid+"."+lstCls+"."+weeklyComparisonMediumList[i]+".trans")[0]!='undefined')
table += "<td>"+$("."+$pid+"."+lstCls+"."+weeklyComparisonMediumList[i]+".trans")[0].innerHTML+"</td>";
else
table += "<td>0</td>";
if(typeof $("."+$pid+"."+prevCls+"."+weeklyComparisonMediumList[i]+".trans")[0]!='undefined')
table += "<td>"+$("."+$pid+"."+prevCls+"."+weeklyComparisonMediumList[i]+".trans")[0].innerHTML+"</td>";
else
table += "<td>0</td>";
if(typeof $("."+$pid+"."+lstCls+"."+weeklyComparisonMediumList[i]+".rev")[0]!='undefined')
table += "<td>"+$("."+$pid+"."+lstCls+"."+weeklyComparisonMediumList[i]+".rev")[0].innerHTML+"</td>";
else
table += "<td>0</td>";
if(typeof $("."+$pid+"."+prevCls+"."+weeklyComparisonMediumList[i]+".rev")[0]!='undefined')
table += "<td>"+$("."+$pid+"."+prevCls+"."+weeklyComparisonMediumList[i]+".rev")[0].innerHTML+"</td>";
else
table += "<td>0</td>";
table +="</tr>";
}

table +="</table>";

$("#content").append(table);
}
function concatArraysUniqueWithSort(thisArray, otherArray) {
    var newArray = thisArray.concat(otherArray).sort(function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    });

    return newArray.filter(function (item, index) {
        return newArray.indexOf(item) === index;
    });
}

function getWeekCompare(){
getForProfileOne('Weekly',0);
getForProfileOne('Weekly',1);
getForProfileOne('Weekly',2);
getForProfileOne('Monthly',0);
getForProfileOne('Monthly',1);
getForProfileOne('Monthly',2);
//getForProfileTwo();
//getForProfileThree();
mergerAllData("Today");
mergeCompareData("Weekly");
mergeCompareData("Monthly");

mergerAllData("DetailMonth");
mergerAllData("DetailYear");

}
function mergeCompareData(type){

if(type==='Monthly'){
var lstCl="lastMonth";
var prevCl="prevMonth";
var title="Total 30 Last days";
}
else
{
var lstCl="lastWeek";
var prevCl="prevWeek";

var title="Total Last 7 days";
}
var profile0lst=$(".0."+lstCl+"i");
var profile1lst=$(".1."+lstCl+"i");
var profile2lst=$(".2."+lstCl+"i");
var profile0prev=$(".0."+prevCl+"i");
var profile1prev=$(".1."+prevCl+"i");
var profile2prev=$(".2."+prevCl+"i");

var ar1=[];
var ar2=[];
var ar3=[];
var ar4=[];
var ar5=[];
var ar6 = [];

profile0lst.each(function(){
ar1.push(this.innerHTML);
});
profile1lst.each(function(){
ar2.push(this.innerHTML);
});
profile2lst.each(function(){
ar3.push(this.innerHTML);
});
profile0prev.each(function(){
ar4.push(this.innerHTML);
});
profile1prev.each(function(){
ar5.push(this.innerHTML);
});
profile2prev.each(function(){
ar6.push(this.innerHTML);
});


var completeArr = concatArraysUniqueWithSort(concatArraysUniqueWithSort(ar6,ar5),concatArraysUniqueWithSort(concatArraysUniqueWithSort(ar4,ar3),concatArraysUniqueWithSort(ar1,ar2)));


var table = "<table border='2' class='totalCompare"+type+"'><tr><td colspan='7' align='center'>"+title+"</td></tr><tr><td rowspan='2'>Medium</td><td colspan='2' align='center'>Sessions</td><td colspan='2' align='center'> Transacitons</td><td colspan='2' align='center'>Revennue</td></tr><tr><td>t</td><td>t-1</td><td> t</td><td >t-1</td><td> t</td><td> t-1</td></tr>";

for(i=0;i<completeArr.length;i++)
{
table +="<tr>";


table =table+"<td>"+completeArr[i]+"</td>";

var total=0;
if(typeof $(".0."+lstCl+"."+completeArr[i]+".session")[0]!='undefined')
total+=parseInt($(".0."+lstCl+"."+completeArr[i]+".session")[0].innerHTML);
if(typeof $(".1."+lstCl+"."+completeArr[i]+".session")[0]!='undefined')
total+=parseInt($(".1."+lstCl+"."+completeArr[i]+".session")[0].innerHTML);
if(typeof $(".2."+lstCl+"."+completeArr[i]+".session")[0]!='undefined')
total+=parseInt($(".2."+lstCl+"."+completeArr[i]+".session")[0].innerHTML);
table+="<td>"+total+"</td>";
total=0;


if(typeof $(".0."+prevCl+"."+completeArr[i]+".session")[0]!='undefined')
total+=parseInt($(".0."+prevCl+"."+completeArr[i]+".session")[0].innerHTML);
if(typeof $(".1."+prevCl+"."+completeArr[i]+".session")[0]!='undefined')
total+=parseInt($(".1."+prevCl+"."+completeArr[i]+".session")[0].innerHTML);
if(typeof $(".2."+prevCl+"."+completeArr[i]+".session")[0]!='undefined')
total+=parseInt($(".2."+prevCl+"."+completeArr[i]+".session")[0].innerHTML);
table+="<td>"+total+"</td>";
total=0;



if(typeof $(".0."+lstCl+"."+completeArr[i]+".trans")[0]!='undefined')
total+=parseInt($(".0."+lstCl+"."+completeArr[i]+".trans")[0].innerHTML);
if(typeof $(".1."+lstCl+"."+completeArr[i]+".trans")[0]!='undefined')
total+=parseInt($(".1."+lstCl+"."+completeArr[i]+".trans")[0].innerHTML);
if(typeof $(".2."+lstCl+"."+completeArr[i]+".trans")[0]!='undefined')
total+=parseInt($(".2."+lstCl+"."+completeArr[i]+".trans")[0].innerHTML);
table+="<td>"+total+"</td>";
total=0;



if(typeof $(".0."+prevCl+"."+completeArr[i]+".trans")[0]!='undefined')
total+=parseInt($(".0."+prevCl+"."+completeArr[i]+".trans")[0].innerHTML);
if(typeof $(".1."+prevCl+"."+completeArr[i]+".trans")[0]!='undefined')
total+=parseInt($(".1."+prevCl+"."+completeArr[i]+".trans")[0].innerHTML);
if(typeof $(".2."+prevCl+"."+completeArr[i]+".trans")[0]!='undefined')
total+=parseInt($(".2."+prevCl+"."+completeArr[i]+".trans")[0].innerHTML);
table+="<td>"+total+"</td>";
total=0;




if(typeof $(".0."+lstCl+"."+completeArr[i]+".rev")[0]!='undefined')
total+=parseInt($(".0."+lstCl+"."+completeArr[i]+".rev")[0].innerHTML);
if(typeof $(".1."+lstCl+"."+completeArr[i]+".rev")[0]!='undefined')
total+=parseInt($(".1."+lstCl+"."+completeArr[i]+".rev")[0].innerHTML);
if(typeof $(".2."+lstCl+"."+completeArr[i]+".rev")[0]!='undefined')
total+=parseInt($(".2."+lstCl+"."+completeArr[i]+".rev")[0].innerHTML);
table+="<td>"+total+"</td>";
total=0;



if(typeof $(".0."+prevCl+"."+completeArr[i]+".rev")[0]!='undefined')
total+=parseInt($(".0."+prevCl+"."+completeArr[i]+".rev")[0].innerHTML);
if(typeof $(".1."+prevCl+"."+completeArr[i]+".rev")[0]!='undefined')
total+=parseInt($(".1."+prevCl+"."+completeArr[i]+".rev")[0].innerHTML);
if(typeof $(".2."+prevCl+"."+completeArr[i]+".rev")[0]!='undefined')
total+=parseInt($(".2."+prevCl+"."+completeArr[i]+".rev")[0].innerHTML);
table+="<td>"+total+"</td>";
total=0;

table +="</tr>";
}

table +="</table>";

$("#content").append(table);



}





function mergerAllData(type){
switch(type){
case "Today":
var profile0=$(".0.todayi");
var profile1=$(".1.todayi");
var profile2=$(".2.todayi");
var clas="today";

break;
case "DetailMonth":

var profile0=$(".0.detailMonthi");
var profile1=$(".1.detailMonthi");
var profile2=$(".2.detailMonthi");
var clas="detailMonth";
break;
case "DetailYear":
var profile0=$(".0.detailYeari");
var profile1=$(".1.detailYeari");
var profile2=$(".2.detailYeari");
var clas="detailYear";
break;


}


var profile0vals = [];
var profile1vals = [];
var profile2vals = [];

profile0.each(function(){
profile0vals.push(this.innerHTML);
});

profile1.each(function(){
profile1vals.push(this.innerHTML);
});

profile2.each(function(){
profile2vals.push(this.innerHTML);
});



var oneNTwo = concatArraysUniqueWithSort(profile0vals,profile1vals);
var allThreeArays = concatArraysUniqueWithSort(oneNTwo,profile2vals);


var table = "<table border='2' class='merge"+type+"'><tr><td colspan='4' align='center'>"+type+"</td></tr><tr><th>Medium</th><th>Sessions</th><th>Transactions</th><th>Revenue</th>";

for(i=0;i<allThreeArays.length;i++)
{
table +="<tr>";


table =table+"<td>"+allThreeArays[i]+"</td>";

var total=0;
if(typeof $(".0."+clas+"."+allThreeArays[i]+".session")[0]!='undefined')
total+=parseInt($(".0."+clas+"."+allThreeArays[i]+".session")[0].innerHTML);

if(typeof $(".1."+clas+"."+allThreeArays[i]+".session")[0]!='undefined')
total+=parseInt($(".1."+clas+"."+allThreeArays[i]+".session")[0].innerHTML);

if(typeof $(".2."+clas+"."+allThreeArays[i]+".session")[0]!='undefined')
total+=parseInt($(".2."+clas+"."+allThreeArays[i]+".session")[0].innerHTML);

table += "<td>"+total+"</td>";
total=0;

var total=0;
if(typeof $(".0."+clas+"."+allThreeArays[i]+".trans")[0]!='undefined')
total+=parseInt($(".0."+clas+"."+allThreeArays[i]+".trans")[0].innerHTML);

if(typeof $(".1."+clas+"."+allThreeArays[i]+".trans")[0]!='undefined')
total+=parseInt($(".1."+clas+"."+allThreeArays[i]+".trans")[0].innerHTML);

if(typeof $(".2."+clas+"."+allThreeArays[i]+".trans")[0]!='undefined')
total+=parseInt($(".2."+clas+"."+allThreeArays[i]+".trans")[0].innerHTML);

table += "<td>"+total+"</td>";
total=0;

var total=0;
if(typeof $(".0."+clas+"."+allThreeArays[i]+".rev")[0]!='undefined')
total+=parseInt($(".0."+clas+"."+allThreeArays[i]+".rev")[0].innerHTML);

if(typeof $(".1."+clas+"."+allThreeArays[i]+".rev")[0]!='undefined')
total+=parseInt($(".1."+clas+"."+allThreeArays[i]+".rev")[0].innerHTML);

if(typeof $(".2."+clas+"."+allThreeArays[i]+".rev")[0]!='undefined')
total+=parseInt($(".2."+clas+"."+allThreeArays[i]+".rev")[0].innerHTML);

table += "<td>"+total+"</td>";
total=0;

table +="</tr>";
}

table +="</table>";

$("#content").append(table);



}