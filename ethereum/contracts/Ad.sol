pragma solidity >=0.5.0 <0.7.0;

contract AdFactory {
    Ad[] public deployedAds;

    function createAd(string name,uint price, string desc,string loc,uint con) public {
        Ad newAd = new Ad(name, msg.sender,price,desc,loc,con);
        deployedAds.push(newAd);
    }

    function getDeployedAds() public view returns(Ad[] memory) {
        return deployedAds;
    }
}

contract Ad {
    
    string name;
    address public manager;
    uint public priceQuoted;
    string description;
    string location;
    uint contact;

    constructor(string creaname,address crea,uint price,string desc, string loc,uint con) public {
        name = creaname;
        manager = creator;
        minimumContribution = minimum;
        description = desc;
        location = loc;
        contact = con;
    }

    function buyProduct() public payable {
        require(
            msg.value >= minimumContribution,
            "A minumum contribution is required."
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
