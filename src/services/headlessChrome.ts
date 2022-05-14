const CDP = require('chrome-remote-interface');

CDP(async(client:any) => {
    const { Runtime, Page, Network } = client;
   
    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        return Page.navigate({url: 'https://www.controller.com/listings/search?Category=6&ModelGroup=CHEROKEE&Manufacturer=PIPER'})
    });
    
    Page.loadEventFired(() => {
        Runtime.evaluate({expression: 'document.body.outerHTML'}).then((result:any) => {
            console.log('resultFromHeadlessChrome : ', result.result.value)
            client.close();
        })
    })
    

}).on('error', (err:any) => {
    console.error('Cannot connect to browser : ', err)
})
