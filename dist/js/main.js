
var PEOPLES="";
var PEOPLESDETAIL=[];
var HARD_CODED_ACCOUNT = "0x731a765dff550d11b7c880af145066bc1bdd3127";
var HARD_CODED_PRIVATEKEY = "d816e5e0eab23dc5573968edaed1443787b03a5dddf4b82e48818ad3634a894a";
var HARD_CODED_SCOUTER = "0x6f213a598be7058a4248eaf0a2593210fa8b71c3";
var HARD_CODED_NUMBER = 0;
var ScouterAccessHideInfoYn = {};
///////////////////////////////////////////////////
// 모두 캐시 해야 됨
// 이래가지고는 안된다.
// 전부 로컬스토리지에 넣어놓고
// 주기적으로 갱신 해야 한다
// 구조는 ?

// myaccount : {privatekey, number}
// {account} : {구매했는지, 파일명이뭔지,  }
// 
//느린 주범 1. 
// initUser
// PEOPLES = initUser(1);
// PEOPLES = PEOPLES.replace(/'/g, '"');
// PEOPLES = JSON.parse(PEOPLES);
//
// 0. 한번 접근하면 로컬스토리지에 저장한다.
// 1. 로컬스토리지에 접근해서 PEOPLES를 가져온다.
// 2. 값이 없으면 initUser 진행, 값이 있으면 리턴.
// 3. 주기적으로 initUser 를 호출해준다.
//
//느린 주범 2.
//getScouterAccessHideInfoYn
//var files = getScouterAccessHideInfoYn(account,PEOPLES[number].account)
//if(files[0]!=""){
//
//느린 주범 3.
//getScouterPurchaseAccountList
//
// //
// var scouterPurchaseAccountList = getScouterPurchaseAccountList(account);
// var paid = false;
// for (var i in scouterPurchaseAccountList[0]){
//   if(typeof PEOPLES[number].account!='undefined' && scouterPurchaseAccountList[0][i] == PEOPLES[number].account) paid = true;
// }
////////////////////////////////////////////////////


function insertPrivateContent(){
  var tables = document.getElementById('tables');
  
  var table = document.createElement('table');  
    table.className = "contents_table";
    table.width = "350px";
    table.style = "margin: 0px auto; padding-top:10px"
    table.bgcolor="#FFFFFF";
    table.border="0";
    tables.appendChild(table);
    
  var tbody = document.createElement('tbody');
    table.appendChild(tbody);

  var tr1 = document.createElement('tr');
    tbody.appendChild(tr1);

  var td1 = document.createElement('td');
    tr1.appendChild(td1);  
  
  var frmTag1 = '<input type=text name=addText style="width:300px; height:30px;" placeholder="Content Name">';
    td1.innerHTML=frmTag1;

  var td2 = document.createElement('td');
    td2.rowSpan="2";
    tr1.appendChild(td2);  

  var frmTag2 = '<button class="btn btn-outline-danger my-2 my-sm-0" type=button value="삭제" onClick="deletePrivateContent($(this))" style="cursor:hand; height:50px;">X</button>';
    td2.innerHTML=frmTag2;  

  var tr2 = document.createElement('tr');
    tr2.style="padding-bottom:10px";
    tbody.appendChild(tr2);

  var frmTag3 = '<input type=text name=addText style="width:300px; height:30px;" placeholder="Content URL">';
    td3.innerHTML=frmTag3;  


}

function deletePrivateContent(td) {
  console.log(td.parent().parent().parent().parent().remove());
}


  //value == COIN
  //_계좌 사용자
  //_계좌 스카우터
  //prikey : d816e5e0eab23dc5573968edaed1443787b03a5dddf4b82e48818ad3634a894a
  //function sendPmcForOpenHideInfo(gas, value, _to, _from, priKey){

function useGas(coin,number){
  alertify.prompt('<H4>'+coin+' <span class="glyphicon glyphicon-fire"></span>  will be paid.</H4> <br>And It takes some time. <br> Speed is depend on GAS :', "50",
  function(evt, value ){
    alertify.confirm("Are you sure ? Coin :"+coin+" Gas :"+value+ " <br>Will be paid for private info.",
      function(){
        sendPmcForOpenHideInfo(value, coin, PEOPLES[number].account, HARD_CODED_SCOUTER, HARD_CODED_PRIVATEKEY)
        setJumboButton(number,"YELLOW");
        alertify.success('Ok');
      },
      function(){
        alertify.error('Cancel');
      });
  },
  function(){
    alertify.error('Cancel');
  })
}

function addJumbotronToMain(name, context, imageURL, number, type){
  var main = document.getElementById("main");
  
  var jumbotron = document.createElement('div');
    jumbotron.className = "jumbotron";
    jumbotron.style = "background-color: white; margin-bottom: 1rem;";
    jumbotron.setAttribute("data-target","#profileModal");
    jumbotron.setAttribute("data-toggle","modal");
    jumbotron.href="#"
    jumbotron.id = "jumbotron_"+number;
    jumbotron.style = "border-radius: 0px;margin-bottom: 10px;background-color: white;border-bottom: solid gray; border-bottom-width: 1px;border-right-width: 0.7px; ";
    main.appendChild(jumbotron);

  var table = document.createElement('table');
    table.style="width:100%"
    jumbotron.appendChild(table);

  var td1 = document.createElement('td');
    td1.style = "padding:20px";
    table.appendChild(td1);

  var image = '<img src="'+imageURL+'" alt="'+name+'" height="80" width="80" '
    if(type=="PERSON") image+='class="rounded-circle"'
    image+='></img>';
    td1.innerHTML=image;

  var td2 = document.createElement('td');
    td2.style = "vertical-align:middle";
    table.appendChild(td2);
    
  var td3 = document.createElement('td');
  td3.id="load_"+number;
  td3.style = "vertical-align:middle; height:80px; width:80px";
  table.appendChild(td3);  

  var h = document.createElement('h6');
    td2.appendChild(h);

  var myContext = name+' <p class="lead">'+context+'</p>';
    h.innerHTML=myContext;
  
    if(type=="PERSON"){
      drawAllItems("HARD_CODED_SCOUTER",number);
      jumbotron.setAttribute("onclick","updatePeopleModal("+number+")");
    }

}


function drawAllItems(account,number){
  account = HARD_CODED_SCOUTER
  var scouterPurchaseAccountList = getScouterPurchaseAccountList(account);
  var paid = false;
  for (var i in scouterPurchaseAccountList[0]){
    if(typeof PEOPLES[number].account!='undefined' && scouterPurchaseAccountList[0][i] == PEOPLES[number].account) paid = true;
  }
    if(paid) {
      //버튼은 노란색 아니면 파란색이되어야하고
      //로딩바가 뿌려지거나 데이터가 뿌려져야 한다.
      console.log("PAID !! : "+paid);
      var files = getScouterAccessHideInfoYn(account,PEOPLES[number].account)
        if(files[0]!=""){
          //데이터가 있다면, 로딩바는 없애고 파란색을 틀어주고 뿌려준다
          console.log("files : "+files);
          setJumboButton(number,"BLUE");
          setModalLoder(false);

          document.getElementById("interview-tab").className="nav-link";

          var myButton = document.getElementById('modalPeopleMore');
          myButton.disabled=false;
          myButton.className="btn btn-success";
          myButton.innerHTML="I need you !";
          myButton.setAttribute("onclick",'iNeedYou('+number+')');
          frm = "<strong>Private Detail : </strong><br>";
          for (var i in files){
            if(files[i]!=""){
              frm += "&nbsp;"+files[i]+"<br>";
            }
          }
          document.getElementById("modalPeoplePrivateInfoDetail").innerHTML = frm;
        } else {
          //샀는데 데이터가 없다...
          //데이터를 지워주고 노란색을 틀어주고 로딩바를 그려준다
          console.log("PAID, BUT NO DATA !!! ");
          document.getElementById("interview-tab").className="nav-link fade disabled";
          document.getElementById("profile-tab").className="nav-link active show";
          
          document.getElementById("profileTab").className = "tab-pane active show";
          document.getElementById("interviewTab").className = "tab-pane";

          document.getElementById('modalPeoplePrivateInfoDetail').innerHTML="";
          setJumboButton(number,"YELLOW");
          setModalLoder(true);
          document.getElementById('modalPeopleMore').disabled=true;
        }
    } else {
      //안샀음.. 로딩바 빼주고 회색 틀어준다
      console.log("NOT PAID !!! ");
          document.getElementById("interview-tab").className="nav-link fade disabled";
          document.getElementById("profile-tab").className="nav-link active show";
          
          document.getElementById("profileTab").className = "tab-pane active show";
          document.getElementById("interviewTab").className = "tab-pane";

          document.getElementById('modalPeoplePrivateInfoDetail').innerHTML="";
          setJumboButton(number,"GRAY");
          setModalLoder(false);
          document.getElementById('modalPeopleMore').disabled=false;
    }
}

function removeAllJumbotrons(){
  var myNode = document.getElementById("main");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
}

function setJumboButton(number,color){
  jumbotron = document.getElementById("jumbotron_"+number);
  if(color == "YELLOW"){
    //myButton.innerHTML = "View"
    //myButton.className = "btn btn btn-warning";

    //    border: solid rgb(23, 162, 184);
    //myButton.style = "background-color:rgb(185, 147, 32);"
    jumbotron.style = "border-radius: 0px;margin-bottom: 10px;background-color: white;border-bottom: solid gray; border-bottom-width: 1px;border-right-width: 0.7px; ";
    document.getElementById('load_'+number).innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  }else if (color == "BLUE"){
    //myButton.innerHTML = "View All"
    //myButton.className = "btn btn btn-primary";
    //<div class="lds-heart"><div></div></div>
    document.getElementById('load_'+number).innerHTML = '<div class="lds-heart"><div></div></div>';
    jumbotron.style = "border-radius: 0px;margin-bottom: 10px;background-color: white;border-bottom: solid gray; border-bottom-width: 1px;border-right-width: 0.7px; ";
    //myButton.style = "background-color:#17a2b8"
  }else if(color == "GRAY"){
    //myButton.innerHTML = "View"
    //myButton.className = "btn btn btn-secondary";
    document.getElementById('load_'+number).innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    jumbotron.style = "border-radius: 0px;margin-bottom: 10px;background-color: white;border-bottom: solid gray;border-bottom-width: 1px;border-right-width: 0.7px; ";
    //myButton.style = "background-color:rgb(140, 146, 152);"
  }else if(color == "RED"){
    //myButton.innerHTML = "View"
    //myButton.className = "btn btn btn-error";
  }
}

function setModalLoder(loader){
  if(loader){
    document.getElementById('modalLoader').className="loader loader-8";
  } else {
    document.getElementById('modalLoader').className="";
  }
}


function updatePeopleModal(number){ 
  console.log("updatePeopleModal !!! ");
  var items = PEOPLES[number].items
  /*
      사용자 디테일은 사용자 한명한명 직접 클릭했을때 반영
  */
  if(typeof PEOPLESDETAIL[number] == 'undefined'){
      PEOPLESDETAIL[number] = getDetailProfile(PEOPLES[number].account);
      PEOPLESDETAIL[number] = PEOPLESDETAIL[number].replace(/'/g, '"');
      PEOPLESDETAIL[number] = JSON.parse(PEOPLESDETAIL[number]);
      
      for(var j in PEOPLESDETAIL[number].profileInfo.careerHistory){
        if( PEOPLESDETAIL[number].profileInfo.careerHistory[j] == "") continue;
        PEOPLESDETAIL[number].profileInfo.careerHistory[j] = PEOPLESDETAIL[number].profileInfo.careerHistory[j];
      }
      for(var j in PEOPLESDETAIL[number].profileInfo.achievements){
        if( PEOPLESDETAIL[number].profileInfo.achievements[j] == "") continue;
        PEOPLESDETAIL[number].profileInfo.achievements[j] = PEOPLESDETAIL[number].profileInfo.achievements[j];
      }
      for(var j in PEOPLESDETAIL[number].profileInfo.educationHistory){
        if( PEOPLESDETAIL[number].profileInfo.educationHistory[j] == "") continue;
        PEOPLESDETAIL[number].profileInfo.educationHistory[j] = PEOPLESDETAIL[number].profileInfo.educationHistory[j];
      }
      for(var j in PEOPLESDETAIL[number].hideInfo.hideInfoHint){
        if( PEOPLESDETAIL[number].hideInfo.hideInfoHint[j] == "") continue;
        PEOPLESDETAIL[number].hideInfo.hideInfoHint[j] = PEOPLESDETAIL[number].hideInfo.hideInfoHint[j];
      }
  }
    
  document.getElementById('modalPeopleName').innerText=items.name;
  document.getElementById('modalPeopleImg').setAttribute("src",items.picture);
  document.getElementById('modalPeopleImg2').setAttribute("src",items.picture);
  var modalPeopleInfo = document.getElementById('modalPeopleInfo');
  while (modalPeopleInfo.firstChild) {
    modalPeopleInfo.removeChild(modalPeopleInfo.firstChild);
  }
  var h3 = document.createElement('h3');
    h3.className = "media-heading";
    modalPeopleInfo.appendChild(h3);

  var frm = 'Trust Power<span id="peoplePMC" class="glyphicon glyphicon-flash"></span>'+items.mvp
    h3.innerHTML = frm;

   for(var i in items.interestItems){
     span = document.createElement('span');
     span.className = "badge badge-pill badge-info";
     span.innerHTML = hexToString(items.interestItems[i]);
     modalPeopleInfo.appendChild(span);
   }

   var modalPeoplePublicInfo = document.getElementById("modalPeoplePublicInfo");
   while (modalPeoplePublicInfo.firstChild) {
    modalPeoplePublicInfo.removeChild(modalPeoplePublicInfo.firstChild);
  }

    frm = "<strong>Public Info : </strong><br>"
    for (var i in PEOPLESDETAIL[number].profileInfo.educationHistory){
      if(PEOPLESDETAIL[number].profileInfo.educationHistory[i]!="")
        frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.educationHistory[i]+"<br>";
    }
    frm+="<p></p>";
    for (var i in PEOPLESDETAIL[number].profileInfo.careerHistory){
      if(PEOPLESDETAIL[number].profileInfo.careerHistory[i]!="")
      frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.careerHistory[i]+"<br>";
    }
    frm+="<p></p>";
    for (var i in PEOPLESDETAIL[number].profileInfo.achievements){
      if(PEOPLESDETAIL[number].profileInfo.achievements[i]!="")
      frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.achievements[i]+"<br>";
    }
    modalPeoplePublicInfo.innerHTML = frm;

    document.getElementById('modalPeopleBio').innerHTML = "<strong>Free Vision: </strong><br>" +PEOPLESDETAIL[number].freeVision;

    var modalPeoplePrivateInfo = document.getElementById("modalPeoplePrivateInfo");
    frm = "<strong>Private Info : </strong><br>"
    for (var i in PEOPLESDETAIL[number].hideInfo.hideInfoHint){
      if(PEOPLESDETAIL[number].hideInfo.hideInfoHint[i]!="")
      frm += "&nbsp;"+PEOPLESDETAIL[number].hideInfo.hideInfoHint[i]+"<br>";
    }
    modalPeoplePrivateInfo.innerHTML = frm;
    //frm += &nbsp;

    document.getElementById('modalPeopleMore').setAttribute("onclick","useGas("+PEOPLESDETAIL[number].hideInfo.hideInfoValue+","+number+")");
    //
    document.getElementById('modalPeopleMore').innerHTML = "More "+PEOPLESDETAIL[number].hideInfo.hideInfoValue+' <span class="glyphicon glyphicon-fire"></span>';
    
  drawAllItems("HARD_CODED_SCOUTER",number);
  
}


function dummyPeople(){
  removeAllJumbotrons();
  //http://cfile5.uf.tistory.com/image/99E8E33359DB49394B6E66
  addJumbotronToMain("휴지", "Security 전문가입니다.", "http://cfile5.uf.tistory.com/image/99E8E33359DB49394B6E66","http://blog.securekim.com","PEOPLE");
  addJumbotronToMain("보겸", "SW Engineer 지원 중입니다.", "http://image.hankookilbo.com/i.aspx?Guid=0b2feec797064d63a86c6b9bdedfb4d7&Month=201602&size=640","http://blog.securekim.com","PEOPLE");
  addJumbotronToMain("소련", "Server Engineer 입니다!", "https://www.fashionseoul.com/wp-content/uploads/2017/02/20170217_sul-3.jpg","http://blog.securekim.com","PEOPLE");
}

function dummyCompany(){
  removeAllJumbotrons();
  addJumbotronToMain("Samsong", "We Are The Samsong Electronics", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("SKI", "Happy, Supex with SK I", "https://d50gait2982zr.cloudfront.net/wp-content/uploads/2017/08/sb3-logo-1c-blue-p289-rgb.svg","http://blog.securekim.com","COMPANY"); 
  addJumbotronToMain("Blchess", "We seek 3 Students. ", "https://openclipart.org/download/214574/lego3.svg","http://blog.securekim.com","COMPANY");
}

function dummyPickme(){
  removeAllJumbotrons();
  addJumbotronToMain("SKI", "We seek 2 Server Engineers", "https://d50gait2982zr.cloudfront.net/wp-content/uploads/2017/08/sb3-logo-1c-blue-p289-rgb.svg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("SKI", "We seek 3 SW Engineers", "https://d50gait2982zr.cloudfront.net/wp-content/uploads/2017/08/sb3-logo-1c-blue-p289-rgb.svg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("Samsong", "We seek 1 Marketers. ", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("Samsong", "We seek 3 Security Engineer. ", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("Samsong", "We seek 2 Project Manager. ", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("Blchess", "We seek 3 Students. ", "https://openclipart.org/download/214574/lego3.svg","http://blog.securekim.com","COMPANY");
  addJumbotronToMain("Blchess", "We seek 1 Manager. ", "https://openclipart.org/download/214574/lego3.svg","http://blog.securekim.com","COMPANY");
  
}
  
function updateModalI(){

    number = HARD_CODED_NUMBER;
    var items = PEOPLES[HARD_CODED_NUMBER].items
    
    document.getElementById('modalIName').innerText=items.name;
    document.getElementById('modalIImg').setAttribute("src",items.picture);
    var modalPeopleInfo = document.getElementById('modalIInfo');
    while (modalPeopleInfo.firstChild) {
      modalPeopleInfo.removeChild(modalPeopleInfo.firstChild);
    }
    var h3 = document.createElement('h3');
      h3.className = "media-heading";
      modalPeopleInfo.appendChild(h3);
  
    var frm = 'Trust Power<span id="IPMC" class="glyphicon glyphicon-flash"></span>'+items.mvp
      h3.innerHTML = frm;
  
     for(var i in items.interestItems){
       span = document.createElement('span');
       span.className = "badge badge-pill badge-info";
       span.innerHTML = hexToString(items.interestItems[i]);
       modalPeopleInfo.appendChild(span);
     }
  
     var modalPeoplePublicInfo = document.getElementById("modalIPublicInfo");
     while (modalPeoplePublicInfo.firstChild) {
      modalPeoplePublicInfo.removeChild(modalPeoplePublicInfo.firstChild);
    }
  
      frm = "<strong>Public Info : </strong><br>"
      for (var i in PEOPLESDETAIL[number].profileInfo.educationHistory){
        if(PEOPLESDETAIL[number].profileInfo.educationHistory[i]!="")
          frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.educationHistory[i]+"<br>";
      }
      frm+="<p></p>";
      for (var i in PEOPLESDETAIL[number].profileInfo.careerHistory){
        if(PEOPLESDETAIL[number].profileInfo.careerHistory[i]!="")
        frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.careerHistory[i]+"<br>";
      }
      frm+="<p></p>";
      for (var i in PEOPLESDETAIL[number].profileInfo.achievements){
        if(PEOPLESDETAIL[number].profileInfo.achievements[i]!="")
        frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.achievements[i]+"<br>";
      }
      modalPeoplePublicInfo.innerHTML = frm;
  
      document.getElementById('modalIBio').innerHTML = "<strong>Free Vision: </strong><br>" +PEOPLESDETAIL[number].freeVision;
  
      var modalPeoplePrivateInfo = document.getElementById("modalIPrivateInfo");
      frm = "<strong>Private Info : </strong><br>"
      for (var i in PEOPLESDETAIL[number].hideInfo.hideInfoHint){
        if(PEOPLESDETAIL[number].hideInfo.hideInfoHint[i]!="")
        frm += "&nbsp;"+PEOPLESDETAIL[number].hideInfo.hideInfoHint[i]+"<br>";
      }
      modalPeoplePrivateInfo.innerHTML = frm;
      //frm += &nbsp;
  
  var files = getHideAppendFile(PEOPLES[HARD_CODED_NUMBER].account);
  frm = "";

  for (var i in files){
    if(files[i]!="")
      frm += "&nbsp;"+files[i]+"<br>";
  }
  document.getElementById("modalIPrivateInfoDetail").innerHTML = frm;
}

/////////////////////////////

function drawPeople(){
  removeAllJumbotrons();
  if(PEOPLES==""){
    console.log("initUser !");
    PEOPLES = initUser(1);
    PEOPLES = PEOPLES.replace(/'/g, '"');
    PEOPLES = JSON.parse(PEOPLES);
  }
  for(var i in PEOPLES){
    if(PEOPLES[i].items["name"] != ""){
      var company =  PEOPLES[i].items["company"] == "" ? "" : "'"+PEOPLES[i].items["company"]+"' 의 "
      var job =  PEOPLES[i].items["job"] == "" ? "구직자 입니다." : "'"+PEOPLES[i].items["job"]+"'"
      addJumbotronToMain(PEOPLES[i].items["name"], company + job, PEOPLES[i].items["picture"],i,"PERSON");
    }
  }
  /*
  for(var i in PEOPLES){
    if(PEOPLES[i].items["name"] != ""){
     if(typeof PEOPLESDETAIL[i] == 'undefined'){
      PEOPLESDETAIL[i] = getDetailProfile(PEOPLES[i].account);
      PEOPLESDETAIL[i] = PEOPLESDETAIL[i].replace(/'/g, '"');
      PEOPLESDETAIL[i] = JSON.parse(PEOPLESDETAIL[i]);
      
      for(var j in PEOPLESDETAIL[i].profileInfo.careerHistory){
        
        if( PEOPLESDETAIL[i].profileInfo.careerHistory[j] == "") continue;
        PEOPLESDETAIL[i].profileInfo.careerHistory[j] = PEOPLESDETAIL[i].profileInfo.careerHistory[j];
      }
      for(var j in PEOPLESDETAIL[i].profileInfo.achievements){
        if( PEOPLESDETAIL[i].profileInfo.achievements[j] == "") continue;
        PEOPLESDETAIL[i].profileInfo.achievements[j] = PEOPLESDETAIL[i].profileInfo.achievements[j];
      }
      for(var j in PEOPLESDETAIL[i].profileInfo.educationHistory){
        if( PEOPLESDETAIL[i].profileInfo.educationHistory[j] == "") continue;
        PEOPLESDETAIL[i].profileInfo.educationHistory[j] = PEOPLESDETAIL[i].profileInfo.educationHistory[j];
      }
      for(var j in PEOPLESDETAIL[i].hideInfo.hideInfoHint){
        if( PEOPLESDETAIL[i].hideInfo.hideInfoHint[j] == "") continue;
        PEOPLESDETAIL[i].hideInfo.hideInfoHint[j] = PEOPLESDETAIL[i].hideInfo.hideInfoHint[j];
      }
    }
  }
}
*/

}

//   }

// }






    //////////////////////////////
    var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/TvuMDSQ9QbgjPihMgjvZ'));


    //사용자 관련
    userContainerContractAddress = "0xbaf2f72c3c970a1379a2d1f9b5e45bc26e05694e";
    userBasicInfoContractAddress = "0x82a1a1db6990e33a0039566f64985468a32a0a98"
    userProfileContractAddress = "0x663216c1c8f109995dba6501f8e7ff066d5b679b";
    userFreevisionContractAddress = "0x24d6d4a0285b639d42529964c4322d98172beece";
    userHideInfoContractAddress = "0x91fadc97787c5102138c6765c8905f42951c225d";
    userHideAppendInfoContractAddress = "0xba8bcbae2e2336e306a385c874483303632c4776";

    //관심해시태그 관련
    interestContainerContractAddress = "0xbf7cf53298ca1001812832c7e857bb2bef667be7";

    //PM Token 관련
    pmTokenContractAddress = "0x7a49eaaf8aac6e71bb984a3158f0afd6085259b2";

    //면접진행 관련
    recruitChkContractAddress = "0xda4b29a6a10ae9eba60f2d70f39e5c153753ba0a";


    //회사 관련 
    companyContainerContractAddress = "0x3bb0cdbe30a886ca5b3f301249fdbbb9da20e833";
    companyMainContractAddress = "0x82e448165a2482e62f028baa67d076b8a50e3379";
    companyDetailContractAddress = "0x200c91b0e868bbd305b17789beacf24cbd233270";
  



    //사용자 메인 리스트에 보여줄 아이템
    function initUser(page) {

      var resList = new Array() ;

      userContainer = web3.eth.contract(userContainerAbi).at(userContainerContractAddress);
      userBasicInfo = web3.eth.contract(userMainAbi).at(userBasicInfoContractAddress);
      var data = userContainer.getAddr(1*page - 1, (1*page - 1) + 10);

      for(i=0;i<data.length;i++){

        var userbasic = userBasicInfo.getBasicInfo(data[i]);

        var item = new Object();
        item.picture = userbasic[0];
        item.name = userbasic[1];
        item.job = userbasic[2];
        item.company = userbasic[3];
        item.interestItems = userbasic[4];
        item.updateTime = userbasic[5];
        item.mvp = userbasic[6];


        var itemList = new Object() ;
        itemList.account = data[i] ;
        itemList.items = item;
        resList.push(itemList);
      }
      var jsonResult = JSON.stringify(resList);

      return jsonResult;
    }
    



    //사용자 디테일 프로필 조회
    function getDetailProfile (_addr){
      var resList = new Array() ;
      userProfileContract = web3.eth.contract(userProfileAbi).at(userProfileContractAddress);
      userFreeVisionContract = web3.eth.contract(userFreeVisionAbi).at(userFreevisionContractAddress);
      userHideInfoContract = web3.eth.contract(userHideInfoAbi).at(userHideInfoContractAddress);

      var item = new Object() ;
      var vision = userFreeVisionContract.getUserFreeVision(_addr);
      var hideInfo = userHideInfoContract.getUserHideInfo(_addr);

      var profileInfoItem = new Object();
      profileInfoItem.educationHistory = userProfileContract.getEducationHistoryInfo(_addr);
      profileInfoItem.careerHistory = userProfileContract.getCareerHistoryInfo(_addr);
      profileInfoItem.achievements = userProfileContract.getAchievementHistoryInfo(_addr);

      var hideInfoItem = new Object();
      hideInfoItem.hideInfoValue = hideInfo[0];
      hideInfoItem.estimateValue = hideInfo[1];
      hideInfoItem.openCount = hideInfo[2];
      hideInfoItem.hideInfoHint = userHideInfoContract.getUserHideInfoHint(_addr);


      item.profileInfo = profileInfoItem;
      item.freeVision = vision;
      item.hideInfo = hideInfoItem;
      var jsonResult = JSON.stringify(item);
      return jsonResult;
    }

    //관심 분야 리스트
    function getInterestItems(){

      var resList = new Array() ;

      interestContainer = web3.eth.contract(interestContainerAbi).at(interestContainerContractAddress);
      var data = interestContainer.getInterestItemList.call();

      for(i=0;i<data.length;i++){
        resList.push(hexToString(data[i].toString()));
      }

      return resList;
    }

     //Byte로 저장된 글자들
     function hexToString(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
    }

    //나의 PM Token 잔액 확인
    function getPMCBalance(addr){
      pmcTokenContract = web3.eth.contract(pmcTokenAbi).at(pmTokenContractAddress);
      balance = pmcTokenContract.balanceOf(addr).toNumber();
      return balance;
    }



  //비공개 정보 보기위해 토큰 전달
  //value == COIN
  //_계좌 사용자
  //_계좌 스카우터
  //prikey : d816e5e0eab23dc5573968edaed1443787b03a5dddf4b82e48818ad3634a894a
  function sendPmcForOpenHideInfo(gas, value, _to, _from, priKey){
    contractAddress = pmTokenContractAddress;
    pmcTokenContract = web3.eth.contract(pmcTokenAbi).at(contractAddress);
    
    var count = web3.eth.getTransactionCount(_from);
    const gasPriceHex = web3.toHex(gas*1000000000);
    gasLimitHex = web3.toHex(244747);
    var rawTransaction = {
      "from": _from,
      "nonce": web3.toHex(count),
      "gasPrice": gasPriceHex,
      "gasLimit": gasLimitHex,
      "to": contractAddress,
      "value": "0x00",
      "data": pmcTokenContract.trasferOpenHideInfo.getData(_from,_to, value),
      "chainId": "0x03"
    };

    var privKey = new EthJS.Buffer.Buffer(priKey, 'hex');
    var tx = new EthJS.Tx(rawTransaction);

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      if (!err){
        // 이걸 하고나서 팝업.
        // 성공이랑 관계가 없음.
        // HASH - 하나의 계약서 - 트랜잭션 
        // 해시 값..함수를 동적으로 생성해서 계속 쪼고있음
        // pending / success
          console.log(hash);
            //sendMessage(hash);
            alertify
            .alert("Your transaction is posted ! <br>But It takes some time (1~3 min) <br>CONTRACT : "+hash, function(){
              //alertify.success('Success');
              localStorage.setItem("PAID_"+_to, "PAID");
            });
          }else{
            console.log(err);
          }

        });

  }




  // UserTransaction : 0x4d0c0f53364847349635231a125efef573bd0e6c
  function getUserTransactionList(addr){
    userTxContract = web3.eth.contract(userTransactionAbi).at('0x4d0c0f53364847349635231a125efef573bd0e6c');
    data = userTxContract.getTransaction(addr);

    var resList = new Array() ;
    for(i = 0; i<data.length ;i++){
      txReceipt = web3.eth.getTransactionReceipt(data[i]);
      var item = new Object() ;
      item.tx = data[i] ;

      if(txReceipt.status == 0) item.status = "Pending";
      if(txReceipt.status == 1) item.status = "Success";
      resList.push(item);
    }

    var jsonResult = JSON.stringify(resList);

    return jsonResult;
  }

    //회사 메인 리스트에 보여줄 아이템
    function getCompanyMainList(){

      var resList = new Array() ;

      companyContainer = web3.eth.contract(companyContainerAbi).at(companyContainerContractAddress);
      companyMainInfo = web3.eth.contract(companyMainAbi).at(companyMainContractAddress);
      var data = companyContainer.getCompanyList.call();

      for(i=0;i<data.length;i++){
        
        var companyMainItem = companyMainInfo.getCompanyMainInfo(data[i]);

        var item = new Object() ;
        item.account = data[i] ;
        item.items = companyMainItem;

        resList.push(item);
      }

      var jsonResult = JSON.stringify(resList);

      return jsonResult;
    }

    function getCompanyDetailInfo(_addr){

      companyDetailContainer = web3.eth.contract(companyDetailAbi).at(companyDetailContractAddress);
      var data = companyDetailContainer.getCompanyDetailInfo(_addr);

      var item = new Object() ;
      item.employeeNum = data[0].toString();
      item.openDate = data[1];
      item.companyType = data[2];
      item.homepage = data[3];
      item.logoImg = data[4];
      item.feedImg = data[5];

      var recruits = new Array() ;
      for(i = 0; i< data[6].length;i++){

        var aaa = data[6][i];

        recruitContract = web3.eth.contract(recruitAbi).at(aaa);

        var bottom = recruitContract.getRecruitInfoUp();
        var up = recruitContract.getRecruitInfoUp();

        var recruitItem = new Object() ;
        recruitItem.title = up[0];
        recruitItem.interestCate = up[1];
        recruitItem.recruitType = up[2];
        recruitItem.minEducational = up[3];
        recruitItem.careerLimit = up[4];
        recruitItem.preferentialTreatment = up[5];
        recruitItem.workType = bottom[0];
        recruitItem.paymentIndex = bottom[1];
        recruitItem.posibleWorkLocation = bottom[2];
        recruitItem.startTime = bottom[3];
        recruitItem.endTime = bottom[4];
        recruitItem.decription = bottom[5];

        recruits.push(recruitItem);
      }

      item.recruitList = recruits;

      return item;


    }



    //비공개 첨부파일 가져오기
    function getHideAppendFile(_addr){
      companyDetailContainer = web3.eth.contract(userHideAppendInfoAbi).at(userHideAppendInfoContractAddress);
      return companyDetailContainer.getUserHideAppendInfo(_addr);
    }



    //스카우터가 사용자 비공개 정보 보려고 할때 판단
    // 1. 사용자 허용리스트에 스카우터가 존재한다.
    // 2. 스카우터 오픈 리스트에 해당 사용자가 존재한다.
    // 3. 오픈기간 7일 이내의 접근이다.
    function getScouterAccessHideInfoYn(scouterAddr, userAddr){
        contractAddress = pmTokenContractAddress;
        pmcTokenContract = web3.eth.contract(pmcTokenAbi).at(contractAddress);
        var data = pmcTokenContract.getHideInfoOther(scouterAddr,userAddr);
        return data;
    }

    //스카우터가 자신이 구매한 사용자 계좌 정보
    function getScouterPurchaseAccountList(_addr){
        contractAddress = pmTokenContractAddress;
        pmcTokenContract = web3.eth.contract(pmcTokenAbi).at(contractAddress);
        var data = pmcTokenContract.getScouterOpenAddressList(_addr);
        return data;
    }




    //면접요청 리스트 확인
    function getRecruitRequestList(_addr, page){

    var resList = new Array() ;

      recruitChkContract = web3.eth.contract(recruitChkAbi).at(recruitChkContractAddress);
      
      var data = recruitChkContract.getMapping(_addr, 1*page - 1, (1*page - 1) + 10);

      return data;
    }


    //스카우터가 구직자에게 면접요청 (가스, 구직자, 스카우터, 면접비, 날짜 YYYYMMDD-24MISS, , 장소, 비상연락망)
    function requestRecruitUser(gas, _to, _from, priKey, _recruitReward,  _meetingDate,  _meetingPlace,  _emergencyPhoneNumber){

	    recruitChkContract = web3.eth.contract(recruitChkAbi).at(recruitChkContractAddress);
	    
	    var count = web3.eth.getTransactionCount(_from);
	    const gasPriceHex = web3.toHex(gas*1000000000);
	    gasLimitHex = web3.toHex(563580);
	    var rawTransaction = {
	      "from": _from,
	      "nonce": web3.toHex(count),
	      "gasPrice": gasPriceHex,
	      "gasLimit": gasLimitHex,
	      "to": recruitChkContractAddress,
	      "value": "0x00",
	      "data": recruitChkContract.makeRecruit.getData(_recruitReward,_from, _to, _meetingDate, _meetingPlace, _emergencyPhoneNumber),
	      "chainId": "0x03"
	    };

	    var privKey = new EthJS.Buffer.Buffer(priKey, 'hex');
	    var tx = new EthJS.Tx(rawTransaction);

	    tx.sign(privKey);
	    var serializedTx = tx.serialize();

	    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
	      if (!err){
	        // 이걸 하고나서 팝업.
	        // 성공이랑 관계가 없음.
	        // HASH - 하나의 계약서 - 트랜잭션 
	        // 해시 값..함수를 동적으로 생성해서 계속 쪼고있음
	        // pending / success
	          console.log(hash);
	            //sendMessage(hash);
	            alertify
	            .alert("Your transaction is posted ! <br>But It takes some time (1~3 min) <br>CONTRACT : "+hash, function(){
	              //alertify.success('Success');
	              localStorage.setItem("PAID_"+_to, "PAID");
	            });
	          }else{
	            console.log(err);
	          }

	        });
    }


