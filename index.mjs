import readline from "readline";
import axios from "axios";
import {Spinner} from "cli-spinner";

const readlineStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readlineStream.question(`Enter Crypto Name:`, async (crytoName) => {
    if(crytoName && crytoName.length<5 && /^[a-zA-Z]+$/.test(crytoName)) {
        var spinner = new Spinner(`You have entered ${crytoName}, fetching price %s`);
        spinner.setSpinnerString('|/-\\');
        spinner.start();
       try {
           let response = await axios({
               url: `https://api.bitfinex.com/v2/calc/fx`,
               method:'post',
               data: {
                   ccy1: crytoName,
                   ccy2: 'USD'
               },
           });
           let price = response.data[0];
           console.log(`Price of BTC is ${price}`);
       }catch(error){
           console.log(`Error: ${error.message}`);
       }
       spinner.stop();
    readlineStream.close();
    }else{
        console.log(`Invalid Crypto Name`);

    }
    process.exit(0);
});
