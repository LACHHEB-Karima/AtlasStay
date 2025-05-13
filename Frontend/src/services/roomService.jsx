const BASE_URL = 'http://localhost:4040/api/v1/public/rooms';

// Get all available rooms
export const fetchAvailableRooms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/available/all?page=0&size=4`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

//Get all available rooms more then 10
export const fetchAllAvailableRooms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/available/all?page=0&size=10`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};


// Get room by ID
export const fetchRoomById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch room details');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

//Get room availablity by dates and type
export const fetchAvailableRoomsBySearch = async (checkInDate, checkOutDate, roomType) => {
  try {
    const res = await fetch(`${BASE_URL}/available?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}&page=0&size=10`);
    if (!res.ok) throw new Error('Failed to fetch search results');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};


