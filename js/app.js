window.onload=function(){
/*Código barra lateral*/
  $(document).ready(function(){
    $('button').click(function(){
        $('.sidebar').toggleClass('fliph');
    });
  });
/*FIN Código barra lateral*/

  var board=document.createElement("section");
  board.setAttribute("id","board");
  board.setAttribute("class","float-right");
  document.body.appendChild(board);
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
      while (board.firstChild) {
        board.removeChild(board.firstChild);
      }
      periodo=this.className;    
      dashboardDraw();
      dataSedePeriodo();
    })
  }
  
  function dataSedePeriodo(){
    listTech.style.display="initial";
    listHse.style.display="initial";
    dataPeriodo=data[sede][periodo];
    
    enrollment(dataPeriodo);
    google.charts.setOnLoadCallback(enrollmentDraw(dataG1));
  
    achievement(dataPeriodo);
    google.charts.setOnLoadCallback(achievementDraw(dataG2));
  
    nps(dataPeriodo);
    google.charts.setOnLoadCallback(npsDraw(dataG3)); 
  
    selectSprint(dataPeriodo);   
  }

  var selectTech="";
  var selectHse="";
  var listTech="";
  var listHse="";
  var enrollmentDiv="";
  var achievementDiv="";
  var npsDiv="";

  function dashboardDraw(){
    var firstDbRow=document.createElement("div");
    firstDbRow.setAttribute("class","center");
    board.appendChild(firstDbRow);

    enrollmentDiv= document.createElement("div");
    enrollmentDiv.setAttribute("id","columnchart_material");
    enrollmentDiv.classList.add("d-inline-block","chartStyle");
    firstDbRow.appendChild(enrollmentDiv);

    achievementDiv= document.createElement("div");
    achievementDiv.setAttribute("id","achievement");
    achievementDiv.classList.add("d-inline-block","chartStyle");
    firstDbRow.appendChild(achievementDiv);

    npsDiv= document.createElement("div");
    npsDiv.setAttribute("id","nps");
    npsDiv.classList.add("d-inline-block","chartStyle");
    firstDbRow.appendChild(npsDiv);

    var secondDbRow=document.createElement("div");
    board.appendChild(secondDbRow);

    var techGraphDiv= document.createElement("div");
    techGraphDiv.setAttribute("id","techGraph");
    techGraphDiv.classList.add("d-inline-block");
    secondDbRow.appendChild(techGraphDiv);

    listTech=document.createElement('div');
    listTech.setAttribute("id","listTech");
    techGraphDiv.appendChild(listTech);
    
    selectTech=document.createElement('select');
    selectTech.classList.add("form-control","form-control-sm");
    listTech.appendChild(selectTech);

    var optionTech=document.createElement('option');
    selectTech.appendChild(optionTech);

    selectTech.addEventListener("change",function(){
      if(this.value!==-1){
        histogramTech(dataPeriodo,this.value);
        google.charts.setOnLoadCallback(drawHistogramTech(dataG4));
    
        cakeTech(dataPeriodo,this.value);
        google.charts.setOnLoadCallback(techSkillCakeDraw(approveTech,reprobateTech));
        
      }
    }) 

  var techSkillDiv= document.createElement("div");
  techSkillDiv.setAttribute("id","tech_skill");
  techSkillDiv.classList.add("d-inline-block","chartStyle1");
  techGraphDiv.appendChild(techSkillDiv);

  var cakeTechDiv= document.createElement("div");
  cakeTechDiv.setAttribute("id","cakeTech");
  cakeTechDiv.classList.add("d-inline-block","chartStyle1");
  techGraphDiv.appendChild(cakeTechDiv);

  var hseGraphDiv= document.createElement("div");
  hseGraphDiv.setAttribute("id","hseGraph");
  hseGraphDiv.classList.add("d-inline-block");
  secondDbRow.appendChild(hseGraphDiv);

  listHse=document.createElement('div');
  listHse.setAttribute("id","listHse");
  hseGraphDiv.appendChild(listHse);
  
  selectHse=document.createElement('select');
  selectHse.classList.add("form-control","form-control-sm");
  listHse.appendChild(selectHse);
  
  var optionHse=document.createElement('option');
  selectHse.appendChild(optionHse);

  selectHse.addEventListener("change",function(){
    if(this.value!==-1){
      histogramHse(dataPeriodo,this.value);
      google.charts.setOnLoadCallback(drawHistogramLife(dataG5));
      
      cakeHse(dataPeriodo,this.value)
      google.charts.setOnLoadCallback(HSESkillCakeDraw(approveHse,reprobateHse));
    }
  })

  var lifeSkillDiv= document.createElement("div");
  lifeSkillDiv.setAttribute("id","life_skill");
  lifeSkillDiv.classList.add("d-inline-block","chartStyle1");
  hseGraphDiv.appendChild(lifeSkillDiv);

  var cakeHseDiv= document.createElement("div");
  cakeHseDiv.setAttribute("id","cakeHse");
  cakeHseDiv.classList.add("d-inline-block","chartStyle1");
  hseGraphDiv.appendChild(cakeHseDiv);
  }
  /*INICIO Código dashboard*/

  google.charts.load('current', {'packages':['bar']}); //Barra
  google.charts.load("current", {packages:["corechart"]});//Torta, Histograma
  google.charts.load('current', {'packages':['corechart']});//Curvas

    //GRAFICA ENROLLMENT
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

    var chart = new google.charts.Bar(enrollmentDiv);
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  //GRAFICA ACHIEVEMENT
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

  function achievementDraw(dataG2) {
    var data = new google.visualization.DataTable();
    data.addColumn('string','Sprint');
    data.addColumn('number','Score average');

      //Ordena elementos del objeto
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

    var chart = new google.visualization.LineChart(achievementDiv);
    chart.draw(data, options);
  }

  // GRAFICA NET PROMOTER SCORE
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
  function npsDraw() {
    var data = new google.visualization.DataTable();
    data.addColumn('string','Sprint');
    data.addColumn('number','NPS');

    //Ordena elementos del objeto
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
    var chart= new google.visualization.LineChart(npsDiv);
    chart.draw(data, options);
  }

  //DIBUJANDO SELECT DE HISTOGRAMAS Y CAKE GRAPH


  //GRAFICA HISTOGRAMA SKILL TECH
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

  //GRAFICA CAKE SKILL TECH 
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

  //GRAFICA HISTOGRAMA SKILL LIFE 
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

  //GRAFICA CAKE SKILL LIFE 
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

  /*FIN Código dashboard*/

  /*INICIO students*/
  var studentPeriodo="";
  var studentGeneration=document.getElementsByName("studentGeneration");
  var nDiv="";
  for (var i=0; i<studentGeneration.length;i++){
    studentGeneration[i].addEventListener("click", function(){
      while (board.firstChild) {
        board.removeChild(board.firstChild);
      }
      var periodo1=this.className;
      studentPeriodo=data[sede][periodo1];
      studentDraw(studentPeriodo);    
    })
  }
  function studentDraw(data){
    if(data!==undefined && data.hasOwnProperty("students")){
      var dataTemp=[];
      for(i=0;i<data.students.length;i++){
        if(data.students[i]!==undefined && data.students[i].name!==undefined){
          dataTemp.push(data.students[i])
        }
      }
      data.students=dataTemp;

      if (data.students.length%3!==0){
        nDiv=Math.floor(data.students.length/3)+1;
      }else {
        nDiv=data.students.length/3;
      }
      var k=0;
      for(var i=0;i<nDiv;i++){
        var divCont=document.createElement("div");
        divCont.style.overflow="hidden";
        divCont.style.marginBottom="2em";
        divCont.style.width="60em";
        board.appendChild(divCont);
        for (var j=k; j<k+3; j++){
          if (data.students[j]!==undefined && data.students[j].hasOwnProperty("name")){
            var divStudent=document.createElement("div");
            divStudent.classList.add("floatLeft", "profileStyle");
            divCont.appendChild(divStudent);

            var picture=document.createElement("img");
            picture.setAttribute("src",data.students[j].photo)
            divStudent.appendChild(picture);
            picture.style.marginLeft="2em";
            picture.style.width="10em";
            picture.style.height="10em";
                        
            var nameSpace=document.createElement("h5");
            var name=document.createTextNode(data.students[j].name)
            nameSpace.appendChild(name);
            divStudent.appendChild(nameSpace);

            var active=document.createElement("div");
            divStudent.appendChild(active);
            active.style.width="100%";
            active.style.height="1em";
            
            if(data.students[j].active){
              active.style.backgroundColor="#f9a91a";
            }else{
              active.style.backgroundColor="grey";
            }
          }
        }
        k+=3;
      }
    }
  }
  /*FIN students*/

  /*INICIO teachers*/
  var teacher=document.getElementsByName("teacherGeneration")
  for (var i=0; i<teacher.length;i++){
    teacher[i].addEventListener("click", function(){
      while (board.firstChild) {
        board.removeChild(board.firstChild);
      }
      var periodo2=this.className;
      var teacherPeriodo=data[sede][periodo2];
        
      teacherDraw();

      teacherRating(teacherPeriodo);
      google.charts.setOnLoadCallback(teacherRatingDraw(dataG6));
        
      jediRating(teacherPeriodo);
      google.charts.setOnLoadCallback(jediRatingDraw(dataG7));
      
          
    })
  }
  function teacherDraw(){
    var firstRow=document.createElement("div");
    firstRow.setAttribute("class","center");
    board.appendChild(firstRow);

    teacherDiv= document.createElement("div");
    teacherDiv.setAttribute("class","teacherRating")
    teacherDiv.classList.add("d-inline-block");

    firstRow.appendChild(teacherDiv);

    jediDiv= document.createElement("div");
    jediDiv.setAttribute("class","teacherRating")
    jediDiv.classList.add("d-inline-block");
    firstRow.appendChild(jediDiv);
    
  }

  var dataG6={}
  function teacherRating(data){
    dataG6={};
    if(data!==undefined && data.hasOwnProperty("ratings")){
      for (i=0; i<data.ratings.length; i++){
        dataG6['S'+data.ratings[i].sprint]=data.ratings[i].teacher;
      }
    }
  }

  function teacherRatingDraw(dataIn){
    var data = new google.visualization.DataTable();
    data.addColumn('string','Sprint');
    data.addColumn('number','Active');
    for(var i in dataIn){
      data.addRows([
        [i,dataIn[i]]          
      ]);
    }
    
    var options = {
      chart: {
        title: 'Teacher Rating',
        subtitle: 'Per Sprint'
      },
      colors:'#f9a91a',
      series: {
          0: { axis: 'Rating' }, 
        },
      axes: {
          y: {
            activas: {label: ''},
          }
      }
    };

    var chart = new google.charts.Bar(teacherDiv);
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  var dataG7={}
  function jediRating(data){
    dataG7={}
    if(data!==undefined && data.hasOwnProperty("ratings")){
      for (i=0; i<data.ratings.length; i++){
        dataG7["S"+data.ratings[i].sprint]=data.ratings[i].jedi;
      }
    }
  }

  function jediRatingDraw(dataIn){
    var data = new google.visualization.DataTable();
    data.addColumn('string','Sprint');
    data.addColumn('number','Active');
    for(var i in dataIn){
      data.addRows([
        [i,dataIn[i]]          
      ]);
    }
    
    var options = {
      chart: {
        title: 'Jedi Rating',
        subtitle: 'Per Sprint'
      },
      colors:'#f9a91a',
      series: {
          0: { axis: 'Rating' }, 
        },
      axes: {
          y: {
            activas: {label: ''},
          }
      }
    };

    var chart = new google.charts.Bar(jediDiv);
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
  /*FIN teachers*/
}