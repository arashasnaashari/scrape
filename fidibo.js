const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("taghche.json");
let options = {
  url: "https://fidibo.com/",
  timeout: 20000,
};
setTimeout(() => {
  request(options, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let image;
      let name;
      let obj = { books: [] };
      let json;
      const bookimage = $(".book-slide").each((i, el) => {
        image = $(el).find("img").attr("data-src");
        name = $(el).find("span a").text();

        obj.books.push({ image: image, name: name });

        json = JSON.stringify(obj);
      });
      writeStream.write(json);
    }
  });
}, 3000);
