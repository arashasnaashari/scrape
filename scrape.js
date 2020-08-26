const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
//const writeStream = fs.createWriteStream('link.csv')


//write Headers
//writeStream.write(`Title,Link,Date \n`)




request('http://spidey.ir/',(err,response,html) => {
    if(!err && response.statusCode == 200) {
        const $ = cheerio.load(html);

        //const select = $('.article-title');

        //console.log(select.html());
        //console.log(select.text());
        $('nav li a').each((i,el) => {
            const item = $(el).text();
            //console.log(item);
        })
        const article = $('article').each((i,el) => {
            const title = $(el).find('h2').text()
            const link = $(el).find('a').attr('href')
            // const link = $(el).attr('href')
            // .replace(/\s\s+/g,'')
            //We can find in element //
            // const Everycontainer = $(el).find('.subContainer')
            // //And more 
            // const a_ha = $(el).find('a').attr('href')
            // console.log(Everycontainer,link);


        //write row to csv
        //writeStream.write(`${title},${links}`)
        })
    }
})
// node scrape