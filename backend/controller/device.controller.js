const os = require('os');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const fs = require('fs');
let data = require('../device/config.json');





const parsetoHHMMSS = (uptime) => {
  let hh = Math.floor(uptime / 3600);
  let mm = Math.floor((uptime - (hh * 3600)) / 60);
  let ss = Math.floor(uptime - (hh*3600) - (mm * 60));

  if(hh < 10){hh  = "0"+hh;};
  if(mm < 10){mm = "0"+mm;};
  if(ss < 10){ss = "0"+ss;};
  
  return hh + ':' + mm + ':' + ss;
}

exports.getDevice = async (req, res) => {
  try{
    // const MacAddress = getMac.default();
    
    // Hardware Information 
    let uptime = os.uptime();
    let freemem = os.totalmem() - os.freemem();
    let free_memory = parseInt((freemem/ os.totalmem()) * 100) + "%"
    let memory_usage = (100 - parseInt((freemem/ os.totalmem()) * 100)) + "%" 

    // Date Information 
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = `${dd}-${mm}-${yyyy}`;
    const network = os.networkInterfaces().eth0[0] 

 

    
    const result = {
      Mac : MacAddress || null,
      Localtime: new Date().toISOString(),
      Uptime : parsetoHHMMSS(uptime) ,
      Free_memory: free_memory,
      Memory_Usage: memory_usage,
      Service_Access: data.mode
      // device: getDevice,
    } 
    // const network = {
    //   Internet_Mode : "LAN",
    //   IP_Address : "10.230.200.185",
    //   Gateway : "10.230.200.253",
    //   Mac: "E4:A4:71:50:89:3F",      
    // }

    // Network Information

    return res.status(200).json({
      status: 'success',
      data: {
        device: result,
        network: network
      }

    })

  }catch(error){
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      err_message: error.message
    })
  }
}


exports.updateData = (req, res) => {
  try{
    const {device_id,ip_server,udp_port,api_key,mode,uri_service} = req.body;
    
    const dataPath = path.join('device', 'config.json');
    fs.writeFileSync(dataPath, "{\n");
    fs.appendFileSync(dataPath, "\t" 
        + JSON.stringify("device_id") + ":" 
        +JSON.stringify(device_id === undefined ? null : device_id)  
        + ",\n");
    
    fs.appendFileSync(dataPath, "\t" 
        + JSON.stringify("ip_server") + ":" 
        +JSON.stringify(ip_server === undefined ? null : ip_server) 
        + ",\n");
    
    fs.appendFileSync(dataPath, "\t" 
          + JSON.stringify("udp_port") 
          + ":" +JSON.stringify(udp_port === undefined ? null : udp_port) 
          + ",\n");
    
    fs.appendFileSync(dataPath, "\t" 
        + JSON.stringify("api_key") + ":" 
        +JSON.stringify(api_key === undefined ? null : api_key) 
        + ",\n");
    
    fs.appendFileSync(dataPath, "\t" 
        + JSON.stringify("mode") + ":" 
        +JSON.stringify(mode === undefined ? null : mode) 
        + ",\n");
    
    fs.appendFileSync(dataPath, 
        "\t" + JSON.stringify("uri_service") 
        + ":" +JSON.stringify(uri_service === undefined ? null : uri_service) 
        + "\n");
    
    fs.appendFileSync(dataPath, "\n}");

    return res.status(200).json({
      status: "succcess",
      message: "success updating data"
    });
  }catch(error){
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
      err_message: error.message
    })
  }
}

