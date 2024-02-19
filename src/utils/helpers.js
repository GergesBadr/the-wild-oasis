import { formatDistance, parseISO } from "date-fns";
import { countriesList } from "./constants";

export function formatCurrency(value) {
  if (value === 0) return null;
  return new Intl.NumberFormat("en", {
    currency: "USD",
    style: "currency",
  }).format(value);
}

// Return the distance between two given dates in words.
// First date is the provided date,
// Second date is now (the time which the fun used in)
export function formatDistanceFromNow(dateInString) {
  return formatDistance(parseISO(dateInString), new Date(), {
    addSuffix: true,
  })
    .replace("in", "In")
    .replace("about", "");
}

// Get the current date as an ISO string "For Supabase formating"
export function getToday(options = {}) {
  const today = new Date();

  // Specify whether to represent the START or END of the day
  if (options?.endOfDay) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }
  return today.toISOString();
}

// Get ISO 3166 country code (to display the guest country flag)
export function getCountryFlag(countryName) {
  // Capitalize the country name, that's the format in countries List object
  const capitalizedCountryName = countryName
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (capitalizedCountryName in countriesList) {
    return countriesList[capitalizedCountryName].toLowerCase();
  } else {
    return null;
  }
}
