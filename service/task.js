const csv = require("csv-parser");
const fs = require("fs");
const request = require("request");
const sizeOf = require("image-size");

const db = require("../models");

async function download(url, dest) {
  /* Create an empty file where we can save data */
  const file = fs.createWriteStream(dest);

  /* Using Promises so that we can use the ASYNC AWAIT syntax */
  await new Promise((resolve, reject) => {
    request({
      /* Here you should specify the exact link to the file you are trying to download */
      uri: url,
    })
      .pipe(file)
      .on("finish", async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  }).catch((error) => {
    console.log(`Something happened: ${error}`);
  });
}

const searchId = async (id) => {
  const results = [];

  return new Promise((resolve) => {
    fs.createReadStream("./data/StoreMasterAssignment.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data.StoreID))
      .on("end", () => {
        resolve(results.includes(id));
      });
  });
};

// const create = async (job) => {
// let randomTime = Math.floor(100 + Math.random() * 300);
// const x = new Promise((resolve) => {
//   setTimeout(function () {
//     console.log("in middle");
//     resolve(true);
//   }, randomTime);
// });
//   console.log("job Created");

//   await x;

//   for (let i = 0; i < job.length; i++) {
//     if (await !searchId(job[i].StoreID)) {
//       console.log("nhi hai");
//     }
//   }
//   console.log("hai");

//   //   writeToCSVFile(job);
// };

const task = async (job) => {
  try {
    const err = [];
    const j = await db.Job.findOne({ jobid: job });
    for (let i = 0; i < j.tasks.length; i++) {
      if (!(await searchId(j.tasks[i].store_id))) {
        err.push({ store_id: j.tasks[i].store_id });
        continue;
      }
      // do calculation
      for (let k = 0; k < j.tasks[i].image_url.length; k++) {
        await download(j.tasks[i].image_url[k], "./data/output.png");
      }
      const dimensions = sizeOf("./data/output.png");
      console.log("perimeter:", 2 * (dimensions.height + dimensions.width));

      let randomTime = Math.floor(100 + Math.random() * 300);
      await new Promise((resolve) => {
        setTimeout(function () {
          console.log("wait...", randomTime);
          resolve(true);
        }, randomTime);
      });
    }
    if (err.length == 0) {
      j.status = "completed";
    } else {
      j.status = "failed";
    }
    j.error = err;
    j.save();
    console.log("done");
  } catch (error) {
    console.log(error);
  }
};

module.exports = task;
