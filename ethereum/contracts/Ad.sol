pragma solidity >=0.5.0 <0.7.0;

contract AdFactory {
    Ad[] public deployedAds;

    function createAd(string memory name ,uint price , string memory desc,string memory loc,uint con) public {
        Ad newAd = new Ad(name, msg.sender,price,desc,loc,con);
        deployedAds.push(newAd);
    }

    function getDeployedAds() public view returns(Ad[] memory) {
        return deployedAds;
    }
}

contract Ad {
    
    string public name;
    address public manager;
    uint public priceQuoted;
    string public description;
    string public location;
    uint public contact;

    constructor(string  memory creaname ,address crea, uint price, string  memory desc, string memory loc, uint con ) public {
        name = creaname;
        manager = crea;
        priceQuoted = price;
        description = desc;
        location = loc;
        contact = con;
    }

    function getPriceQuoted() public returns(uint) {
        return priceQuoted;
    }

    function buyProduct() public payable {
        require(
            msg.value >= priceQuoted,
            "priceQuoted violated"
        );
    }

    

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the Ad manager can call this function."
        );
        _;
    }
}
