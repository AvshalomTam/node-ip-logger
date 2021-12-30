const fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false});

const search_ip = (req) => {
    let ip = req.ip
    if (ip.substr(0, 7) == "::ffff:") {
         ip = ip.substr(7)
    }
    return ip    
}

const get_client_details = (req, res) => {
    // get client data from headers
    const ip = search_ip(req) ? search_ip(req) : 'no ip' 
    const remotePort = res.socket.remotePort ? res.socket.remotePort : 'no port' 
    const usr_agent = req.get('User-Agent') ? req.get('User-Agent') : 'no agent'
    const client_time = req.body.dd ? req.body.dd : 'no time' 
    const israelTime = new Date().toLocaleString("he-IL", { timeZone: 'Asia/Jerusalem' })
    const header_lang = req.headers["accept-language"] ? req.headers["accept-language"] : 'no language'
    const browser_lang = req.body.nl ? req.body.nl : 'no language'
    
    return {
        ip,
        remotePort,
        usr_agent,
        israelTime,
        client_time,
        header_lang,
        browser_lang
    }
}

const write_details_to_csv = (csvFilename, client_details) => {
    // if file dond exists - generate it
    if (!fs.existsSync(csvFilename)) {
        writer = csvWriter({sendHeaders: false});
        writer.pipe(fs.createWriteStream(csvFilename));
        writer.write({
          header1: 'IP    ',
          header2: 'SRC_PORT    ',
          header3: 'USER_AGENT    ',
          header4: 'ISRAEL TIME    ',
          header5: 'CLIENT TIME    ',
          header6: 'LANGUAGE    ',
          header7: 'BROWSER LANG    '
        });
        writer.end();
    } 
    // append to file
    writer = csvWriter({sendHeaders: false});
    writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
    writer.write(client_details)
    writer.end();
} 

module.exports = {
    get_client_details,
    write_details_to_csv
}