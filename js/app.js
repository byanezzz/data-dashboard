window.onload=function(){
/*Código barra lateral*/
$(document).ready(function(){
   $('button').click(function(){
       $('.sidebar').toggleClass('fliph');
   });
});
/*FIN Código barra lateral*/

/*INICIO Código dasshboard*/

google.charts.load('current', {'packages':['bar']}); //Barra
google.charts.load("current", {packages:["corechart"]});//Torta, Histograma
google.charts.load('current', {'packages':['corechart']});//Curvas

function enrollmentDraw(dataG) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Sprint');
  data.addColumn('number','Active');
  for(var i in dataG){
    data.addRows([
      [i,dataG[i]]          
    ]);
  }
   
  var options = {
    chart: {
      title: 'Enrollment',
      subtitle: 'Active students per Sprint'
    },
    colors:'#f9a91a',
    series: {
        0: { axis: 'Active' }, 
      },
    axes: {
        y: {
          activas: {label: 'N° Estudiantes'},
        }
    }
  };

  var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}

var dataG1={};
function enrollment(data){
  dataG1={};
  var sprintStudent;
  if(data!==undefined && data.hasOwnProperty("students")){
  for(var i=0; i<data.students.length;i++){    
    if(data.students[i].hasOwnProperty("sprints")){
      sprintStudent=data.students[i].sprints 
      for(var j=0; j<sprintStudent.length;j++){
        if(dataG1.hasOwnProperty('S'+sprintStudent[j].number)){
          dataG1['S'+sprintStudent[j].number]=dataG1['S'+sprintStudent[j].number]+1;
        }else{
          dataG1['S'+sprintStudent[j].number]=1;
        }
      }
    }
  }
  }
}

function achievementDraw(dataG2) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Sprint');
  data.addColumn('number','Score average');

  //ORDENA ELEMENTOS DEL OBJETO
  var sortable = [];
  for (var i in dataG2) {
      sortable.push([i, dataG2[i]]);
  }
  
  sortable.sort(function(a, b) {
      return a[0] - b[0];
  });

  for(var i=0; i<sortable.length;i++){
    data.addRows([
      [sortable[i][0],sortable[i][1] ]         
    ]);
  }
  var options = {
    title: 'Achievement',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors:['#f9a91a','rgb(20, 45, 60)']
  };

  var chart = new google.visualization.LineChart(document.getElementById('achievement'));
  chart.draw(data, options);
}

var dataG2={};
function achievement(data){
dataG2={}
var sprintStudent;
if(data!==undefined && data.hasOwnProperty("students")){
  for(var i=0; i<data.students.length;i++){    
    if(data.students[i].hasOwnProperty("sprints")){
      sprintStudent=data.students[i].sprints 
      for(var j=0; j<sprintStudent.length;j++){
        if ((sprintStudent[j].score.hse>840) && (sprintStudent[j].score.tech>1260)){
          if(dataG2.hasOwnProperty('S'+sprintStudent[j].number)){
            dataG2['S'+sprintStudent[j].number]=dataG2['S'+sprintStudent[j].number]+1;
          }else{
            dataG2['S'+sprintStudent[j].number]=1
          }
        }
       
      }
       
    }
  }
}
}

  function npsDraw() {
    var data = new google.visualization.DataTable();
    data.addColumn('string','Sprint');
    data.addColumn('number','NPS');
  
    //ORDENA ELEMENTOS DEL OBJETO
    var sortable = [];
    for (var i in dataG3) {
        sortable.push([i, dataG3[i]]);
    }
    
    sortable.sort(function(a, b) {
        return a[0] - b[0];
    });
  
    for(var i=0; i<sortable.length;i++){
      data.addRows([
        [sortable[i][0],sortable[i][1] ]         
      ]);
    }
    var options = {
      title: 'Net Promoter Score',
      curveType: 'function',
      legend: { position: 'bottom' },
      colors:['#f9a91a','rgb(20, 45, 60)']
    };
  var chart= new google.visualization.LineChart(document.getElementById('nps'));
  chart.draw(data, options);
}

var dataG3={};
function nps(data){
  var npsSprint;
  dataG3={};
  if(data!==undefined && data.hasOwnProperty("ratings")){
    for(var i=0; i<data.ratings.length;i++){    
      if(data.ratings[i].hasOwnProperty("nps")){
        npsSprint=data.ratings[i].nps;
        dataG3['S'+data.ratings[i].sprint]=npsSprint.promoters-npsSprint.detractors;
      }  
    }    
  }      
}
var listTech=document.createElement('div');
listTech.setAttribute("id","listTech");
listTech.style.display="none";

var selectTech=document.createElement('select');
selectTech.classList.add("form-control","form-control-sm");
listTech.appendChild(selectTech);

var optionTech=document.createElement('option');
selectTech.appendChild(optionTech);
var textOption=document.createTextNode('Select Sprint...');
optionTech.appendChild(textOption);

var techGraph=document.getElementById('techGraph');
var techSkill=document.getElementById('tech_skill');

techGraph.insertBefore(listTech,techSkill);

selectTech.addEventListener("change",function(){
  if(this.value!==-1){
    histogramTech(dataPeriodo,this.value);
    google.charts.setOnLoadCallback(drawHistogramTech(dataG4));

    cakeTech(dataPeriodo,this.value);
    google.charts.setOnLoadCallback(techSkillCakeDraw(approveTech,reprobateTech));
    
  }
})
var dataG4={};
function histogramTech(data,nSprint){
  dataG4={};
  if(data!==undefined && data.hasOwnProperty("students")){
    for (var i=0; i<data.students.length;i++){
      if(data.students[i].hasOwnProperty("sprints")){
        for(var j=0; j<data.students[i].sprints.length;j++){
          if (data.students[i].sprints[j].number==nSprint && data.students[i].sprints[j].hasOwnProperty("score") ){
            dataG4[data.students[i].name]=data.students[i].sprints[j].score.tech;
          }
        }
      }
    }
  }
}

var approveTech=0;
var reprobateTech=0;
function cakeTech(data,nSprint){
  approveTech=0;
  reprobateTech=0;
  if(data!==undefined && data.hasOwnProperty("students")){
    for (var i=0; i<data.students.length;i++){
      if(data.students[i].hasOwnProperty("sprints")){
        for(var j=0; j<data.students[i].sprints.length;j++){
          if (data.students[i].sprints[j].number==nSprint && data.students[i].sprints[j].hasOwnProperty("score")){
            if(data.students[i].sprints[j].score.tech>1260){
              approveTech++;
            }else{
              reprobateTech++;
            }
          }
        }
      }
    }
  }
}
function selectSprint(data){

  if(data!==undefined && data.hasOwnProperty("ratings")){
    while (selectTech.firstChild) {
      selectTech.removeChild(selectTech.firstChild);
    }
    while (selectHse.firstChild) {
      selectHse.removeChild(selectHse.firstChild);
    }
    var options=document.createElement('option');
    selectTech.appendChild(options);
    var textOptions=document.createTextNode('Select Sprint...');
    options.appendChild(textOptions);
    options.value=-1;

    var options1=document.createElement('option');
    selectHse.appendChild(options1);
    var textOptions1=document.createTextNode('Select Sprint...');
    options1.appendChild(textOptions1);
    options1.value=-1;

    for(var i=0; i<data.ratings.length;i++){
      if(data.ratings[i].hasOwnProperty("sprint")){
        var options=document.createElement('option');
        selectTech.appendChild(options);
        var textOptions=document.createTextNode('Sprint '+data.ratings[i].sprint);
        options.value=data.ratings[i].sprint;
        options.appendChild(textOptions);

        var options1=document.createElement('option');
        selectHse.appendChild(options1);
        var textOptions1=document.createTextNode('Sprint '+data.ratings[i].sprint);
        options1.value=data.ratings[i].sprint;
        options1.appendChild(textOptions1);
      }  
    }    
  } 
}

function techSkillCakeDraw(a,b) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
  ['Approve', a],
  ['Reprobate',b],
  ]);

  var options = {title:'Approval percentages',
                     width:300,
                     height:300,
                     colors: ['#f9a91a','rgb(20, 45, 60)']};

   var chart = new google.visualization.PieChart(document.getElementById('cakeTech'));
  chart.draw(data, options);
}


function drawHistogramTech(dataIn) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Name');
  data.addColumn('number','Score');

  for(var i in dataIn){
    data.addRows([
      [i,dataIn[i]]          
    ]);
  }

  var options = {
    title: 'Tech Skill',
    legend: { position: 'none' },
    colors:['rgb(20, 45, 60)']
  };
  var chart = new google.visualization.Histogram(document.getElementById('tech_skill'));
  chart.draw(data, options);
  
}
var listHse=document.createElement('div');
listHse.setAttribute("id","listHse");
listHse.style.display="none";

var selectHse=document.createElement('select');
selectHse.classList.add("form-control","form-control-sm");
listHse.appendChild(selectHse);

var optionHse=document.createElement('option');
selectHse.appendChild(optionHse);
var textOption1=document.createTextNode('Select Sprint...');
optionHse.appendChild(textOption1);

var hseGraph=document.getElementById('hseGraph');
var life_skill=document.getElementById('life_skill');

hseGraph.insertBefore(listHse,life_skill);

function HSESkillCakeDraw(a,b) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
  ['Approve', a],
  ['Reprobate',b],
  ]);

  var options = {title:'Approval percentages',
                     width:300,
                     height:300,
                     colors: ['#f9a91a','rgb(20, 45, 60)']};

   var chart = new google.visualization.PieChart(document.getElementById('cakeHse'));
  chart.draw(data, options);
}

function drawHistogramLife(dataIn) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Name');
  data.addColumn('number','Score');

  for(var i in dataIn){
    data.addRows([
      [i,dataIn[i]]          
    ]);
  }

  var options = {
    title: 'HSE Skill',
    legend: { position: 'none' },
    colors:['rgb(20, 45, 60)']
  };
  var chart = new google.visualization.Histogram(document.getElementById('life_skill'));
  chart.draw(data, options);
  
}
selectHse.addEventListener("change",function(){
  if(this.value!==-1){
    histogramHse(dataPeriodo,this.value);
    google.charts.setOnLoadCallback(drawHistogramLife(dataG5));
    
    cakeHse(dataPeriodo,this.value)
    google.charts.setOnLoadCallback(HSESkillCakeDraw(approveHse,reprobateHse));
  }
})

var dataG5={};
function histogramHse(data,nSprint){
  dataG5={};
  if(data!==undefined && data.hasOwnProperty("students")){
    for (var i=0; i<data.students.length;i++){
      if(data.students[i].hasOwnProperty("sprints")){
        for(var j=0; j<data.students[i].sprints.length;j++){
          if (data.students[i].sprints[j].number==nSprint && data.students[i].sprints[j].hasOwnProperty("score") ){
            dataG5[data.students[i].name]=data.students[i].sprints[j].score.hse;
          }
        }
      }
    }
  }
}


var approveHse=0;
var reprobateHse=0;
function cakeHse(data,nSprint){
  approveHse=0;
  reprobateHse=0;
  if(data!==undefined && data.hasOwnProperty("students")){
    for (var i=0; i<data.students.length;i++){
      if(data.students[i].hasOwnProperty("sprints")){
        for(var j=0; j<data.students[i].sprints.length;j++){
          if (data.students[i].sprints[j].number==nSprint && data.students[i].sprints[j].hasOwnProperty("score")){
            if(data.students[i].sprints[j].score.hse>840){
              approveHse++;
            }else{
              reprobateHse++;
            }
          }
        }
      }
    }
  }
}
 //Datos generales para graficar
var dashboardGenerations=document.getElementsByName("dashboardGeneration");
var sedes=document.getElementsByName("sede");
var sede="";
var periodo="";
var dataPeriodo="";

for (var i=0; i<sedes.length;i++){
  periodo="";
  sedes[i].addEventListener("click", function(){
    sede=this.id;
  })
}

for (var i=0; i<dashboardGenerations.length;i++){
  dashboardGenerations[i].addEventListener("click", function(){
    periodo=this.className;    
    dataSedePeriodo();
  })
}
function studentInfo(data){

}

function dataSedePeriodo(){
  listTech.style.display="initial";
  listHse.style.display="initial";
  dataPeriodo=data[sede][periodo];
  achievement(dataPeriodo);
  enrollment(dataPeriodo);
  nps(dataPeriodo);
  selectSprint(dataPeriodo);
  google.charts.setOnLoadCallback(enrollmentDraw(dataG1));
  google.charts.setOnLoadCallback(achievementDraw(dataG2));
  google.charts.setOnLoadCallback(npsDraw());  
};

/*FIN Código dashboard*/

/*INICIO students*/

/*FIN students*/

/*INICIO teachers*/

/*FIN teachers*/
}