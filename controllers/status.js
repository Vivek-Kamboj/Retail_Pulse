const db = require("../models");

const Status = async (req, res) => {
  let jobId = req.query.jobid;
  if (!jobId) return res.status(400).json({});
  try {
    const x = await db.Job.findOne({ jobid: jobId });

    if (x.status == "failed") {
      return res.status(200).json({
        status: "failed",
        job_id: "",
        error: x.error,
      });
    }
    return res.status(200).json({
      status: x.status,
      job_id: "",
    });
  } catch (error) {
    return res.status(400).json({});
  }
};

module.exports = Status;
