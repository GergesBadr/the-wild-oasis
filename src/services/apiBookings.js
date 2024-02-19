import { isToday } from "date-fns";
import { getToday } from "../utils/helpers";
import { bookingsItemsPerPage } from "../utils/constants";
import supabase from "./supabaseClient";

export async function getBookings(filterInfo, sortInfo, currPage) {
  let query = supabase
    .from("bookings")
    .select(
      "id, start_date, end_date, num_of_nights, total_price, status, cabins(name), guests(full_name, email)",
      { count: "exact" },
    );

  // Filter
  if (filterInfo) {
    query = query[filterInfo.method || "eq"](
      filterInfo.filterField,
      filterInfo.filterValue,
    );
  }

  // Sort
  if (sortInfo) {
    query = query.order(sortInfo.sortField, {
      ascending: sortInfo.sortMethod === "asc",
    });
  }

  // Pagination
  if (currPage) {
    const from = (currPage - 1) * bookingsItemsPerPage;
    const to = from + bookingsItemsPerPage - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) throw new Error("Could not load bookings from database");
  return { data, count };
}

export async function getBookingById(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(*), cabins(name)")
    .eq("id", id)
    .single();

  if (error) throw new Error(`Could not load booking #${id} from database`);
  return data;
}

export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from("bookings")
    .insert(bookingData)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBooking(id, breakfastInfo) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "checked-in", is_paid: true, ...breakfastInfo })
    .eq("id", id);

  if (error) throw new Error(`Booking #${id} could not be updated`);
  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error(`Could not delete booking with id #${id}`);
}

export async function checkoutBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "checked-out" })
    .eq("id", id);

  if (error) throw new Error(`Could not checked out from booking #${id}`);
  return data;
}

// Computing bookings stats for the dashboard:
// BOOKINGS => are every booking has been added
// STAYS => are bookings for clients that are in the hotel right now

// 1- Get all bookings between a given date and today (including today)
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ endOfDay: true }));

  if (error) throw new Error(error.message);
  return data;
}

// 2- Get all stays that started between a given date and today.
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) throw new Error(error.message);
  return data;
}

// 3- Get all activites that is happening today => all guests that arriving or leaving the hotel
export async function getTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    // Get bookings with unconfirmed AND checked-in status
    .or("status.eq.unconfirmed,and(status.eq.checked-in)");

  // Get guests with unconfirmed status AND arriving today
  const arrivingGuests = data.filter((booking) => {
    return (
      booking.status === "unconfirmed" && isToday(new Date(booking.start_date))
    );
  });

  // Get guests with checked-in status AND leaving today
  const leavingGuests = data.filter((booking) => {
    return (
      booking.status === "checked-in" && isToday(new Date(booking.end_date))
    );
  });

  // Combine the results
  const finalData = [...arrivingGuests, ...leavingGuests];

  if (error) throw new Error(error.message);
  return finalData;
}
