const service = require("../service");

const db = require("../models");
let jobid = 1;

const Submit = async (req, res) => {
  if (
    !req.body ||
    !req.body.count ||
    !req.body.visits ||
    req.body.count != req.body.visits.length
  ) {
    return res.status(400).json({ error: "" });
  }

  for (let i = 0; i < req.body.visits.length; i++) {
    let visit = req.body.visits[i];
    if (!visit.store_id || !visit.image_url || !visit.visit_time) {
      return res.status(400).json({ error: "" });
    }
  }
  let job = req.body.visits;
  try {
    const newJob = await db.Job.create({
      jobid: jobid,
      tasks: job,
    });
    jobid++;
    service.task(newJob.jobid);
    return res.status(201).json({ job_id: newJob.jobid });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "" });
  }
};

module.exports = Submit;
