pragma solidity ^0.5.0;

import "node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract Idea is ERC721 {
    struct Idea{
        uint id;
        string ideaType;
        string content;
        string category;
        uint initialValue;
        uint actualValue;
        bool setForSale;
        }


    Idea[] ideas;//the array that contain all of the ideas 
    






    function addIdea(uint _id, string _ideaType, string _content, string _category, uint _initialValue , bool _setForSale) public {
        require(_id > 0,"IDEA CONTRACT ERROR: Idea ID cann't be negitive value");
        require(!_exists(_id),"IDEA CONTRACT ERROR: Idea ID already exists");
        _mint(msg.sender, _ideaId);
        Idea newIdea = Idea(_id, _ideaType, _content,_category, _initialValue,0, setForSale);//the actualValue will be 0 at first 
        ideas.push(newIdea);
    }

    

    function getIdea(uint _id)public view returns(Idea){
        require(_id > 0,"IDEA CONTRACT ERROR: Idea ID cann't be negitive value");
        for (int i = 0; i<ideas.length;i++){
            if(ideas[i]==_id){
                return ideas[i];
            }
          }
        }

    function getIdeas () public view returns (Idea[]){
        return ideas;
    }


    function increaseActualValue(uint _id) public {
        ideas[_id].actualValue += 0.0001;
    }

    function buyIdea (uint _ideaId) public{
        require(exist(_ideaId), "IDEAS CONTRACT ERROR: There is no idea with this id");
       safeTransferFrom(ownerOf(_ideaId), msg.sender, _ideaId);
    }

    function setIdeaForSale(uint _ideaId,bool _setForsale) public{
        ideas[ideaId].setForSale = _setForsale;
    }


    }






//  function ownerOf(uint256 _ideaId) public view returns (address) {
//      ownerOf(_ideaId);
//  }

