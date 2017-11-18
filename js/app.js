

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

function techSkillCakeDraw() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
    ['Aprobadas', 20],
    ['Reprobadas',85],
    ]);

    var options = {title:'Alumnas sobre el 70%. Promedio de todos los Spring',
                       width:300,
                       height:300,
                       colors: ['#f9a91a','rgb(20, 45, 60)']};

     var chart = new google.visualization.PieChart(document.getElementById('cakeTech'));
    chart.draw(data, options);
}

function HSESkillCakeDraw() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
  ['Aprobadas', 20],
  ['Reprobadas',85],
  ]);

  var options = {title:'Alumnas sobre el 70%. Promedio de todos los Spring',
                     width:300,
                     height:300,
                     colors: ['#f9a91a','rgb(20, 45, 60)']};

  var chart = new google.visualization.PieChart(document.getElementById('cakeHse'));
  chart.draw(data, options);
}

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

function achievementDraw(dataHSE) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Sprint');
  data.addColumn('number','Score average');

  var sortable = [];
  for (var i in dataHSE) {
      sortable.push([i, dataHSE[i]]);
  }
  
  sortable.sort(function(a, b) {
      return a[1] - b[1];
  });

  for(var i=0; i<sortable.length;i++){
    data.addRows([
      [sortable[i][0],sortable[i][1] ]         
    ]);
  }
  
  /*var data = google.visualization.arrayToDataTable([
    ['SPRINT', 'HSE', 'TECH'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);*/

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors:['#f9a91a','rgb(20, 45, 60)']
  };

  var chart = new google.visualization.LineChart(document.getElementById('achievement'));
  chart.draw(data, options);
}
var dataG2HSE={};
function achievement(data){
dataG2HSE={};
var sprintStudent;
var HSEStudents=0;
var TechStudents=0;
if(data!==undefined && data.hasOwnProperty("students")){
  for(var i=0; i<data.students.length;i++){    
    if(data.students[i].hasOwnProperty("sprints")){
      sprintStudent=data.students[i].sprints 
      for(var j=0; j<sprintStudent.length;j++){
        if ((sprintStudent[j].score.hse+sprintStudent[j].score.tech)>2100){
          if(dataG2HSE.hasOwnProperty('S'+sprintStudent[j].number)){
            dataG2HSE['S'+sprintStudent[j].number]=dataG2HSE['S'+sprintStudent[j].number]+1;
          }else{
            dataG2HSE['S'+sprintStudent[j].number]=1
          }
        }
       
      }
       
    }
  }
}
}

  function npsDraw() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);
  
    var options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' },
      colors:['#f9a91a','rgb(20, 45, 60)']
    };
  var chart2 = new google.visualization.LineChart(document.getElementById('nps'));
  chart2.draw(data, options);
}


function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Dinosaur', 'Length'],
    ['Acrocanthosaurus (top-spined lizard)', 12.2],
    ['Albertosaurus (Alberta lizard)', 9.1],
    ['Allosaurus (other lizard)', 12.2],
    ['Apatosaurus (deceptive lizard)', 22.9],
    ['Archaeopteryx (ancient wing)', 0.9],
    ['Argentinosaurus (Argentina lizard)', 36.6],
    ['Baryonyx (heavy claws)', 9.1],
    ['Brachiosaurus (arm lizard)', 30.5],
    ['Ceratosaurus (horned lizard)', 6.1],
    ['Coelophysis (hollow form)', 2.7],
    ['Compsognathus (elegant jaw)', 0.9],
    ['Deinonychus (terrible claw)', 2.7],
    ['Diplodocus (double beam)', 27.1],
    ['Dromicelomimus (emu mimic)', 3.4],
    ['Gallimimus (fowl mimic)', 5.5],
    ['Mamenchisaurus (Mamenchi lizard)', 21.0],
    ['Megalosaurus (big lizard)', 7.9],
    ['Microvenator (small hunter)', 1.2],
    ['Ornithomimus (bird mimic)', 4.6],
    ['Oviraptor (egg robber)', 1.5],
    ['Plateosaurus (flat lizard)', 7.9],
    ['Sauronithoides (narrow-clawed lizard)', 2.0],
    ['Seismosaurus (tremor lizard)', 45.7],
    ['Spinosaurus (spiny lizard)', 12.2],
    ['Supersaurus (super lizard)', 30.5],
    ['Tyrannosaurus (tyrant lizard)', 15.2],
    ['Ultrasaurus (ultra lizard)', 30.5],
    ['Velociraptor (swift robber)', 1.8]]);

  var options = {
    title: 'Tech Skill',
    legend: { position: 'none' },
    colors:['rgb(20, 45, 60)']
  };
  var options2 = {
    title: 'HSE Skill',
    legend: { position: 'none' },
    colors:['rgb(20, 45, 60)']
  };
  var chart = new google.visualization.Histogram(document.getElementById('tech_skill'));
  var chart2 = new google.visualization.Histogram(document.getElementById('life_skill'));
  chart.draw(data, options);
  chart2.draw(data,options2);
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
  dataPeriodo=data[sede][periodo];
  achievement(dataPeriodo);
  enrollment(dataPeriodo);
  google.charts.setOnLoadCallback(enrollmentDraw(dataG1));
  google.charts.setOnLoadCallback(drawChart());
  google.charts.setOnLoadCallback(techSkillCakeDraw());
  google.charts.setOnLoadCallback(HSESkillCakeDraw());
  google.charts.setOnLoadCallback(achievementDraw(dataG2HSE));
  google.charts.setOnLoadCallback(npsDraw());  
};

/*FIN Código dashboard*/

/*INICIO students*/

/*FIN students*/

/*INICIO teachers*/

/*FIN teachers*/
