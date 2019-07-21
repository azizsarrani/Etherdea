
App = {
    web3Provider: null,
    contracts: {},


    init: function () {
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
    initContract: function () {
        $.getJSON('Idea.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var Idea = data;
            App.contracts.Idea = TruffleContract(Idea);

            // Set the provider for our contract.
            App.contracts.Idea.setProvider(App.web3Provider);
            console.log(App.web3Provider);
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log("Error:" + error);
                }

                var account = accounts[0];
                console.log(accounts)
                console.log(account)


                // Use our contract to retieve idea HERE
                return App.writeToJson();
            });
        });

        //return App.bindEvents();
    },

    initJson: async function () {
        // Load ideas.
        //$.getJSON('/Users/omamah/Etherdea/Etherdea/ideas.json', function (data) {
        var ideaRow = $('.card');
        var ideaTemplate = $('.card-wrapper');

        for (i = 0; i < data.length; i++) {
            ideaTemplate.find('#ideaTitle').text(data[i].title);
            ideaTemplate.find('#ideaType').text(data[i].type);
            ideaTemplate.find('#value').text(data[i].value);
            ideaTemplate.find('#actualValue').text(data[i].actualValue);
            ideaTemplate.find('#buyBtn').attr('disabled', data[i].forSale);

            ideaRow.append(ideaTemplate.html());
        }
        //});

        return await App.initWeb3();
    },

    writeToJson: async function () {

        var fs = require('fs');

        //read the json file 
        fs.readFile('/Users/omamah/Etherdea/Etherdea/ideas.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                //convert fs data into json object
                const file = JSON.parse(data);

                App.contracts.Idea.deployed().then(function (instance) {
                    ideaContractInstance = instance;
                    let length = ideaContractInstance.getIdeasLength();
                    //console.log(ideaContractInstance.getMsg());
                    //=length["PromiseValue"].c[0];
                    console.log(length)
                    for (let i = 0; i < ideaContractInstance.getIdeasLength(); i++) {
                        console.log("inside if")

                        let idea = ideaContractInstance.getIdea(i);
                        console.log(idea);
                        file.ideas.push({ "id": i, "title": idea[0], "type": idea[1], "actualValue": idea[5].c[0], "Value": idea[4].c[0], "forSale": idea[6] });
                    }
                }).then(function (result) {
                    //console.log(result)
                    //add ideas into ideas array in the ideas.json
                    //file.ideas.push({ "id": title1, "title": 2018, "type": this, "actualValue": 1, "Value": 3, "forSale": true });

                }).catch(function (err) {
                    console.log(err.message);
                });

                //const json = JSON.stringify(file);

                // fs.writeFile('/Users/omamah/Etherdea/Etherdea/ideas.json', json, 'utf8', function (err) {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         //Everything went OK!
                //     }
                // });
            }
        });
        }

            //     });
            //     return App.initJson();
            // },


        };

        $(function () {
            $(window).load(function () {
                App.init();
            });
        });
