const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("taghche.json");

var urls = [];
for (let i = 1; i <= 5; i++) {
  urls.push(`https://persianketab.com/page/${i}/`);
}
var promises = [];

for (var url of urls) {
  promises.push(
    new Promise((resolve, reject) => {
      request(url, function (err, respone, html) {
        if (err) {
          return reject(err);
        }
        var $ = cheerio.load(html);
        let bookName;
        let bookAuther;
        let bookImage;
        let bookAbout;
        var items = [];
        $(".m-post .m-post-content .top-post-content").each((i, el) => {
          bookName = $(el).find(".post-content h2").text();
          bookAbout = $(el).find(".post-content p").text();
          bookAuther = $(el).find(".post-content ul li:first-child").text();
          bookImage = $(el).find(".post-thumb a img").attr("src");

          items.push({ bookName, bookAuther, bookAbout, bookImage });
        });
        return resolve(items);
      });
    })
  );
}

Promise.all(promises)
  .then((results) => {
    var merged = [].concat.apply([], results);
    let payan = JSON.stringify(merged);

    writeStream.write(payan);
  })
  .catch((error) => {
    console.log(error);
  });
