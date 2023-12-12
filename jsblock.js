const SHA256 = require("crypto-js/sha256")

class block{

    constructor (data, previoushash = '', timestamp, index ){

          this.data = data;
          this.previoushash = previoushash;
          this.timestamp = timestamp;
          this.index = index;
          this.hash = this.calculateHash;
    }
    calculateHash() {
         return SHA256(this.previoushash+this.timestamp+this.index+JSON.stringify(this.data)).toString();
    }

}

class Blockchain{

    constructor (){
        // the first variable of the array will be genesis block created manually
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){

        return new block ("This is the genesis block","0","12/12/2023",0);
    }
    GetLatestBlock(){
        return this.chain[this.chain.length-1]
    }

    addBlock(newblock){
        newblock.previoushash = this.GetLatestBlock().hash;
        newblock.hash = newblock.calculateHash();
        this.chain.push(newblock);

    }
}

//new object
// get the hash of the previous block
// calculate the hash of the current block

let block1 = new block({Mybalanceis : 100},"13/12/2023", 1);
let block2 = new block({Mybalanceis : 50},"14/12/2023", 2);

let myBlockchain = new Blockchain();
myBlockchain.addBlock(block1);
myBlockchain.addBlock(block2);

console.log(JSON.stringify(myBlockchain,null,4));

