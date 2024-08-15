import supabase from "./supabase";
import { detect } from "detect-browser";

interface ClickData {
  url_id: number; // Assuming url_id is a bigint in Supabase
  city: string;
  country: string;
  device: string;
}

export async function getClicksForUrls(urlIds: number[]): Promise<ClickData[]> {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error in getClicksForUrls:", error.message);
    throw new Error("Unable to load Clicks");
  }
  return data;
}

const browser = detect();
export const storeClicks = async ({
  id,
  originalUrl,
}: {
  id: string;
  originalUrl: string;
}) => {
  try {
    const device = browser
      ? browser.os === "iOS" || browser.os === "Android OS"
        ? "mobile"
        : "desktop"
      : "unknown";

    console.log("Detected device:", device);

    const response = await fetch("https://ipapi.co/json/");
    const locationData = await response.json();
    const { city, country_name: country } = locationData;

    console.log("Location data:", locationData);

    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error("Invalid id format");
    }

    const clickData: ClickData = {
      url_id: numericId, // Convert id to a number
      city: city || "Unknown",
      country: country || "Unknown",
      device: device,
    };

    console.log("Click data to be inserted:", clickData);

    const { data, error } = await supabase.from("clicks").insert(clickData);

    if (error) {
      throw new Error(error.message);
    }

    console.log("Click data inserted successfully:", data);

    window.location.href = originalUrl;
  } catch (error) {
    console.log("Error recording click:", error);
  }
};

export async function getClicksForUrl(url_id: string): Promise<any> {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("Error fetching clicks:", error.message);
    throw new Error("Unable to load Stats");
  }

  return data;
}
