app.filter('percentage', ['$filter', function ($filter) {
  return function (input) {
    return $filter(input ) + '%';
  };
}]);




app.controller('mainController',['$scope','$window','$http','$timeout','$interval','$location',function($scope,$window,$http,$timeout,$interval,$location){

    $scope.curCurrency = 0;

    $scope.showInvestor = false;

    $scope.cryptoCurencyGeneralData = [];    
    
    $scope.modalData = {};
    
    $scope.investorData = {};
    
    $scope.showModal = false;

    $scope.showDisclaimerModal = false;

    $scope.investorSelectedByUser = false;

    $scope.indexForInvestors = 1;
    
    $scope.coinsSeries1 = [{},{},{},{},{}];

    $scope.coinsSerires2 = [{},{},{},{},{}];

    $scope.topTenFromApi = [];

    $scope.cryptoCurencyLatestInput = 0

    $scope.showDisclaimerModal = false;
    
     $scope.formError = false;

    $scope.topTenCoins = [];

    $scope.coinDataBase = [];
    $scope.areaCode = 0;

    $.get("https://ipinfo.io", function(response) {
}, "jsonp")


    
$http({url:'https://ipinfo.io',method:'GET'}).then(function(response){

    $scope.userCountry = response.data.country;
    
    $http({url:'getPhoneCode.php',method:'GET',params:{iso:$scope.userCountry}

    
    }).then(function(result){
    			
    			result.data = Number(result.data).toString()
                //$scope.areaCode = "+" + result.data + "-"; 
                $scope.areaCode =  "+" + 972 + "-"; 
    })
})


    $scope.validations = {

        firstName:'Name must be at least 2 char',
        lastName:'Name must be at least 2 letters',
        phone:'Must me at least 10 numbers',
        email:'invalid email address',
        password:'please include password'

    }




    $scope.submitForm = function(formData){   
     var campaign = '210';
    var subCampaign = '0';
		

	   if($location.search().campaign){
    		 campaign = ($location.search().campaign)
    	}
    
   if ($location.search().subCampaign)
   {
   	 var subCampaign = $location.search().subCampaign;
   }
    
    
    
					 
        $http({method:'POST',url:'formSubmit.php',params:{campaign:campaign,module:'customer',command:'add',firstName:formData.firstName,lastName:formData.lastName,email:formData.email,password:formData.password,phoneNumber:formData.phoneNumber,country:$scope.userCountry}}).then(function sucsses(response){
       
       
               var customerToken = response.data.data.token;
               
               if(customerToken)
                    window.location.href = "https://trade.toptencoin.com?token=" + customerToken;
	
			else $scope.formError = true;
       		
       		
       		
                  
       
       },function error (err){
       
       
       })
   
}




$http({url:'coins.json',method:'GET'}).then(function succes(data){

    $scope.coinDataBase = data.data; 


function fixedCur(cur){

    decimalVal = (cur%1).toString();
    var decIndex = decimalVal.length;

    for (var i =0; i<decimalVal.length;i++)
    {
            if (decimalVal.charAt[i]=='.')
                {
                    decIndex = i;
                }
    }
    
        if (decimalVal.length>2)
            
            {
                decimalVal=decimalVal.slice(0,4);
            }

         cur+=Number(decimalVal);
         return cur;

}

$http({url:'https://api.coinmarketcap.com/v1/ticker/',method:'GET'}).then(function succes(result){

            console.log(result.data[1].total_supply)
    for(var i = 0; i<10; i++)
        {
            
            $scope.cryptoCurencyGeneralData.push(result.data[i]);

            if (result.data[i].id == 'bitcoin')
                $scope.curCurrency = result.data[i].price_usd;
                
                    var totalSupp = result.data[i].total_supply;
                    console.log(totalSupp);

                $scope.topTenCoins.push({rank : result.data[i].rank,
                    id:result.data[i].symbol,
                    price : result.data[i].price_usd,
                    volume_usd_24 : result.data[i]['24h_volume_usd'],
                    marketKap : result.data[i].market_cap_usd,
                    precentChange : result.data[i].percent_change_24h,
                    currentSupply : result.data[i].total_supply,
                    maxSupply : result.data[i].max_supply,

                })

        }
            })
            })







        $scope.$watchCollection('topTenCoins',function(newval,oldval){
            

            for (var i = 0; i<$scope.topTenCoins.length; i++)
            {
                $scope.coinDataBase.forEach(x=>{
                if(x.id == $scope.topTenCoins[i].id)
                {
                        $scope.topTenCoins[i].src = x.src;
                        $scope.topTenCoins[i].modalSrc = x.modalSrc;
                        $scope.topTenCoins[i].text = x.text;
                        $scope.topTenCoins[i].title = x.title;
                        

                }
            })
        }
        

            $scope.coinsSeries1 = $scope.topTenCoins.slice(0,5);
            $scope.coinsSeries2 = $scope.topTenCoins.slice(5,10);

           



        



    })





    $scope.promise = $interval(function(){
    
        $scope.investorDataArray.forEach(x=>{
            x.imageSelection = 'elements/choice.png';
        })
        
        if(!$scope.investorSelectedByUser)
                {
                    $scope.investorData = $scope.investorDataArray[$scope.indexForInvestors];
                    $scope.investorDataArray[$scope.indexForInvestors].imageSelection = 'elements/selected.png';
                }

            if($scope.indexForInvestors==4)
                {
                    $scope.indexForInvestors = 0;
                }

                else $scope.indexForInvestors++;

},5000)


    $scope.disableSelectionByUser = function(index){

        $scope.investorSelectedByUser = false;

        $interval.cancel($scope.promise);
        $scope.indexForInvestors = index;
        
        $scope.promise = $interval(function(){
            
                $scope.investorDataArray.forEach(x=>{
                    x.imageSelection = 'elements/choice.png';
                })
                
                if(!$scope.investorSelectedByUser)
                        {
                            $scope.investorData = $scope.investorDataArray[$scope.indexForInvestors];
                            $scope.investorDataArray[$scope.indexForInvestors].imageSelection = 'elements/selected.png';
                        }
    
                    if($scope.indexForInvestors==4)
                        {
                            $scope.indexForInvestors = 0;
                        }
    
                        else $scope.indexForInvestors++;
    
        },5000)
    
    }


  
    

    $scope.selection = false;
    
    $scope.investor = 'investors/chris.png';

    $scope.bitcoinSrc = 'coins/color/small/BTC.png';
    
    
    

    
    $scope.investorDataArray = [
        
        {
            id:'investor1',
            title:'Joseph Lubin - ',
            selected:'elements/selected.png',
            imageSelection:'elements/choice.png',
            subTitle:'Worth up to 5 Billion',
            img:'investors/joseph.png',
            text1:"The founder of the 600-employee behemoth ConsenSys, which serves as a" + ' " ' + "venture production studio" + ' " ' + "for the Ethereum ecosystem, began his career working in robotics, machine vision, neural nets and software engineering. He then transitioned into finance, building trading systems, running a hedge fund and working for Goldman Sachs' private wealth management division. He also detoured to Jamaica for a stint in music management.",
            text2: "“Cryptocurrency is part of the movement of taking all the foundational technologies and making them natively digital, so that we can all make them more accessible. We’re moving pretty quickly towards an integrated society, sans borders“" 
        },
       
       
        {
                id:'investor2',
                title:'Chris Larsen - ',
                selected:'elements/selected.png',
                imageSelection:'elements/choice.png',
                subTitle:'Worth up to 8 Billion',
                img:'investors/chris.png',
                text1:"The richest man in crypto is Chris Larsen, a Stanford M.B.A. and veteran Silicon Valley operator. A serial entrepreneur, Larsen, 57, cofounded the online mortgage lender e-Loan, in 1997, and, eight years later, Prosper, the peer-to-peer lender that has been valued at more than $1 billion. While Larsen stepped down from the company more than a year ago, he still serves as executive chairman.",
                text2: " “The greatest remedy in the world is change; and change implies the passing from the old to the new. It is also the only path that leads from the lesser to the greater, from the dream to the reality, from the wish to the heart’s desire fulfilled.” "

            },



        {
            id:'investor3',
            title:'Tyler and Cameron Winklevoss - ',
            selected:'elements/selected.png',
            imageSelection:'elements/choice.png',
            subTitle:'Worth upto 2 Billion',
            img:'investors/winklevoss.png',
            text1:"The Winklevoss twins, former Olympic rowers, built a lucrative New York-based cryptocurrency exchange, Gemini, where investors can buy and sell digital currencies. Before opening the trading platform in 2015, the" + ' " '  + "Winklevii" + ' " ' + "worked closely with New York regulators. oday Gemini sits alongside Coinbase as one of the few places where U.S residents can easily sell crypto for U.S. dollars. It recently handled $300 million of transactions daily and might have more long-term value than the twins' currency holdings. When it gained approval to operate as a financial services firm two years ago, it cleared a high barrier to entry, says Stan Miroshnik, CEO of the Element, an investment bank for cryptocurrency token sales.",
            text2:""

        },

    

        {
            id:'investor4',
            title:'Matthew Mellon - ',
            selected:'elements/selected.png',
            imageSelection:'elements/choice.png',
            subTitle:'Worth up to 1 Billion',
            img:'investors/mathew.png',
            text1: "This heir to one of America's great banking fortunes, and a former chair of the New York Republican Party's finance committee, has struggled with drug addiction. So, when he began dabbling heavily in cryptocurrencies years ago, his friends and family tried to dissuade him, figuring it was another erratic obsession. And, indeed, he abandoned some early investments and sold his Bitcoin a few years ago. But then Mellon got turned on to XRP, spending some $2 million to acquire coins. Mellon's XRP is worth around $1 billion.",
            text2:" “It's $1 billion virtually for free. I actually have earned it because I was the only person who was willing to raise his hand. My family thought I was insane, when I knew it was a home run." 

        },

    
        
        {
            id:'investor5',
            title:'Changpeng "CZ" Zhao - ',
            selected:'elements/selected.png',
            imageSelection:'elements/choice.png',
            subTitle:'Worth upto 2 Billion',
            img:'investors/zhao.png',
            text1:"This heir to one of America's great banking fortunes, and a former chair of the New York Republican Party's finance committee, has struggled with drug addiction. So, when he began dabbling heavily in cryptocurrencies years ago, his friends and family tried to dissuade him, figuring it was another erratic obsession. And, indeed, he abandoned some early investments and sold his Bitcoin a few years ago. But then Mellon got turned on to XRP, spending some $2 million to acquire coins. Mellon's XRP is worth around $1 billion. It's $1 billion virtually for free. I actually have earned it because I was the only person who was willing to raise his hand. My family thought I was insane, when I knew it was a home run.",

        },
    ]



    $scope.hideModal = function(){
        $scope.showModal=false;
    }
    
    

            
        $scope.cashCoins = [
                {
                    name : 'USTD',
                    currency:'1',
                    src:'coins/color/small/USTD.png'
                },
            ]

            $scope.currentCryptoCoins = [

                {
                    name : 'BTC',
                    src:'coins/color/small/BTC.png',

                },


                {
                    name : 'BTCP',
                    src:'coins/color/small/BTCP.png',
                    currency:2,
                },
 

                {
                    name : 'BCC',
                    src:'coins/color/small/BCC.png',
                    currency:3,

                },


                {
                    name : 'BTG',
                    src:'coins/color/small/BTG.png',
                    currency:3,

                }
            ]


            
            $scope.gifLiData =[

                {
                        src:'gif/205.gif',
                        title:'205',
                        text:'Digital Assets',
                        
                },

                
                {
                    src:'gif/24.gif',
                    title: '24/7',
                    text:'Trading Hours',
                },

                {
                    src:'gif/14000.gif',
                    title:'14000',
                    text:'Members Served',

                },

                {
                    src:'gif/47.gif',
                    title:'47',
                    text:'Countries Supported',
                },

                {
                    src:'gif/1000.gif',
                    title:'2000',
                    text:'Successful Trades',
                },
              
            ] 


         


$scope.investorData = $scope.investorDataArray[0];


$scope.insertInvestor = function(investorData){


    $interval.cancel($scope.promise);

    $scope.investorDataArray.forEach(x=>{
        x.imageSelection = 'elements/choice.png';
    })

    $scope.investorSelectedByUser = true;
    $scope.showInvestor = true;
    investorData.imageSelection = 'elements/selected.png';
    $scope.investorData = investorData;


}



$scope.showCoinModal = function(index,coinSeriesIndex){
                    

    $scope.showModal=true;
    $scope.modalData = coinSeriesIndex == 1 ? $scope.coinsSeries1[index] : $scope.coinsSeries2[index];  

}



$scope.curDisclaimerModalData = {};

  $scope.disclaimerModalData = {

    privacy:{
            name:'Privacy',
            content:""
    },

    terms:{
      name:'Terms and Conditions',
      content:""
    },

    termsPayment:{
        name:'Terms of Payment',
        content:""
    }

}


$http({method:'get',url:"./terms.php"}).then(function(response){

  $scope.disclaimerModalData.terms.content = response.data;

 
})



$http({method:'get',url:"./privacy.php"}).then(function(response){

  $scope.disclaimerModalData.privacy.content = response.data;  


})

$http({method:'get',url:"./termsPayment.php"}).then(function(response){

    $scope.disclaimerModalData.termsPayment.content = response.data;  
  
  
  })
  


$scope.showPrivacy = function(){
  $scope.curDisclaimerModalData =  $scope.disclaimerModalData.privacy;
  $scope.showDisclaimerModal = true;
  angular.element(document.getElementById('section1Wrap')).css('filter','blur(4px)');
  angular.element(document.getElementById('section2')).css('filter','blur(4px)')

  window.location.href=('./#section1Wrap');


}

$scope.showTermsPayment = function(){
    $scope.curDisclaimerModalData =  $scope.disclaimerModalData.termsPayment;
    $scope.showDisclaimerModal = true;
    angular.element(document.getElementById('section1Wrap')).css('filter','blur(4px)')
    angular.element(document.getElementById('section2')).css('filter','blur(4px)')

    window.location.href=('./#section1Wrap');


  
  
  }
  


$scope.showTerms = function(){

    console.log('infunk')
  $scope.curDisclaimerModalData =  $scope.disclaimerModalData.terms;
  $scope.showDisclaimerModal = true;
  angular.element(document.getElementById('section1Wrap')).css('filter','blur(4px)')
  angular.element(document.getElementById('section2')).css('filter','blur(4px)')

  window.location.href=('./#section1Wrap');


  


}

  
$scope.hideDisclaimerModal = function()
{
  $scope.showDisclaimerModal = false;
  angular.element(document.getElementById('section1Wrap')).css('filter','blur(0)')
  angular.element(document.getElementById('section2')).css('filter','blur(0)')

  



}


}])




app.directive('disclaimerModal',function(){


  return{
        scope:{
          data:'=',
          showModal:'='
        },

        link:function(scope,element,attr){

          scope.removeModal = function()
        {
              scope.$parent.hideDisclaimerModal();
        }

      
            scope.$watch('data',function(newval,oldval){

                
            })

        },

            
            template:"<div ng-show ='showModal' class = 'DisclaimerModalContent'> <button ng-click = 'removeModal()' class = 'glyphicon glyphicon-remove'> </button> <h2 id = 'title'> {{data.name}} </h2> <div id = 'content'> {{data.content}} </div> </div>"
 }

})






app.directive('cryptoDirective',function(){

        return {

            restrict:'AE',
            
            link: function(scope,element,attr){

                scope.cryptoCurencyLatestInput = 0;

                scope.cryptoUserType = function(){
                        
                    scope.cryptoCurencyLatestInput = scope.cryptoCurencyInput;

                }
                scope.curSelectedCoin = Object.assign({},scope.currentCryptoCoins[0]);
                
                scope.$watchCollection('curSelectedCoin',function(newval,oldval){
                        
                        scope.curSrc = newval.src;


                    })
                   
            },

            template:"<li id = 'crypto'> <img ng-src = {{bitcoinSrc}} id = 'smallCoin'/> <input ng-init = 'cryptoCurency = 1' id = 'cryptoExchange' ng-keyup = 'cryptoUserType()' ng-model = 'cryptoCurencyInput' type = 'text'/> <span id = 'btc'> BTC </span> </li>"


        }

})


app.directive('cashDirective',function(){

    return {

        restrict:'AE',

        scope:{
                cashCoins:'=',
                target:'=',
                currency:'=',
                valChange:'='

        },

        
        link: function(scope,element,attr){

                scope.curCoinTarget = {};
                scope.fixedCryptoOutcome = 0;
                scope.curSelectedCash = {};
                scope.fixedDollarvalue = 0;
                scope.unfixedCrypto = 0;
                
                scope.curSelectedCash = Object.assign({},scope.cashCoins[0]);

            
               scope.$watch('cashCurencyInput',function(newval,oldval){

                        scope.unfixedCrypto = newval/scope.currency;
                })


                 scope.cashType = function() {
                    
                    scope.fixedCryptoOutcome = (scope.cashCurencyInput/scope.currency).toFixed(9);  


                 }

          

              
               



        },        

        template:"<li id = 'cash'> <img ng-src = {{curSelectedCash.src}} id = 'smallCoin'/> <input type = 'text' convert-directive format='currency'  id = 'cashExchange' ng-keyup = 'cashType()' ng-model = 'cashCurencyInput'/> <span id = 'usd'> USD </span>  </li>"
}

})




app.directive('convertDirective',function(){

    return {

        restrict:'AE',

        require:'ngModel',

        priority:999999,


        link: function(scope,element,attr,model){

            scope.unfixexDollar = 0;
            scope.fixedDollar = 0;
            //init cash input value when current bitcoin currency is fetched 
            
            scope.$watch('currency',function(newval,oldval){

                    
                        model.$setViewValue(newval);
                        model.$render();
                        scope.target = 1;
    
        })
                    
            // parsing the target which is the crypto input elements ng-model - deviding it with current bitcoin currency to get the cash result. then renders it to the model 
        



             scope.$watch('valChange',function(newval,oldval){

                            model.$setViewValue((newval*scope.currency).toFixed(2));
                            model.$render();
                        
            })





             scope.$watch('fixedCryptoOutcome',function(newval,oldval){

                scope.target = newval;

            })
    

            
            }

        }

})



app.directive('coinModal',function(){

        return{
            
            restrict:'AE',

            scope:{
                    modalData:'=',
                    modalFunk:'&'
            },
            link(scope,element,attrs){

                scope.$watch('modalData',function(newval,oldval){
                    console.log(newval);
                })

                        scope.hideModal =  function(){

                            scope.$parent.showModal=false;   
                            
                        }

                        
            },

            template: "<span id = 'exitModal' class = 'glyphicon glyphicon-remove' ng-click = 'hideModal()'>  </span> <p id = 'modalText'> {{modalData.text}}</p> <div id = 'modalImageWrap'> <img ng-src = {{modalData.src}} id = 'modalImage'/> </div>  <div id = {{modalData.title}} class = 'ticketWrap'>  <table id = 'ticketTable'> <tr id = 'title'><th id = 'tableHeader' colspan='2'> {{modalData.title}} </th> </tr> <tr class = 'subTitles'> <td id = 'marketKapTitle'> MARKET CAP </td> <td id = 'volumeTitle'> volume 24 </td> </tr> <tr class = 'dataRows'> <td> {{modalData.marketKap}} </td> <td id = 'volume24'> {{modalData.volume_usd_24}} </td>  </tr> <tr class = 'subTitles'> <td> Current Supply </td> <td> Max Supply </td> </tr> <tr class = 'dataRows'> <td> {{modalData.currentSupply}} </td> <td> {{modalData.maxSupply}}</td> </tr> </table> </div>"
        }
})

app.directive('investorDirective',function(){

    return{
        
        restrict:'AE',

        scope:{
                investorData:'='
        },
        link(scope,element,attrs){


                    scope.$watch('investorData',function(newval,olaval){
                    

                        angular.element(element).addClass('removeItem');
                        angular.element(element).addClass('addItem');
        
                    })
        },

        template: "<img ng-src = {{investorData.img}} id = 'invesorImage'/> <div id = 'investorTitles'> <h1 id = 'investorMainTitle'>   {{investorData.title}} </h1>   <h2 id = {{investorData.id}} class = 'investorSubTitle'> {{investorData.subTitle}} </h2> </div> <p id = 'investorText'> {{investorData.text1}} </p> <p id ='investorText2'>  {{investorData.text2}}  </p>"
    }
})




app.directive('ngPlaceholder', function() {
    return {
      restrict: 'A',
      scope: {
        placeholder: '=ngPlaceholder'
      },
      link: function(scope, elem, attr) {
        scope.$watch('placeholder',function() {
          elem[0].placeholder = scope.placeholder;
        });
      }
    }
  });
  
  
  
  app.directive('areaCode',function(){

    return{
    require:'ngModel',

    link:function(scope,element,attrs,model){

                scope.$watch('areaCode',function(newval,oldval){

                model.$setViewValue(newval);
                model.$render();

        })
    }

}

  })