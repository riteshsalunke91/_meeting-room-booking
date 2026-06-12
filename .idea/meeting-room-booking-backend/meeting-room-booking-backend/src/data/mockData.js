export let MOCK_USERS = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@gmail.com", password: "john123", role: "USER", department: "Engineering", employeeId: "EMP-001", phone: "+91 98765 43210", memberSince: "01 January 2025" },
  { id: 2, firstName: "Admin", lastName: "User", email: "admin@roombook.com", password: "admin123", role: "ADMIN", department: "IT", employeeId: "EMP-000", phone: "", memberSince: "01 January 2025" },
];

export let MOCK_ROOMS = [
  { id: 1, roomName: "Conference Hall A", location: "1st Floor", capacity: 10, status: "AVAILABLE", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", description: "Modern conference room with projector" },
  { id: 2, roomName: "Conference Hall B", location: "2nd Floor", capacity: 20, status: "AVAILABLE", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80", description: "Large hall with video conferencing" },
  { id: 3, roomName: "Meeting Room C",    location: "3rd Floor", capacity: 8,  status: "AVAILABLE", image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400&q=80", description: "Cozy meeting room for small teams" },
  { id: 4, roomName: "Board Room D",      location: "4th Floor", capacity: 15, status: "AVAILABLE", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80", description: "Executive boardroom with smart TV" },
];

export let MOCK_BOOKINGS = [
  { id: 1, roomId: 1, roomName: "Conference Hall A", userId: 1, userName: "John Doe", title: "Sprint Planning", date: "15 May 2025", startTime: "10:00 AM", endTime: "11:00 AM", status: "Completed", startISO: "2025-05-15T10:00", endISO: "2025-05-15T11:00" },
  { id: 2, roomId: 3, roomName: "Meeting Room C",    userId: 1, userName: "John Doe", title: "Design Review",  date: "10 May 2025", startTime: "02:00 PM", endTime: "03:00 PM", status: "Completed", startISO: "2025-05-10T14:00", endISO: "2025-05-10T15:00" },
  { id: 3, roomId: 4, roomName: "Board Room D",      userId: 1, userName: "John Doe", title: "Client Meeting", date: "05 May 2025", startTime: "11:00 AM", endTime: "12:00 PM", status: "Upcoming",  startISO: "2026-06-05T11:00", endISO: "2026-06-05T12:00" },
];

export let mockCounter = 4;
export const incrementMockCounter = () => { mockCounter++; };
