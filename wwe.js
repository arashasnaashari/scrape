const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const writeStream = fs.createWriteStream("wwe.json");

request(
  "https://www.thesmackdownhotel.com/guides/wwe2k19/wwe-2k19-rating-reveal-full-list-of-superstars-overalls-confirmed-so-far-and-comparison-with-wwe-2k18",
  (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let overall;
      let name;
      let obj = { wweBestSuperstar: [] };

      let json;
      const tr = $("tr").each((i, el) => {
        overall = $(el).find("td:nth-child(2) strong").text();
        name = $(el).find("td:nth-child(1)").text();
        obj.wweBestSuperstar.push({ overall: overall, name: name });
        obj.wweBestSuperstar.sort((a, b) => b.overall - a.overall);
        //var top10 = obj.wweBestSuperstar.slice(0, 10);
        // var avarage = obj.wweBestSuperstar.reduce((a, b) => ({
        //   overall: a.overall + b.overall
        // }));
        json = JSON.stringify(obj);
      });
      writeStream.write(json);
    }
  }
);
