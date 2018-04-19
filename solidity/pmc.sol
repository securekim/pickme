pragma solidity ^0.4.16;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }




contract TokenERC20 {
    
    address public owner;
    
    mapping (address => address) private ownerAddr;

    
    modifier onlyOwner() {if(msg.sender!=owner) throw;_;}
    modifier CertAddress() {if(ownerAddr[msg.sender] != msg.sender) throw;_;}
    
    string public name;
    string public symbol;
    uint8 public decimals = 8;
    uint256 public totalSupply;

    
    //my token balance
    mapping (address => uint256) public balanceOf;
    
    //my hide Info pmc
    mapping (address => uint) public pmHide;
    
    //blacklist, allowList
    mapping (address => address[]) private allowList;
    mapping (address => uint256) private allowIndex;
    mapping (address => address[]) private accessList;
    mapping (address => uint256) private accessIndex;
    mapping(address => uint256[]) private accessOpenDate;
    mapping(address => uint256[]) private allowOpenDate;
    
    
    mapping (address => address[]) private blackList;
    
    
    mapping (address => mapping (address => uint256)) public allowance;

    
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    /**
     * Constructor function
     */
    function TokenERC20() public {
        totalSupply = 100000000000000000;
        balanceOf[msg.sender] = totalSupply;                
        name = "Pick ME ERC20 Token";                                   
        symbol = "PMC";  
        owner = msg.sender;
        
        balanceOf[0x6F213A598Be7058a4248eaf0a2593210Fa8B71c3] = 10000000;//scouter
        balanceOf[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = 300;//choi yoo jung
        
        pmHide[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = 250;//choi yoo jung hide value
        address addr = 0x6F213A598Be7058a4248eaf0a2593210Fa8B71c3;//scouter 
        address company = 0xcf1EcAC3Fa57d8844B6195cC21b7b5Ac6a0CB185; //company
        
        
        append0[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "hideInfo0.appendFile";
        append1[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "hideInfo1.appendFile";
        append2[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "hideInfo2.appendFile";
        append3[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "hideInfo3.appendFile";
        append4[0x731A765DFF550d11B7C880Af145066BC1bDD3127] = "hideInfo4.appendFile";
        
        
        
        scouterYn[addr] = true;//yoo jae suk ok
        scouterCompany[addr] = company;
        
    }



    function trasferOpenHideInfo(address _from,address _to, uint _value) public payable {
        require(_to != 0x0);
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        require(_value >= pmHide[_to]);
        
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        Transfer(_from, _to, _value);
        
        
        //choi yoo jung allow index
        
        //yoo jae suk access index
        uint256 accessIdx = accessIndex[_from];
        
        
        allowList[_to].push(_from);
        allowOpenDate[_to].push(now);
        allowIndex[_to]++;
        
        
        accessList[_from].push(_to);
        accessOpenDate[_from].push(now);
        accessIndex[_from]++;
        

        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }  
    function getScouterOpenAddressList(address _addr) constant returns (address[], uint256[]){

        return ( accessList[_addr], accessOpenDate[_addr]);
    }
    function getUserAllowList(address _addr) constant returns (address[], uint256[]){

        return ( allowList[_addr], allowOpenDate[_addr]);
    }
    
    
    
    
    function checkOwn(address _addr) onlyOwner{
        ownerAddr[_addr] = _addr;
    }
    function checkOwnAccount(address _addr) constant returns (address){
        return ownerAddr[_addr];
    }
    function setHidePMC(uint _value) CertAddress{
        pmHide[msg.sender] = _value;
    }
     
    function getBlackList(address _addr) constant returns (address[]){
         return blackList[_addr];
     }
     
    /**
     * Internal transfer, only can be called by this contract
    */
    function _transfer(address _from, address _to, uint _value) public payable {
        
        require(_to != 0x0);
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        
        Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);

    }

    /**
     * Transfer tokens
     */
    function transfer(address _to, uint256 _value) public payable{
        _transfer(msg.sender, _to, _value);
    }

    /**
     * Transfer tokens from other address
     *
     * Send `_value` tokens to `_to` on behalf of `_from`
     *
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transferFrom(address _from, address _to, uint256 _value) public payable returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    function approve(address _spender, uint256 _value) public
        returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    /**
     * Set allowance for other address and notify
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf, and then ping the contract about it
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     * @param _extraData some extra information to send to the approved contract
     */
    function approveAndCall(address _spender, uint256 _value, bytes _extraData)
        public
        returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }

    /**
     * Destroy tokens
     *
     * Remove `_value` tokens from the system irreversibly
     *
     * @param _value the amount of money to burn
     */
    function burn(uint256 _value) public onlyOwner returns (bool success) {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        Burn(msg.sender, _value);
        return true;
    }

    /**
     * Destroy tokens from other account
     *
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public onlyOwner returns (bool success) {
        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);    // Check allowance
        balanceOf[_from] -= _value;                         // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
        totalSupply -= _value;                              // Update totalSupply
        Burn(_from, _value);
        return true;
    }
    
    
    
    mapping(address => bool) private scouterYn;
    mapping(address => address) private scouterCompany;
    

    event CheckBool(address addr, bool boolPara);
    event CheckIdx(uint256 idx);
    event CheckOpenAddress(address[] openAddress);
    event CheckOpendate(uint256[] openDate);
    
    
    function isScouterYn(address _addr) constant returns (bool){
        return scouterYn[_addr];
    }
    
    function addScouter(address _addr, address company) onlyOwner{
        scouterYn[_addr] = true;
        scouterCompany[_addr] = company;
    }
    function deleteScouter(address _addr) onlyOwner{
        scouterYn[_addr] = false;
    }
    
    
    
    
    
    
    mapping (address => string) private append0;
    mapping (address => string) private append1;
    mapping (address => string) private append2;
    mapping (address => string) private append3;
    mapping (address => string) private append4;





    
    function getHideInfoOther(address scouter, address user) constant returns (string,string,string,string,string) {
        

        
        uint256 size = accessList[scouter].length;
        
        address[] comp = accessList[scouter];
        uint256[] date = accessOpenDate[scouter];
        
        for(uint256 i = 0; i< size; i++){
            if(comp[i] == user) return (append0[user],append1[user], append2[user],append3[user],append4[user]);
        }
        
        return;
    }
    
    function insertHideAppendInfo (string _append0,string _append1,string _append2,string _append3,string _append4) {
        
        append0[msg.sender] = _append0;
        append1[msg.sender] = _append1;
        append2[msg.sender] = _append2;
        append3[msg.sender] = _append3;
        append4[msg.sender] = _append4;
        
    }
    function getUserHideAppend(address _addr) constant returns (string,string,string,string,string){
        if(msg.sender != _addr) return;
        
        return (append0[_addr],append1[_addr], append2[_addr],append3[_addr],append4[_addr]);
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
