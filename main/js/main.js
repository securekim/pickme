
var oTbl;
//Row 추가
function insRow() {
  oTbl = document.getElementById("addTable");
  var oRow = oTbl.insertRow();
  oRow.onmouseover=function(){oTbl.clickedRowIndex=this.rowIndex}; //clickedRowIndex - 클릭한 Row의 위치를 확인;
  var oCell = oRow.insertCell();

/*


                                      <table id="addTable" width="350px" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" border="0">
                                        <tr>
                                          <td>
                                            <input type="text" name="addText" style="width:300px; height:30px;">
                                          </td>
                                          <td rowspan="2">
                                              <button class="btn btn-outline-info my-2 my-sm-0" type=button value="추가" onClick="insRow()" style="cursor:hand; height:50px;">+</button>
                                          </td>
                                        </tr>
                                        <tr style="padding-bottom:10px;">
                                          <td style="padding-top:10px;">
                                            <input type="text" name="addText" style="width:300px; height:30px;">
                                            </td>
                                        </tr>
                                      </table>
*/


  //삽입될 Form Tag
  var frmTag = '<input type=text name=addText style="width:300px; height:30px;"> ';
  frmTag += '<button class="btn btn-outline-danger my-2 my-sm-0" type=button value="삭제" onClick="removeRow()" style="cursor:hand; height:50px;">X</button>';
  frmTag += '<input type=text name=addText style="width:300px; height:30px;">'
  oCell.innerHTML = frmTag;
}
//Row 삭제
function removeRow() {
  oTbl.deleteRow(oTbl.clickedRowIndex);
}

function frmCheck()
{
  var frm = document.form;
  
  for( var i = 0; i <= frm.elements.length - 1; i++ ){
     if( frm.elements[i].name == "addText" )
     {
         if( !frm.elements[i].value ){
             alert("Input Text Box!");
                 frm.elements[i].focus();
	 return;
          }
      }
   }
 }
 