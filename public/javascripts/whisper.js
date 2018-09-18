class Whisper {

    constructor(url,encryptionType) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(url));
        this.shh = this.web3.shh;
        
        if(encryptionType == "asym"){

        }else if(encryptionType == "sym"){

        }else{
            alert("Choose valid encryption type");
        }

    }  
  
   
  
}

$( document ).ready(function() {
   new Whisper("","")
});