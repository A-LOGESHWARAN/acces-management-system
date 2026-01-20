const express = require("express");
const AccessRequest = require("../models/AccessRequest");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

/* REQUESTER: Submit request */
router.post("/", auth, role("REQUESTER"), async (req, res) => {
  const existing = await AccessRequest.findOne({
    userId: req.user.userId,
    status: "PENDING"
  });

  if (existing)
    return res.status(400).json({ msg: "Pending request already exists" });

  const request = await AccessRequest.create({
    userId: req.user.userId,
    resource: req.body.resource,
    reason: req.body.reason
  });

  res.json(request);
});

/* REQUESTER: View own requests */
router.get("/my", auth, role("REQUESTER"), async (req, res) => {
  const requests = await AccessRequest.find({ userId: req.user.userId });
  res.json(requests);
});

/* APPROVER: View all */
router.get("/", auth, role("APPROVER"), async (req, res) => {
  const requests = await AccessRequest.find().populate("userId", "email");
  res.json(requests);
});

/* APPROVER: Approve/Reject */
router.put("/:id", auth, role("APPROVER"), async (req, res) => {
  const { status } = req.body;
  const request = await AccessRequest.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(request);
});

module.exports = router;
