import axios from "axios";

const FINNHUB_API_URL = "https://finnhub.io/api/v1";

export const fetchMarketNews = async (category: string = "general") => {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) throw new Error("Finnhub API key is not set!");

  try {
    const response = await axios.get(`${FINNHUB_API_URL}/news`, {
      params: {
        category,
        token: apiKey,
      },
    });

    // Limit the response to 4 items
    return response.data.slice(0, 4);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
