const { SerialPort, ReadlineParser } = require('serialport');
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const axios = require('axios');
const apiAdapter = require('../controller/handler/apiAdapter');

const {device_id, 
    ip_server, 
    udp_port, 
    api_key, 
    mode, 
    uri_service
} = require('../device/config.json');

// PIN RASPBERRY PI FOR ALARM 26
// OTHER PIN 20/21

// const Gpio = require('onoff').Gpio;
// const alarm = new Gpio(26, 'high');


function turnOffAlarm(gpio) {
    gpio.writeSync(1);
    console.log("Alarm Mati")
}

function turnOnAlrm(gpio) {
    gpio.writeSync(0);
    console.log("Alarm Menyala");
    sleep(5000);
    gpio.writeSync(1);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

let datanya = [];

const port = new SerialPort({
    path:  'COM6',//'/dev/ttyUSB0',
    baudRate: 115200,
});
const parser = new ReadlineParser();
port.pipe(parser);

parser.on('data', onData);


async function alarmMode(data){
    try{
        const api_alarm = apiAdapter(uri_service)
        const payload = data.map((val) => ({rfid_code: val}))
        let res = await api_alarm.post('/api/v1/public/alarm', payload);
        let isAlarm = res.data.alarm;
        console.log(isAlarm);
        if(isAlarm){
            console.log("Turn On Alarm ");
            turnOnAlrm(alarm);
	    datanya= [];
         }else{
            console.log("Turn OFF alarm");
            turnOffAlarm(alarm);
	    datanya = [];
        }
    }catch(error){
        console.log("message : " + error.message);
    }
}


// MAIN Function /// 
function onData(data) {
    if(data){
        // console.log(data);
        data = data.slice(14); 
        data = data.split(" ").join("");
        data = data.split("\r").join("");
        datanya.push(data);
        let kirim = [...new Set(datanya)];
        kirimdata()
        // console.log("Tag Number : ");
        // console.log(kirim);
        // SocketIo.emit('data', kirim);
        // console.log(`total tag :  ${kirim.length}`);
    }
}


/// Fucntion Send Data
async function kirimdata(){
    if(datanya.length > 0){
        if (mode == 'udp'){
            let kirim = [...new Set(datanya)] + "," + device_id;
            console.log(kirim);
            socket.send(kirim, udp_port, ip_server, function(error){
                if(error){
                    socket.close();
                }else{
                    datanya = [];
                }
            });
        }else if(mode == 'alarm'){
            let kirim = [...new Set(datanya)];
            alarmMode( kirim);
        }
    }
}
