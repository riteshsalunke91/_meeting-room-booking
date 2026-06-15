// ================================================
//  src/utils/api.js
//  ✅ ANY email + ANY password → logs in as USER
//  🔒 Only admin@roombook.com / admin123 → ADMIN
// ================================================

import {
  MOCK_USERS,
  MOCK_ROOMS,
  MOCK_BOOKINGS,
  mockCounter,
  incrementMockCounter,
} from '../data/mockData';

export const API_BASE = 'http://localhost:8080/api';

// ─────────────────────────────────────────────
//  CORE FETCH HELPER
// ─────────────────────────────────────────────
export async function apiFetch(method, path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    // Backend offline → return null → use mock data
    const isOffline =
      e.message?.includes('Failed to fetch')  ||
      e.message?.includes('NetworkError')      ||
      e.message?.includes('Network request')   ||
      e.message?.includes('Load failed')       ||
      e.message?.includes('fetch');
    if (isOffline) return null;
    throw e;
  }
}

// ─────────────────────────────────────────────
//  AUTH API
// ─────────────────────────────────────────────
export const AuthAPI = {

  login: async ({ email, password }) => {

    // ── Step 1: Try real Spring Boot backend ──
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data || data;
      }
    } catch (e) {
      // Backend offline — continue to mock logic below
    }

    // ── Step 2: Check ADMIN (locked credentials) ──
    if (
      email.trim().toLowerCase() === 'admin@roombook.com' &&
      password === 'admin123'
    ) {
      return {
        id:          2,
        firstName:   'Admin',
        lastName:    'User',
        email:       'admin@roombook.com',
        role:        'ADMIN',
        department:  'IT',
        employeeId:  'EMP-000',
        phone:       '',
        memberSince: '01 January 2025',
      };
    }

    // ── Step 3: Block wrong admin password ──
    if (email.trim().toLowerCase() === 'admin@roombook.com') {
      throw new Error('Incorrect admin password');
    }

    // ── Step 4: ANY other email → auto login as USER ──
    //    No password check — anyone can log in
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    // Extract name from email
    // e.g. "gs1@gmail.com"          → firstName = "Gs1"
    // e.g. "rahul.sharma@gmail.com" → firstName = "Rahul", lastName = "Sharma"
    const namePart   = email.split('@')[0];
    const namePieces = namePart
      .split(/[.\-_]/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1));

    const firstName = namePieces[0] || 'User';
    const lastName  = namePieces[1] || '';

    // Check if this email already registered in this session
    const existing = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      const { password: _p, ...safe } = existing;
      return safe;
    }

    // Create new guest user for this email
    const guest = {
      id:          Date.now(),
      firstName,
      lastName,
      email:       email.trim().toLowerCase(),
      role:        'USER',
      department:  'General',
      employeeId:  `EMP-${Math.floor(Math.random() * 9000) + 1000}`,
      phone:       '',
      memberSince: new Date().toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric',
      }),
    };

    // Save so booking history works in same session
    MOCK_USERS.push({ ...guest, password });
    return guest;
  },

  register: async (form) => {
    // Try real backend first
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: 'USER' }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data || data;
      }
    } catch (e) {
      // Backend offline — use mock
    }

    // Mock register
    if (MOCK_USERS.find(u => u.email.toLowerCase() === form.email.toLowerCase())) {
      throw new Error('Email already registered');
    }

    const nu = {
      id:          MOCK_USERS.length + 1,
      ...form,
      role:        'USER',
      memberSince: new Date().toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric',
      }),
    };
    MOCK_USERS.push(nu);
    const { password: _p, ...safe } = nu;
    return safe;
  },
};

// ─────────────────────────────────────────────
//  ROOMS API
// ─────────────────────────────────────────────
export const RoomsAPI = {

  getAll: async () => {
    const res = await apiFetch('GET', '/rooms');
    return res?.data || MOCK_ROOMS;
  },

  getAvailable: async () => {
    const res = await apiFetch('GET', '/rooms/available');
    return res?.data || MOCK_ROOMS.filter(r => r.status === 'AVAILABLE');
  },

  getById: async (id) => {
    const res = await apiFetch('GET', `/rooms/${id}`);
    return res?.data || MOCK_ROOMS.find(r => r.id === id);
  },

  create: async (payload) => {
    const res = await apiFetch('POST', '/rooms', payload);
    if (res) return res.data || res;
    const nr = {
      id:       MOCK_ROOMS.length + 1,
      ...payload,
      capacity: parseInt(payload.capacity),
    };
    MOCK_ROOMS.push(nr);
    return nr;
  },

  update: async (id, payload) => {
    const res = await apiFetch('PUT', `/rooms/${id}`, payload);
    if (res) return res.data || res;
    const i = MOCK_ROOMS.findIndex(r => r.id === id);
    if (i >= 0) MOCK_ROOMS[i] = { ...MOCK_ROOMS[i], ...payload };
    return MOCK_ROOMS.find(r => r.id === id);
  },

  delete: async (id) => {
    await apiFetch('DELETE', `/rooms/${id}`);
    const i = MOCK_ROOMS.findIndex(r => r.id === id);
    if (i >= 0) MOCK_ROOMS.splice(i, 1);
    return true;
  },
};

// ─────────────────────────────────────────────
//  BOOKINGS API
// ─────────────────────────────────────────────
export const BookingsAPI = {

  getAll: async () => {
    const res = await apiFetch('GET', '/bookings');
    return res?.data || MOCK_BOOKINGS;
  },

  getByUser: async (userId) => {
    const res = await apiFetch('GET', `/bookings/user/${userId}`);
    return res?.data || MOCK_BOOKINGS.filter(b => b.userId === userId);
  },

  create: async (payload) => {
    const res = await apiFetch('POST', '/bookings', payload);
    if (res) return res.data || res;

    // Conflict check
    const conflict = MOCK_BOOKINGS.find(b =>
      b.roomId  === payload.roomId  &&
      b.status  !== 'CANCELLED'     &&
      new Date(b.startISO) < new Date(payload.endTime) &&
      new Date(b.endISO)   > new Date(payload.startTime)
    );
    if (conflict) throw new Error('Room already booked for this time slot!');

    const room = MOCK_ROOMS.find(r => r.id === payload.roomId);
    const id   = mockCounter;
    incrementMockCounter();

    const nb = {
      id,
      ...payload,
      roomName:  room?.roomName || '',
      startISO:  payload.startTime,
      endISO:    payload.endTime,
      date: new Date(payload.startTime).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
      }),
      startTime: new Date(payload.startTime).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit',
      }),
      endTime: new Date(payload.endTime).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit',
      }),
      status: 'Upcoming',
    };
    MOCK_BOOKINGS.push(nb);
    return nb;
  },

  cancel: async (id) => {
    await apiFetch('DELETE', `/bookings/${id}`);
    const b = MOCK_BOOKINGS.find(b => b.id === id);
    if (b) b.status = 'CANCELLED';
    return true;
  },
};

// ─────────────────────────────────────────────
//  USERS API
// ─────────────────────────────────────────────
export const UsersAPI = {
  update: async (id, payload) => {
    const res = await apiFetch('PUT', `/users/${id}`, payload);
    return res?.data || payload;
  },
};