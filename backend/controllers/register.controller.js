import Registration from "../models/studentSChema.js";

export const registerStudent = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const parseArray = (field) => {
      if (!field) return [];
      if (typeof field === "string") return JSON.parse(field);
      return field;
    };

    const registration = await Registration.create({
      ...req.body,
      events: parseArray(req.body.events),
      games: parseArray(req.body.games),

      // 👇 THIS is missing in your code
      screenshotUrl: req.file ? req.file.path : null
    });

    return res.status(201).json({
      message: "Registration submitted successfully",
      registration
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};