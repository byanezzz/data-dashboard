

/*Código barra lateral*/
$(document).ready(function(){
   $('button').click(function(){
       $('.sidebar').toggleClass('fliph');
   });
});
/*FIN Código barra lateral*/

/*INICIO Código dasshboard*/
google.charts.load('current', {'packages':['bar']});

 
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(techSkillCakeDraw);

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(achievementDraw);

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
     var chart2 = new google.visualization.PieChart(document.getElementById('cakeHse'));
     
    chart.draw(data, options);
    chart2.draw(data,options);
}

function enrollmentDraw(data) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Sprint');
  data.addColumn('number','Activas');
  for(var i in dataG1){
    data.addRows([
      [i,dataG1[i]]          
    ]);
  }
  
  /*var data = google.visualization.arrayToDataTable(
  [
    ['Spring', 'Activas'],
    ['S1', 1000],
    ['S2', 1170],
    ['S3', 660]    
  ]);*/

  var options = {
    chart: {
      title: 'Enrollment',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017'
    },
    colors:'#f9a91a',
    series: {
        0: { axis: 'activas' }, // Bind series 0 to an axis named 'distance'.
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

function achievementDraw() {
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

  var chart = new google.visualization.LineChart(document.getElementById('achievement'));
  chart.draw(data, options);

  var chart2 = new google.visualization.LineChart(document.getElementById('nps'));
  chart2.draw(data, options);

  var chart3 = new google.visualization.LineChart(document.getElementById('student_satisfaction'));
  chart3.draw(data, options);

  var chart4 = new google.visualization.LineChart(document.getElementById('teacher_rating'));
  chart4.draw(data, options);

  var chart5 = new google.visualization.LineChart(document.getElementById('jedi_rating'));
  chart5.draw(data, options);
}
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
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

function dataSedePeriodo(){
  dataPeriodo=data[sede][periodo];
  enrollment(dataPeriodo);
  google.charts.setOnLoadCallback(enrollmentDraw(dataG1));  
};

/*FIN Código dashboard*/

/*INICIO students*/

/*FIN students*/

/*INICIO teachers*/

/*FIN teachers*/
