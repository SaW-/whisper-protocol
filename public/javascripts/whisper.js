class Whisper {

    constructor(url,encryptionType,password,nickName,topic) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(url));
        this.shh = this.web3.shh;
        this.password = password;
        this.nickName = nickName;
        this.encryptionType = encryptionType;
        this.topic = encodeToHex(JSON.stringify(topic)).substring(0, 10);

        this.msgs = [];

        if(encryptionType == "asym"){
            this.generateAsymKey();
        }else if(encryptionType == "sym"){
            this.generateSymKey();
        }else{
            alert("Choose valid encryption type");
        }
        
    }

    setTextArea(textArea){
        this.textArea = textArea;
    }

    generateAsymKey(){
        let data = {
			msgs: [],
			text: "",
			symKeyId: null,
			name: "",
			asymKeyId: null,
			sympw: "",
			asym: true,
			configured: false,
			topic: this.topic ,
			recipientPubKey: "",
			asymPubKey: ""
		};

		this.shh.newKeyPair().then(id => {
            data.asymKeyId = id;
            this.asymKeyId = id;
			return this.shh.getPublicKey(id).then(pubKey => {
                this.asymPubKey = pubKey;
                this.asymPubKeyLabel.text(pubKey)
                this.registerTopic();
            }).catch(console.log);
		}).catch(console.log);
    }

    setAsymPubKeyLabel(asymPubKeyLabel){
        this.asymPubKeyLabel = asymPubKeyLabel;
    }

    generateSymKey(){
        this.shh.generateSymKeyFromPassword(this.password).then(symKeyID => {
            this.symKeyId = symKeyID;
            this.registerTopic();
        })
    }

    sendMessage(text,pubKey = "") {
        let msg = {
            text: text,
            nickName: this.nickName
        };
        
        let postData = {
            ttl: 7,
            topic: this.topic,
            powTarget: 2.01,
            powTime: 100,
            payload: encodeToHex(JSON.stringify(msg)),
        };

        if(this.encryptionType == "asym") {
            postData.pubKey = pubKey;
            postData.sig = this.asymKeyId;
            if(pubKey == "") {
                alert("Please enter  key");
            return;
        }
        } else{
            postData.symKeyID = this.symKeyId;
        }console.log(postData)
        this.shh.post(postData);

    }

    registerTopic(){
        let filter = {
            topics: [this.topic ]
        };

        if(this.encryptionType == "asym") {
            if(!this.asymKeyId) {
                alert("No valid asymmetric key");
            return;
        }

            filter.privateKeyID = this.asymKeyId;
        } else {
            if (!this.symKeyId || this.symKeyId.length == 0) {
                alert("please enter a pasword to generate a key!");
            return;
        }

            filter.symKeyID = this.symKeyId;
        }


        this.msgFilter = this.shh.newMessageFilter(filter).then(filterId => {
            setInterval(() => {
                this.shh.getFilterMessages(filterId).then(messages => {

                    for (let msg of messages) {
                        let message = decodeFromHex(msg.payload);
                        this.textArea.append("<div class='row'><div> From  " + message.nickName + " : "+message.text+"</div>");
                        this.msgs.push({
                            name: message.name,
                            text: message.text
                        });                        
                    }
                });
            }, 1000);
        });
    }
}
