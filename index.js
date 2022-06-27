const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const client = new Client({
    authStrategy: new LocalAuth()
});

client.numeros = [];
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
    
    if(message.body==='zxc'){ 
        message.reply('ok'); 
        for (let index = 0; index < 100; index++) {
            client.numeros.push(index.toString());            
        }      
    }
    let autor = message.author;
    let grupo = message.from;
	console.log(message.body);
    if(!isNaN(message.body) & grupo ==='120363042798630442@g.us'){
    if(client.numeros.includes(message.body)){
        client.numeros.splice(client.numeros.indexOf(message.body), 1);
        client.sendMessage(autor,'Voce escolheu o numero:'+message.body+' para confirmar pague o Pix');
        client.sendMessage(autor,'chave pix: nxjbsebfcbejfdxSJFbcxjESVbcj');
    }else{
        message.reply('este numero não esta mais disponivel');
        client.sendMessage(grupo,'numeros disponiveis: '+client.numeros);
    }
    
	console.log(client.numeros);

}
    /*
    switch (message.body) {
        case '1':            
		    client.sendMessage(grupo,'teste');
            break;
        case '2':            
		    client.sendMessage(autor,'teste');
            break;
        case '3':            
		    client.sendMessage(autor,grupo);
            break;
        case '4':            
		    client.sendMessage(autor,message.getChat().grupo);
            console.log(message.getContact());
            break;
        case '5':
            message.getChat().then((chat)=>{console.log(chat.name);})             
		    client.sendMessage(autor,'teste-5');
            break;
    
        default:
            break;
    }*/
});
client.initialize();