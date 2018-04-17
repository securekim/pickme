
var PEOPLES="";
var PEOPLESDETAIL=[];

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

  var td3 = document.createElement('td');
    tr2.appendChild(td3);  

  var frmTag3 = '<input type=text name=addText style="width:300px; height:30px;" placeholder="Content URL">';
    td3.innerHTML=frmTag3;  


}

function deletePrivateContent(td) {
  console.log(td.parent().parent().parent().parent().remove());
}


function addJumbotronToMain(name, context, imageURL, number){
  var main = document.getElementById("main");
  
  var jumbotron = document.createElement('div');
    jumbotron.className = "jumbotron";
    main.appendChild(jumbotron);

  var table = document.createElement('table');
    jumbotron.appendChild(table);

  var td1 = document.createElement('td');
    td1.style = "padding:20px";
    table.appendChild(td1);

  var image = '<img src="'+imageURL+'" alt="'+name+'" height="120" width="120"></img>';
    td1.innerHTML=image;

  var td2 = document.createElement('td');
    td2.style = "vertical-align:middle";
    table.appendChild(td2);
    
  var h4 = document.createElement('h4');
    td2.appendChild(h4);

  var myContext = '['+name+'] <p class="lead">'+context+'</p>';
    h4.innerHTML=myContext;

  var a = document.createElement('button');
    a.className = "btn btn-lg btn-primary";
    a.href="#"
    a.setAttribute("data-target","#profileModal");
    a.setAttribute("data-toggle","modal");
    a.setAttribute("onclick","updatePeopleModal("+number+")");
    a.innerHTML = "View Detail";
    td2.appendChild(a);
}

function removeAllJumbotrons(){
  var myNode = document.getElementById("main");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
}


function updatePeopleModal(number){
  var items = PEOPLES[number].items
  document.getElementById('modalPeopleName').innerText=items.name;
  document.getElementById('modalPeopleImg').setAttribute("src",items.picture);
  var modalPeopleInfo = document.getElementById('modalPeopleInfo');
  while (modalPeopleInfo.firstChild) {
    modalPeopleInfo.removeChild(modalPeopleInfo.firstChild);
  }
  var h3 = document.createElement('h3');
    h3.className = "media-heading";
    modalPeopleInfo.appendChild(h3);

  var frm = 'PMC<span id="peoplePMC" class="glyphicon glyphicon-fire"></span>'+items.mvp
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
      frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.educationHistory[i]+"<br>";
    }
    frm+="<p></p>";
    for (var i in PEOPLESDETAIL[number].profileInfo.careerHistory){
      frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.careerHistory[i]+"<br>";
    }
    frm+="<p></p>";
    for (var i in PEOPLESDETAIL[number].profileInfo.achievements){
      frm += "&nbsp;"+PEOPLESDETAIL[number].profileInfo.achievements[i]+"<br>";
    }
    modalPeoplePublicInfo.innerHTML = frm;

    document.getElementById('modalPeopleBio').innerHTML = "<strong>Free Vision: </strong><br>" +PEOPLESDETAIL[number].freeVision;

    var modalPeoplePrivateInfo = document.getElementById("modalPeoplePrivateInfo");
    frm = "<strong>Private Info : </strong><br>"
    for (var i in PEOPLESDETAIL[number].hideInfo.hideInfoHint){
      frm += "&nbsp;"+PEOPLESDETAIL[number].hideInfo.hideInfoHint[i]+"<br>";
    }
    modalPeoplePrivateInfo.innerHTML = frm;
    //frm += &nbsp;


}
function dummyPeople(){
  removeAllJumbotrons();
  //http://cfile5.uf.tistory.com/image/99E8E33359DB49394B6E66
  addJumbotronToMain("휴지", "Security 전문가입니다.", "http://cfile5.uf.tistory.com/image/99E8E33359DB49394B6E66","http://blog.securekim.com");
  addJumbotronToMain("보겸", "SW Engineer 지원 중입니다.", "http://image.hankookilbo.com/i.aspx?Guid=0b2feec797064d63a86c6b9bdedfb4d7&Month=201602&size=640","http://blog.securekim.com");
  addJumbotronToMain("소련", "Server Engineer 입니다!", "https://www.fashionseoul.com/wp-content/uploads/2017/02/20170217_sul-3.jpg","http://blog.securekim.com");
}

function dummyCompany(){
  removeAllJumbotrons();
  addJumbotronToMain("Samsong", "We Are The Samsong Electronics", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com");
  addJumbotronToMain("SKI", "Happy, Supex with SK I", "https://d50gait2982zr.cloudfront.net/wp-content/uploads/2017/08/sb3-logo-1c-blue-p289-rgb.svg","http://blog.securekim.com"); 
  addJumbotronToMain("Blchess", "We seek 3 Students. ", "https://openclipart.org/download/214574/lego3.svg","http://blog.securekim.com");
}

function dummyPickme(){
  removeAllJumbotrons();
  addJumbotronToMain("SKI", "We seek 2 Server Engineers", "https://d50gait2982zr.cloudfront.net/wp-content/uploads/2017/08/sb3-logo-1c-blue-p289-rgb.svg","http://blog.securekim.com");
  addJumbotronToMain("SKI", "We seek 3 SW Engineers", "https://d50gait2982zr.cloudfront.net/wp-content/uploads/2017/08/sb3-logo-1c-blue-p289-rgb.svg","http://blog.securekim.com");
  addJumbotronToMain("Samsong", "We seek 1 Marketers. ", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com");
  addJumbotronToMain("Samsong", "We seek 3 Security Engineer. ", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com");
  addJumbotronToMain("Samsong", "We seek 2 Project Manager. ", "https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg","http://blog.securekim.com");
  addJumbotronToMain("Blchess", "We seek 3 Students. ", "https://openclipart.org/download/214574/lego3.svg","http://blog.securekim.com");
  addJumbotronToMain("Blchess", "We seek 1 Manager. ", "https://openclipart.org/download/214574/lego3.svg","http://blog.securekim.com");
  
}
  


/////////////////////////////

function drawPeople(){
  removeAllJumbotrons();
  if(PEOPLES==""){
    PEOPLES = initUser();
    PEOPLES = PEOPLES.replace(/'/g, '"');
    PEOPLES = JSON.parse(PEOPLES);
  }
  for(var i in PEOPLES){
    if(PEOPLES[i].items["name"] != ""){
      var company =  PEOPLES[i].items["company"] == "" ? "" : "'"+PEOPLES[i].items["company"]+"' 에 재직중인 "
      var job =  PEOPLES[i].items["job"] == "" ? "구직자 입니다." : "'"+PEOPLES[i].items["job"]+"' 입니다."
      addJumbotronToMain(PEOPLES[i].items["name"], company + job, PEOPLES[i].items["picture"],i);
    }
  }
  for(var i in PEOPLES){
    if(PEOPLES[i].items["name"] != ""){
     PEOPLESDETAIL[i] = getDetailProfile(PEOPLES[i].account);
     PEOPLESDETAIL[i] = PEOPLESDETAIL[i].replace(/'/g, '"');
     PEOPLESDETAIL[i] = JSON.parse(PEOPLESDETAIL[i]);
      for(var j in PEOPLESDETAIL[i].profileInfo.careerHistory){
        PEOPLESDETAIL[i].profileInfo.careerHistory[j] = hexToString(PEOPLESDETAIL[i].profileInfo.careerHistory[j]);
      }
      for(var j in PEOPLESDETAIL[i].profileInfo.achievements){
        PEOPLESDETAIL[i].profileInfo.achievements[j] = hexToString(PEOPLESDETAIL[i].profileInfo.achievements[j]);
      }
      for(var j in PEOPLESDETAIL[i].profileInfo.educationHistory){
        PEOPLESDETAIL[i].profileInfo.educationHistory[j] = hexToString(PEOPLESDETAIL[i].profileInfo.educationHistory[j]);
      }
      for(var j in PEOPLESDETAIL[i].hideInfo.hideInfoHint){
        PEOPLESDETAIL[i].hideInfo.hideInfoHint[j] = hexToString(PEOPLESDETAIL[i].hideInfo.hideInfoHint[j]);
      }
    }
  }


}

//   }

// }






//////////////////////////////

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/TvuMDSQ9QbgjPihMgjvZ'));


//사용자 관련
userContainerContractAddress = "0xb0968e080c3e3758c37cbeb09b10e18ace212440";
userBasicInfoContractAddress = "0xf604df3b28d18922607f3f0627c39de107f6e20b"
userProfileContractAddress = "0xd81b8ee46f06ccce3ac700d3e277f0bdede6f19c";
userFreevisionContractAddress = "0x24d6d4a0285b639d42529964c4322d98172beece";
userHideInfoContractAddress = "0x773ae136f1e9047c545dfc290636c5e92837d151";

//관심해시태그 관련
interestContainerContractAddress = "0xbf7cf53298ca1001812832c7e857bb2bef667be7";

//PM Token 관련
pmTokenContractAddress = "0xdc76436a668158c0e785613a740a4a5cc35b2e48";


//사용자 메인 리스트에 보여줄 아이템
function initUser() {
    
    var resList = new Array() ;

    userContainer = web3.eth.contract(userContainerAbi).at(userContainerContractAddress);
    var data = userContainer.getUserList.call();

    for(i=0;i<data.length;i++){
        userBasicInfo = web3.eth.contract(userMainAbi).at(userBasicInfoContractAddress);
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


var data = userProfileContract.getProfileInfo(_addr);
var vision = userFreeVisionContract.getUserFreeVision(_addr);
var hideInfo = userHideInfoContract.getUserHideInfo(_addr);

var profileInfoItem = new Object();
profileInfoItem.educationHistory = data[0];
profileInfoItem.careerHistory = data[1];
profileInfoItem.achievements = data[2];

var hideInfoItem = new Object();
hideInfoItem.hideInfoValue = hideInfo[0];
hideInfoItem.estimateValue = hideInfo[1];
hideInfoItem.openCount = hideInfo[2];
hideInfoItem.hideInfoHint = hideInfo[3];


item.profileInfo = profileInfoItem;
item.freeVision = vision;
item.hideInfo = hideInfoItem;
var jsonResult = JSON.stringify(item);
    return jsonResult;
}


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


function getPMCBalance(addr){
pmcTokenContract = web3.eth.contract(pmcTokenAbi).at(pmTokenContractAddress);
balance = pmcTokenContract.balanceOf(addr).toNumber();
return balance;
}



//비공개 정보 보기위해 토큰 전달
function sendPmcForOpenHideInfo(gas, value, _to, _from, priKey){
contractAddress = pmTokenContractAddress;
pmcTokenContract = web3.eth.contract(pmcTokenAbi).at(contractAddress);

var count = web3.eth.getTransactionCount(_from);
const gasPriceHex = web3.toHex(gas*1000000000);
gasLimitHex = web3.toHex(66029);
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
        console.log(hash);
        //sendMessage(hash);
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

  companyContainer = web3.eth.contract(companyContainerAbi).at("0x3bb0cdbe30a886ca5b3f301249fdbbb9da20e833");
  var data = companyContainer.getCompanyList.call();

  for(i=0;i<data.length;i++){
        companyMainInfo = web3.eth.contract(companyMainAbi).at("0x0c7b3bb247553a0e2b86a75953ff109aed68ec63");
        var companyMainItem = companyMainInfo.getCompanyMainInfo(data[i]);

        var item = new Object() ;
        item.account = data[i] ;
        item.items = companyMainItem;

        resList.push(item);
    }

    var jsonResult = JSON.stringify(resList);

    return jsonResult;
}
//회사 메인 리스트에 보여줄 아이템
function getCompanyMainList2(){

  var resList = new Array() ;

  companyContainer = web3.eth.contract(companyContainerAbi).at("0x3bb0cdbe30a886ca5b3f301249fdbbb9da20e833");
  var data = companyContainer.getCompanyList.call();

  for(i=0;i<data.length;i++){
        companyMainInfo = web3.eth.contract(companyMainAbi).at("0x9b022b7aa44580b1047e1a278a9abcc738ca12b0");
        var companyMainItem = companyMainInfo.getCompanyMainInfo(data[i]);

        var item = new Object() ;
        item.account = data[i] ;
        item.items = companyMainItem;

        resList.push(item);
    }

    var jsonResult = JSON.stringify(resList);

    return jsonResult;
}
