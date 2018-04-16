
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


//<div class="jumbotron">
//<table>
//  <td style="padding:20px">
//    <img src="https://openclipart.org/download/214574/lego3.svg" alt="BLCHES" height="120" width="120"></img>
//  </td>
//  <td>
//    <h4>[BLCHES]
//        <p class="lead">We Seek Just a student ! Contact to :</p>
//      </h4>
//    <a class="btn btn-lg btn-primary" href="http://blog.securekim.com" role="button">Contract</a>
//  </td>
//</table>
//</div> -->

//addJumbotronToMain("Samsong", "We seek 3 Engineers", "http://blog.securekim.com","https://direct.rhapsody.com/imageserver/images/Alb.279606691/500x500.jpg");

function addJumbotronToMain(name, context, imageURL, link){
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

  var a = document.createElement('a');
    a.className = "btn btn-lg btn-primary";
    if(typeof link != 'undefined' && link!=null)
      a.href = link;
    a.innerHTML = "Contract";
    td2.appendChild(a);
}

function removeAllJumbotrons(){
  var myNode = document.getElementById("main");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
}


function dummyPeople(){
  removeAllJumbotrons();
  //http://cfile5.uf.tistory.com/image/99E8E33359DB49394B6E66
  addJumbotronToMain("후지", "Security 전문가입니다.", "http://cfile5.uf.tistory.com/image/99E8E33359DB49394B6E66","http://blog.securekim.com");
  addJumbotronToMain("보겸", "SW Engineer 지원 중입니다.", "http://image.hankookilbo.com/i.aspx?Guid=0b2feec797064d63a86c6b9bdedfb4d7&Month=201602&size=640","http://blog.securekim.com");
  addJumbotronToMain("소련", "Server Engineer 입니다!", "https://www.fashionseoul.com/wp-content/uploads/2017/02/20170217_sul-3.jpg","http://blog.securekim.com");
  addJumbotronToMain("원비", "뽑아주실거죠?", "http://cdn.namuwikiusercontent.com/s/720667d4b7f02c91ca55413ba4bb15d39d891ff69c7edce51584890a65f9fa3f73c38150b3075fc6e3969c603f1a8c30d2a8df19416d18fe0e5c86c79070f02ede3cc3383230d99398bf82d10fc86c49?e=1525295001&k=-W0zLzBcvD78iU-LBpqB9A","http://blog.securekim.com");
  
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
  