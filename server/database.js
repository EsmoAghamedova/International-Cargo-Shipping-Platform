import { readFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const DEFAULT_PAGE_SIZE = 10;

let databaseCache = null;

async function ensureFileExists() {
  try {
    await access(DB_PATH, constants.F_OK);
  } catch {
    const initial = { users: [], companies: [], requests: [], pricingTiers: [] };
    await writeFile(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

async function loadDatabase() {
  if (databaseCache) {
    return databaseCache;
  }

  await ensureFileExists();
  const raw = await readFile(DB_PATH, 'utf-8');
  const parsed = JSON.parse(raw);

  databaseCache = {
    users: parsed.users ?? [],
    companies: parsed.companies ?? [],
    requests: parsed.requests ?? [],
    pricingTiers: parsed.pricingTiers ?? [],
  };

  return databaseCache;
}

async function persistDatabase() {
  if (!databaseCache) return;
  await writeFile(DB_PATH, JSON.stringify(databaseCache, null, 2), 'utf-8');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getUsers() {
  const db = await loadDatabase();
  return clone(db.users);
}

export async function getCompanies() {
  const db = await loadDatabase();
  return clone(db.companies);
}

export async function getCompanyById(id) {
  const db = await loadDatabase();
  return clone(db.companies.find((company) => company.id === id) ?? null);
}

export async function getUserById(id) {
  const db = await loadDatabase();
  return clone(db.users.find((user) => user.id === id) ?? null);
}

export async function findAuthEntityByEmail(email) {
  const db = await loadDatabase();
  const entity = db.users.find((user) => user.email === email);
  if (entity) return clone(entity);
  const company = db.companies.find((item) => item.email === email);
  return clone(company ?? null);
}

export async function createUser(payload) {
  const db = await loadDatabase();
  if (db.users.some((user) => user.email === payload.email)) {
    throw new Error('User with this email already exists');
  }

  const newUser = {
    id: randomUUID(),
    role: 'USER',
    addresses: [],
    ...payload,
  };

  db.users.push(newUser);
  await persistDatabase();
  return clone(newUser);
}

export async function createCompany(payload) {
  const db = await loadDatabase();
  if (db.companies.some((company) => company.email === payload.email)) {
    throw new Error('Company with this email already exists');
  }

  const newCompany = {
    id: randomUUID(),
    role: 'COMPANY_ADMIN',
    regions: payload.regions ?? [],
    supportedTypes: payload.supportedTypes ?? ['SEA', 'AIR', 'ROAD'],
    basePrice: payload.basePrice ?? 30,
    pricePerKg: payload.pricePerKg ?? 4,
    fuelPct: payload.fuelPct ?? 10,
    insurancePct: payload.insurancePct ?? 3,
    ...payload,
  };

  db.companies.push(newCompany);
  await persistDatabase();
  return clone(newCompany);
}

export async function listRequests(filters = {}, pagination = {}) {
  const db = await loadDatabase();
  const { userId, companyId, status, trackingId } = filters;

  const filtered = db.requests.filter((request) => {
    if (userId && request.userId !== userId) return false;
    if (companyId && request.companyId !== companyId) return false;
    if (status && request.status !== status) return false;
    if (
      trackingId &&
      (request.trackingId ?? '').toLowerCase() !== trackingId.toLowerCase()
    )
      return false;
    return true;
  });

  const page = Number.isFinite(Number(pagination.page))
    ? Math.max(1, Number(pagination.page))
    : 1;
  const rawPageSize = Number.isFinite(Number(pagination.pageSize))
    ? Number(pagination.pageSize)
    : DEFAULT_PAGE_SIZE;
  const pageSize = Math.max(1, Math.min(100, rawPageSize));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filtered.slice(start, end);

  return {
    data: clone(pageItems),
    meta: {
      total: filtered.length,
      page,
      pageSize,
      hasMore: end < filtered.length,
    },
  };
}

export async function getRequestById(id) {
  const db = await loadDatabase();
  return clone(db.requests.find((request) => request.id === id) ?? null);
}

export async function createRequest(payload) {
  const db = await loadDatabase();

  const trackingId = payload.trackingId ?? generateTrackingId();

  const newRequest = {
    id: randomUUID(),
    status: 'PENDING_REVIEW',
    createdAt: new Date().toISOString(),
    reviewComment: payload.reviewComment ?? undefined,
    ...payload,
    trackingId,
  };

  db.requests.push(newRequest);
  await persistDatabase();
  return clone(newRequest);
}

export async function updateRequestStatus(id, status, comment) {
  const db = await loadDatabase();
  const request = db.requests.find((item) => item.id === id);
  if (!request) {
    return null;
  }

  request.status = status;
  if (typeof comment === 'string') {
    request.reviewComment = comment;
  }
  await persistDatabase();
  return clone(request);
}

export async function getPricingTiers() {
  const db = await loadDatabase();
  return clone(db.pricingTiers);
}

export async function getAnalyticsSummary({ role, entityId }) {
  const db = await loadDatabase();
  const requests = db.requests.filter((request) => {
    if (role === 'USER') return request.userId === entityId;
    if (role === 'COMPANY_ADMIN') return request.companyId === entityId;
    return true;
  });

  const total = requests.length;
  const inTransit = requests.filter((r) =>
    ['IN_TRANSIT', 'OUT_FOR_DELIVERY'].includes(r.status),
  ).length;
  const delivered = requests.filter((r) => r.status === 'DELIVERED').length;
  const pending = requests.filter((r) => r.status === 'PENDING_REVIEW').length;

  const recent = requests
    .slice()
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return {
    total,
    inTransit,
    delivered,
    pending,
    recent,
  };
}

function generateTrackingId() {
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TRK-${suffix}`;
}
