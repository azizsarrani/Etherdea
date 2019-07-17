pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2; //to return ideatype

import "/Users/omamah/Etherdea/Etherdea/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract Idea is ERC721 {
    struct idea{
        uint id;
        string ideaType;
        string content;
        string category;
        uint initialValue;
        uint actualValue;
        bool setForSale;
        }

    uint ideaIdCounter=0;
    idea[] ideas;//the array that contain all of the ideas

    function getSender () public view returns(address){
    return msg.sender;
    }
    function addIdea( string memory _ideaType, string memory _content, string memory _category, uint _initialValue, bool _setForSale) public {
        require(!_exists(ideaIdCounter),"IDEA CONTRACT ERROR: Idea ID already exists");
        _mint(msg.sender, ideaIdCounter);
        //the actualValue will be 0 at first
        idea memory newIdea = idea(ideaIdCounter, _ideaType, _content,_category, _initialValue,0, _setForSale);
        ideas.push(newIdea);
        ideaIdCounter++;
    }




    function getIdea(uint _id)public view returns(Idea memory){
        require(_id > 0,"IDEA CONTRACT ERROR: Idea ID cann't be negitive value");
        for (uint i = 0; i<ideas.length; i++){
            if(ideas[i].id == _id){
                return ideas[i];
            }
          }
        }

    // function getIdeas () public view returns (Idea[] memory){
    //     return ideas;
    // }


    // function increaseActualValue(uint _id) public {
    //     ideas[_id].actualValue += uint(0.0001);
    // }


    // function setIdeaForSale(uint _ideaId,bool _setForsale) public{
    //     ideas[_ideaId].setForSale = _setForsale;
    // }

    // function buyIdea (uint _ideaId) public payable returns(bool success) {
    //     require(_exists(_ideaId), "IDEAS CONTRACT ERROR: There is no idea with this id");
    //     if(msg.sender.send(ideas[_ideaId].initialValue)){
    //         safeTransferFrom(ownerOf(_ideaId), msg.sender, _ideaId);
    //         success = true;}
    //     else
    //         success = false;


    // }

  }







