App = {

  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },


  initContract: function() {
    $.getJSON('Idea.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Idea = data;
      App.contracts.Idea = TruffleContract(Idea);

      // Set the provider for our contract.
      App.contracts.Idea.setProvider(App.web3Provider);
      console.log(App.web3Provider);
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log("Error:"+ error);
        }
  
        var account = accounts[0];
        console.log(accounts)
        console.log(account)


      // Use our contract to retieve all ideas HERE
      //return App.getBalances();
    });
  });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#addIdeaBtn', App.handleAdding);
  },

  handleAdding: function(event) {
    event.preventDefault();

    const initialValue = parseInt($('#initialValue').val());
    const ideaType = $('#ideaType').val();
    const setForSale =$( "input[type=radio][name=references]:checked" ).val(); 
    const content = $('NicEdit').val();
    const title = $('#title').val();

    console.log("initial value"+initialValue +"\n ideaType "+ideaType + "\n setForsale"+ setForSale +"\n \n \n content "+content+"\n \n title "+title);

    var ideaInstance;

      App.contracts.Idea.deployed().then(function(instance) {
        ideaInstance = instance;
        let sender=ideaInstance.getSender()
        console.log(sender);
        return ideaInstance.addIdea(ideaType.toString(),"content" ,title.toString()  , initialValue, setForSale );
      }).then(function(result) {
        alert('Added Successful!');
        //return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
  }

  // getBalances: function() {
  //   console.log('Getting balances...');

  //   var tutorialTokenInstance;

  //   web3.eth.getAccounts(function(error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.TutorialToken.deployed().then(function(instance) {
  //       tutorialTokenInstance = instance;

  //       return tutorialTokenInstance.balanceOf(account);
  //     }).then(function(result) {
  //       balance = result.c[0];

  //       $('#TTBalance').text(balance);
  //     }).catch(function(err) {
  //       console.log(err.message);
  //     });
  //   });
  // }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
