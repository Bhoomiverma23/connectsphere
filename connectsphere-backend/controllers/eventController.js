import { scrapeUnstop } from "../scrapers/unstopScraper.js";

export const getEvents = async (req, res) => {
  try {
    const events = await scrapeUnstop();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to load events" });
  }
};
