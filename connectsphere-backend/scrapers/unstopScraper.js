import axios from "axios";

export const scrapeUnstop = async () => {
  try {
    const url =
      "https://unstop.com/api/public/opportunity/search-result?types=HACKATHON&status=OPEN";

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    const list = response?.data?.data?.data || [];

    const events = list.map((item) => ({
      title: item.title || "No Title",
      date: item.registration_end_date || "No deadline",
      link: `https://unstop.com${item.public_url}`,
      image:
        item.cover_image_url ||
        "https://cdn-icons-png.flaticon.com/512/942/942748.png",
    }));

    return events;
  } catch (err) {
    console.error("❌ Unstop API Error:", err.message);
    return [];
  }
};
