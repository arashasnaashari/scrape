const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');

const writeStream = fs.createWriteStream('dev.json')


//write Headers
// writeStream.write(`Title,Link,Date \n`)




request('https://webdevblog.com/',(err,response,html) => {
    if(!err && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let title;
        let obj = {root:[]};
       
        let json;
        const article = $('article').each((i,el) => {
            //.replace(/\s\s+/g,'');
            title = $(el).find('.entry-title').text();
            const link = $(el).find('.read-more a').attr('href');

            obj.root.push({'title':title})
            // const articls = [];
            // articls.push({"title":title})

        // obj.push(title)
            
             json = JSON.stringify(obj);
            
            //console.log(json);
            // fs.writeFile("spidey.json",json,(err) => {
            //     console.log('file created');
            // })
            //console.log(articls);
             
        })
        writeStream.write(json)
        
        
    }
})
// node dev