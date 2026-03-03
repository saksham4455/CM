import Registration from "../models/studentSChema.js";

export const getRegistrations = async (req, res) => {
  try {
    const { event } = req.query;
    console.log(event);


    let filter = {};

    if (event && event !== "ALL") {
      filter = { events: { $in: [event] } };
    }

    const data = await Registration.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Get counts per event */
export const getEventCounts = async (req, res) => {
  try {
    const counts = await Registration.aggregate([
      { $unwind: "$events" },
      {
        $group: {
          _id: "$events",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const acceptStudent = async (req, res) => {
  const { id } = req.params;

  await Registration.findByIdAndUpdate(id, { status: "accepted" });
  res.json({ message: "Student accepted" });
};

export const rejectStudent = async (req, res) => {
  const { id } = req.params;

  await Registration.findByIdAndUpdate(id, { status: "rejected" });
  res.json({ message: "Student rejected" });
};