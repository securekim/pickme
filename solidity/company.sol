pragma solidity ^0.4.16;

contract CompanyContainer{
    address public owner;
    
    address[] private companyList;
    
    uint index = 0;
    mapping(address => uint) companyListIndex;
    
    event transferOwner(address oldOwner, address newOwenr);
    
    modifier onlyOwner(){if(msg.sender!=owner) throw;_;}
    
    
    function CompanyContainer(){
        owner = msg.sender;
    }
    
    function insertCompany(address newUser) onlyOwner{
        companyList.push(newUser);
    }
    
    function deleteCompany(address deleteUser) onlyOwner{
        //userList[userListIndex[deleteUser]] = 0x00;
    }
    
    function getCompanyList() constant public returns (address[]){
        return companyList;
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



contract CompanyMainInfo is Admin{
    mapping (address => string) private picture;
    mapping (address => string) private name;
    mapping (address => string) private category;
    mapping (address => uint256) private updateTime;
    mapping (address => int256) private cvp;
    
    
    function insertCompanyMainInfo(address _addr, string _picture, string _name, string _category, int256 _value ) onlyOwner{
            
            updateTime[_addr] = now;
            picture[_addr] = _picture;
            name[_addr] =_name;
            category[_addr] = _category;
            cvp[_addr] = _value;
    }
    
    function getCompanyMainInfo(address _addr) constant returns (string, string, string, uint256, int256){
        return (picture[_addr], name[_addr],  category[_addr], updateTime[_addr], cvp[_addr]);
    }
}



contract CompanyDetailInfo{
    address public owner;
    mapping (address => address) private ownerAddr;
    modifier onlyOwner() {if(msg.sender!=owner) throw;_;}


        
    mapping (address => uint256) public employeeNum;
    mapping (address => string) public openDate;
    mapping (address => string) public companyType;
    mapping (address => string) public homepage;
    mapping (address => string) public logoImg;
    mapping (address => string) public feedImg;
    
    mapping (address => address[]) public recruitList;
    
    
    function addCompanyDetailInfo(address _addr, uint256 _employeeNum, string _openDate, string _companyType, string _homepage, string _logoImg, string _feedImg) onlyOwner{
        employeeNum[_addr]=_employeeNum;
        openDate[_addr]=_openDate;
        companyType[_addr]=_companyType;
        homepage[_addr]=_homepage;
        logoImg[_addr]=_logoImg;
        feedImg[_addr]=_feedImg;
        
    }
    
    function getCompanyDetailInfo(address _addr) constant returns(uint256,string,string,string,string,string, address[]){
        return(employeeNum[_addr],openDate[_addr],companyType[_addr],homepage[_addr],logoImg[_addr],feedImg[_addr],recruitList[_addr]);
    }
    
    function CompanyDetailInfo(){
        owner = msg.sender;
    }
    
    function addRecruitList(address recruitContractAddr, address companyAddr) onlyOwner{
        recruitList[companyAddr].push(recruitContractAddr);
    }
    
    function getRecruitList(address _addr) constant returns (address[]){ 
        return recruitList[_addr];
    }
}








contract Recruit{
    
    address public owner;
    mapping (address => address) private ownerAddr;
    modifier onlyOwner() {if(msg.sender!=owner) throw;_;}
    
    address public company;
    
    string public title;
    string public interestCate;
    string public recruitType;
    string public minEducational;
    string public preferentialTreatment;
    string public workType;
    string public paymentIndex;
    string public posibleWorkLocation;
    string public careerLimit;
    uint256 public startTime;
    uint256 public endTime;
    string public decription;
    bool public endStatus;
    
    function Recruit(){
        owner = msg.sender;
    }
    
    function updateRecruitInfo(
        address  _company,
        string  _title,
        string  _interestCate,
        string  _recruitType,
        string  _minEducational,
        string _careerLimit,
        string  _preferentialTreatment,
        string  _workType,
        string  _paymentIndex,
        string  _posibleWorkLocation,
        uint256  _startTime,
        uint256  _endTime,
        string _decription
        ) onlyOwner{
            

        company = _company;
        title = _title;
        interestCate = _interestCate;
        recruitType = _recruitType;
        minEducational = _minEducational;
        careerLimit =_careerLimit;
        preferentialTreatment = _preferentialTreatment;
        workType = _workType;
        paymentIndex = _paymentIndex;
        posibleWorkLocation = _posibleWorkLocation;
        startTime =_startTime;
        endTime =_endTime;
        decription=_decription;
    }
    
    function updateEndStatus() onlyOwner{
        endStatus = true;
    }
    
    function getRecruitInfoUp() constant returns( string ,string  ,string  ,string  ,string ,string ){
        return(title ,interestCate ,recruitType, minEducational, careerLimit, preferentialTreatment);
    }
    
    function getRecruitInfoBottom() constant returns( string  ,string  ,string  ,uint256  ,uint256  ,string ){
        return(workType, paymentIndex, posibleWorkLocation, startTime, endTime ,decription);
    }
}


contract RecruitMember{
    
    address public owner;
    mapping (address => address) private ownerAddr;

    function checkOwn(address _addr) onlyOwner{
        ownerAddr[_addr] = _addr;
    }
    function checkOwnAccount(address _addr) constant returns (address){
        return ownerAddr[_addr];
    }
    
    
    modifier onlyOwner() {if(msg.sender!=owner) throw;_;}
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}
    
    
    
    
    mapping(address => address[]) myRecruitList;
    mapping(address => RecruitMemberDetailInfo) detailInfo;
    
    
    function addRecruit(address scouter , address user, address recruitContract){
        
    }
    
    
}


contract RecruitMemberDetailInfo{
    address private scouter;
    address private user;
    
    address private companyRecruitAddr;
    
    string private meetingDate;
    string private meetingTime;
    string private meetingPlace;
    string private meetingPlaceUrl;
    string private emergencyPhoneNumber;
    
    uint private recruitYn = 0;
    // 0 - ing, 1 - quit, 2 - yes, 3 - sorry
    
}




