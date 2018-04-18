pragma solidity ^0.4.16;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }


contract UserContainer {
    
    address public owner;
    
    modifier onlyOwner(){if(msg.sender!=owner) throw;_;}
    
    
    function UserContainer(){
        owner = msg.sender;
    }
    
    
    mapping (uint256 => address) saveAddr;
    mapping (address => UserMainInfo) userMainInfo;
    
    address [] res;
    
    uint256 idx = 0;
    
    event LogSaceAddr(uint256  idx, address newAddr);
    
    function insertAdd (address _addr) onlyOwner{
        saveAddr[idx] = _addr;
        LogSaceAddr(idx, saveAddr[idx]);
        idx ++;
        

    }
    
    function getIndex () constant returns (uint256){
        return idx;
    }
    
    function getAddr(uint256 start, uint256 end) constant returns (address []){
        
        for(uint256 i = start ; i< end; i++){
            
            
            address addr = saveAddr[i];
            res.push(addr);
            LogSaceAddr(i, res[i]);    
        }
        
        return res;
    }
    
}





contract Admin{
    
    address public owner;
    
    event TransferOwnership(address  _addr, address newAddr);
    
    modifier onlyOwner() {if(msg.sender!=owner) throw;_;}

    
    //Generater
    function Admin(){
        owner = msg.sender;
    }
    
    function transferOwnership(address newOwenr) onlyOwner{
        address oldOwner = owner;
        owner = newOwenr;
        TransferOwnership(oldOwner, newOwenr);
    }
    
    


}







contract UserPrivateInfo is Admin{
    
    mapping (address => PrivateInfo) private privateInfo;
    
    
    struct PrivateInfo{
        string certType;
        string certId;
        address[] voteRefuseCompanyAddr;
        address[] recruitingCompanyAddr;
    }

    function insertPrivateInfo(string _certType,
        string _certId,
        address[] _voteRefuseCompanyAddr,
        address[] _recruitingCompanyAddr){
            
            privateInfo[msg.sender].certType = _certType;
            privateInfo[msg.sender].certId =_certId;
            privateInfo[msg.sender].voteRefuseCompanyAddr =_voteRefuseCompanyAddr;
            privateInfo[msg.sender].recruitingCompanyAddr =_recruitingCompanyAddr;
    }
    function getPrivateInfo(address _addr) constant returns (string ,
        string ,
        address[] ,
        address[]){
        return (privateInfo[_addr].certType, privateInfo[_addr].certId, privateInfo[_addr].voteRefuseCompanyAddr, privateInfo[_addr].recruitingCompanyAddr);
    }
}




contract UserMainInfo is Admin{
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}
    
    mapping (address => bool) private initWrite;
    mapping (address => address) private ownerAddr;
    mapping (address => string) private picture;
    mapping (address => string) private name;
    mapping (address => string) private job;
    mapping (address => string) private company;
    mapping (address => address) private companyAccount;
    mapping (address => bytes32[]) private interestItem;
    mapping (address => uint256) private profileInfoAddr;
    mapping (address => uint256) private privateInfoAddr;
    mapping (address => uint8) private mvp;
    
    //check write time
    mapping (address => uint256) private updateTime;
    
    //when User First Assigned Service, call it
    function checkOwn(){
        if(initWrite[msg.sender] == false){
            ownerAddr[msg.sender] = msg.sender;
            initWrite[msg.sender] = true;
            mvp[msg.sender] = 50;
        }
    }
    
    function checkOwnAccount(address _addr) constant returns (address){
        return ownerAddr[_addr];
    }
    
    function insertMainInfo(string _picture, string _name, string _job, string _company, bytes32[] _interestItem) CertAddress{
            
            updateTime[msg.sender] = now;
            picture[msg.sender] = _picture;
            name[msg.sender] =_name;
            job[msg.sender] =_job;
            company[msg.sender] =_company;
            interestItem[msg.sender] =_interestItem;
    }
    
    
    function getMainInfo(address _addr) constant returns (string , string, string, uint8){
        return (picture[_addr], name[_addr], job[_addr], mvp[_addr]);
    }
    
    
    function getBasicInfo(address _addr) constant returns (string , string, string, string, bytes32[] ,uint256, uint8){
        return (picture[_addr], name[_addr], job[_addr], company[_addr], interestItem[_addr], updateTime[_addr], mvp[_addr]);
    }
    
    
}



contract UserProfileOptionalHistory is Admin{
    mapping (address => address) private ownerAddr;
    mapping (address => bool) private initWrite;
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}
    
    mapping (address => string) private educationHistory0;
    mapping (address => string) private educationHistory1;
    mapping (address => string) private educationHistory2;
    mapping (address => string) private educationHistory3;
    mapping (address => string) private educationHistory4;
    
    mapping (address => string) private careerHistory0;
    mapping (address => string) private careerHistory1;
    mapping (address => string) private careerHistory2;
    mapping (address => string) private careerHistory3;
    mapping (address => string) private careerHistory4;
    
    mapping (address => string) private achievements0;
    mapping (address => string) private achievements1;
    mapping (address => string) private achievements2;
    mapping (address => string) private achievements3;
    mapping (address => string) private achievements4;
    
    function UserProfileOptionalHistory(){
        owner=msg.sender;
    }
    
    function checkOwn(){
        if(initWrite[msg.sender] == false){
            ownerAddr[msg.sender] = msg.sender;
            initWrite[msg.sender] = true;
        }
    }
    
    function checkOwnAccount(address _addr) constant returns (address){
        return ownerAddr[_addr];
    }
    
    
    function insertAchievement(
        string _achievements0,
        string _achievements1,
        string _achievements2,
        string _achievements3,
        string _achievements4
        ) CertAddress{
        
        achievements0[msg.sender] = _achievements0;
        achievements1[msg.sender] = _achievements1;
        achievements2[msg.sender] = _achievements2;
        achievements3[msg.sender] = _achievements3;
        achievements4[msg.sender] = _achievements4;
    }
    function insertCareerHistory(
        string _careerHistory1,
        string _careerHistory2,
        string _careerHistory3,
        string _careerHistory4,
        string _careerHistory5
        ) CertAddress{
        
        careerHistory0[msg.sender] = _careerHistory1;
        careerHistory1[msg.sender] = _careerHistory2;
        careerHistory2[msg.sender] = _careerHistory3;
        careerHistory3[msg.sender] = _careerHistory4;
        careerHistory4[msg.sender] = _careerHistory5;
    }
    function insertEducationHistory(
        string _educationHistory0,
        string _educationHistory1,
        string _educationHistory2,
        string _educationHistory3,
        string _educationHistory4
        ) CertAddress{
        
        educationHistory0[msg.sender] = _educationHistory0;
        educationHistory1[msg.sender] = _educationHistory1;
        educationHistory2[msg.sender] = _educationHistory2;
        educationHistory3[msg.sender] = _educationHistory3;
        educationHistory4[msg.sender] = _educationHistory4;
    }
    
    function getEducationHistoryInfo(address _addr) constant returns (string,string,string,string,string){
        
        return (educationHistory0[_addr], educationHistory1[_addr], educationHistory2[_addr],educationHistory3[_addr],educationHistory4[_addr]);
    }
    function getCareerHistoryInfo(address _addr) constant returns (string,string,string,string,string){
        
        return (careerHistory0[_addr], careerHistory1[_addr], careerHistory2[_addr],careerHistory3[_addr],careerHistory4[_addr]);
    }
    function getAchievementHistoryInfo(address _addr) constant returns (string,string,string,string,string){
        
        return (achievements0[_addr], achievements1[_addr], achievements2[_addr],achievements3[_addr],achievements4[_addr]);
    }
}





contract UserProfileInfo is Admin{
    mapping (address => address) private ownerAddr;
    
    mapping (address => bool) private initWrite;
    mapping (address => bytes32[]) private educationHistory;
    mapping (address => bytes32[]) private careerHistory;
    mapping (address => bytes32[]) private achievements;
    
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}

    

    function UserProfileInfo(){
        owner=msg.sender;
    }
    
    function checkOwn(){
        if(initWrite[msg.sender] == false){
            ownerAddr[msg.sender] = msg.sender;
            initWrite[msg.sender] = true;
        }
    }
    
    function checkOwnAccount(address _addr) constant returns (address){
        return ownerAddr[_addr];
    }
    
    function insertProfileInfo(
        bytes32[] _educationHistory,
        bytes32[] _careerHistory,
        bytes32[] _achievements) CertAddress{
        
        educationHistory[msg.sender] = _educationHistory;
        careerHistory[msg.sender] =_careerHistory;
        achievements[msg.sender] =_achievements;

    }
    
    function getProfileInfo(address _addr) constant returns (bytes32[],bytes32[],bytes32[]){
        return (educationHistory[_addr], careerHistory[_addr], achievements[_addr]);
    }
}




contract UserFreeVision is Admin{
    mapping (address => address) private ownerAddr;
    mapping (address => bool) private initWrite;
    mapping (address => string) private freeVision;
    
    
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}

    function UserFreeVision(){
        owner=msg.sender;
    }
    function checkOwn(){
        if(initWrite[msg.sender] == false){
            ownerAddr[msg.sender] = msg.sender;
            initWrite[msg.sender] = true;
        }
    }
    function checkOwnAccount(address _addr) constant returns (address){
        return ownerAddr[_addr];
    }
    
    function insertUserFreeVision(
        string _freeVision) CertAddress{
        
        freeVision[msg.sender] = _freeVision;
    }
    
    function getUserFreeVision(address _addr) constant returns (string){
        return freeVision[_addr];
    }
}

contract UserHideAppendInfo is Admin{
    mapping (address => address) private ownerAddr;
    mapping (address => bool) private initWrite;
    mapping (address => string) private append0;
    mapping (address => string) private append1;
    mapping (address => string) private append2;
    mapping (address => string) private append3;
    mapping (address => string) private append4;
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}
    modifier ExceptMyAddress() {if(ownerAddr[msg.sender] == msg.sender) throw;_;}
    
    
    
    
    function UserHideAppendInfo(){
        owner=msg.sender;
        ownerAddr[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = 0x731A765DFF550d11B7C880Af145066BC1bDD3127;
        append0[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "[석사 논문]산업디자인과 Product의 한계와 역할.pdf";
        append1[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "[특허증],갤럭시 S6 AlwaysDisplay.pdf";
        append2[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "[상장]2016 서울시 장애인돕기 App공모전 동상";
        append3[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "";
        append4[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "";
    }
    function checkOwn(){
        if(initWrite[msg.sender] == false){
            ownerAddr[msg.sender] = msg.sender;
            initWrite[msg.sender] = true;
        }
    }
    function checkOwnAccount(address _addr) constant returns (address) {
        return ownerAddr[_addr];
    }
    
    function insertHideAppendInfo (string _append0,string _append1,string _append2,string _append3,string _append4) CertAddress{
        
        append0[msg.sender] = _append0;
        append1[msg.sender] = _append1;
        append2[msg.sender] = _append2;
        append3[msg.sender] = _append3;
        append4[msg.sender] = _append4;
        
    }
    
    function getUserHideAppendInfo(address _addr) constant returns (string,string,string,string,string){
        return (append0[_addr],append1[_addr], append2[_addr],append3[_addr],append4[_addr]);
    }
}


contract UserHideInfo is Admin{
    
    mapping (address => address) private ownerAddr;
    mapping (address => bool) private initWrite;
    mapping (address => uint) private value;
    mapping (address => int8) private estimateValue;
    mapping (address => uint) private openCount;
    
    mapping (address => string) private hint0;
    mapping (address => string) private hint1;
    mapping (address => string) private hint2;
    mapping (address => string) private hint3;
    mapping (address => string) private hint4;
    
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}
    modifier ExceptMyAddress() {if(ownerAddr[msg.sender] == msg.sender) throw;_;}
    
    function UserHideInfo(){
        owner=msg.sender;
    }
    function checkOwn(){
        if(initWrite[msg.sender] == false){
            ownerAddr[msg.sender] = msg.sender;
            initWrite[msg.sender] = true;
            openCount[msg.sender] = 0;
        }
    }
    function checkOwnAccount(address _addr) constant returns (address) {
        return ownerAddr[_addr];
    }
    
    function insertUserHideInfo (uint _value, string _hint0,string _hint1,string _hint2,string _hint3,string _hint4) CertAddress{
        
        value[msg.sender] = _value;
        hint0[msg.sender] = _hint0;
        hint1[msg.sender] = _hint1;
        hint2[msg.sender] = _hint2;
        hint3[msg.sender] = _hint3;
        hint4[msg.sender] = _hint4;
    }
    
    function updateEstimateValue(address _addr, int8 updatePm) ExceptMyAddress{
        estimateValue[_addr] +=updatePm;
    }
    
    function openCountUpdata(address _addr) private ExceptMyAddress{
        openCount[_addr] +=1;
    }
    
    
    function getUserHideInfo(address _addr) constant returns (uint,int,uint){
        return (value[_addr],estimateValue[_addr], openCount[_addr]);
    }
    function getUserHideInfoHint(address _addr) constant returns (string,string,string,string,string){
        return (hint0[_addr],hint1[_addr], hint2[_addr],hint3[_addr],hint4[_addr]);
    }
}




