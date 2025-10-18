import { calculatePriceQuote } from './pricing.js';
import {
  findAuthEntityByEmail,
  createUser,
  createCompany,
  listRequests,
  createRequest,
  updateRequestStatus,
  getRequestById,
  getCompanies,
  getCompanyById,
  getUserById,
  getPricingTiers,
  getAnalyticsSummary,
} from './database.js';

const ALLOWED_STATUSES = new Set([
  'PENDING_REVIEW',
  'ACCEPTED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'REJECTED',
]);

export async function handleRequest(req, res) {
  const start = Date.now();
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const { pathname, searchParams } = url;

  try {
    if (req.method === 'GET' && pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', timestamp: new Date().toISOString() });
    }

    if (req.method === 'POST' && pathname === '/api/auth/login') {
      const body = await readJson(req);
      if (!body?.email) {
        return sendJson(res, 400, { message: 'Email is required' });
      }
      const entity = await findAuthEntityByEmail(String(body.email).toLowerCase());
      if (!entity) {
        return sendJson(res, 401, { message: 'Invalid credentials' });
      }
      return sendJson(res, 200, entity);
    }

    if (req.method === 'POST' && pathname === '/api/auth/register/user') {
      const body = await readJson(req);
      if (!body?.fullName || !body?.email) {
        return sendJson(res, 400, { message: 'Full name and email are required' });
      }
      const user = await createUser({
        fullName: String(body.fullName),
        email: String(body.email).toLowerCase(),
        addresses: Array.isArray(body.addresses) ? body.addresses : [],
      });
      return sendJson(res, 201, user);
    }

    if (req.method === 'POST' && pathname === '/api/auth/register/company') {
      const body = await readJson(req);
      if (!body?.name || !body?.email) {
        return sendJson(res, 400, { message: 'Company name and email are required' });
      }
      const company = await createCompany({
        name: String(body.name),
        email: String(body.email).toLowerCase(),
        phone: body?.phone ?? '',
        hqAddress: body?.hqAddress ?? null,
        regions: Array.isArray(body?.regions) ? body.regions : [],
        supportedTypes: Array.isArray(body?.supportedTypes)
          ? body.supportedTypes
          : ['SEA', 'AIR', 'ROAD'],
        basePrice: Number(body?.basePrice ?? 30),
        pricePerKg: Number(body?.pricePerKg ?? 4.2),
        fuelPct: Number(body?.fuelPct ?? 10),
        insurancePct: Number(body?.insurancePct ?? 3),
        logoUrl: body?.logoUrl ?? '',
      });
      return sendJson(res, 201, company);
    }

    if (req.method === 'GET' && pathname === '/api/companies') {
      const shippingType = searchParams.get('shippingType');
      const search = (searchParams.get('search') ?? '').toLowerCase();
      const region = searchParams.get('region');
      const companies = (await getCompanies()).filter((company) => {
        if (shippingType && !company.supportedTypes.includes(shippingType)) {
          return false;
        }
        if (region && !company.regions.includes(region)) {
          return false;
        }
        if (search) {
          return (
            company.name.toLowerCase().includes(search) ||
            company.email.toLowerCase().includes(search)
          );
        }
        return true;
      });
      return sendJson(res, 200, companies);
    }

    const companyIdMatch = pathname.match(/^\/api\/companies\/([^/]+)$/);
    if (req.method === 'GET' && companyIdMatch) {
      const companyId = decodeURIComponent(companyIdMatch[1]);
      const company = await getCompanyById(companyId);
      if (!company) {
        return sendJson(res, 404, { message: 'Company not found' });
      }
      return sendJson(res, 200, company);
    }

    if (req.method === 'GET' && pathname === '/api/requests') {
      const filters = {
        userId: searchParams.get('userId') ?? undefined,
        companyId: searchParams.get('companyId') ?? undefined,
        status: searchParams.get('status') ?? undefined,
        trackingId: searchParams.get('trackingId') ?? undefined,
      };
      const pagination = {
        page: searchParams.get('page') ?? undefined,
        pageSize: searchParams.get('pageSize') ?? undefined,
      };
      const requests = await listRequests(filters, pagination);
      return sendJson(res, 200, requests);
    }

    const requestIdMatch = pathname.match(/^\/api\/requests\/([^/]+)$/);
    if (req.method === 'GET' && requestIdMatch) {
      const id = decodeURIComponent(requestIdMatch[1]);
      const request = await getRequestById(id);
      if (!request) {
        return sendJson(res, 404, { message: 'Request not found' });
      }
      return sendJson(res, 200, request);
    }

    const statusMatch = pathname.match(/^\/api\/requests\/([^/]+)\/status$/);
    if (req.method === 'PATCH' && statusMatch) {
      const id = decodeURIComponent(statusMatch[1]);
      const body = await readJson(req);
      const status = body?.status;
      if (!ALLOWED_STATUSES.has(status)) {
        return sendJson(res, 400, { message: 'Invalid status value' });
      }
      const updated = await updateRequestStatus(id, status, body?.comment);
      if (!updated) {
        return sendJson(res, 404, { message: 'Request not found' });
      }
      return sendJson(res, 200, updated);
    }

    if (req.method === 'POST' && pathname === '/api/requests') {
      const body = await readJson(req);
      if (!body?.userId || !body?.companyId || !body?.parcel || !body?.route) {
        return sendJson(res, 400, { message: 'Missing required fields' });
      }
      const payload = {
        userId: String(body.userId),
        companyId: String(body.companyId),
        parcel: body.parcel,
        route: body.route,
        shippingType: body.shippingType,
        trackingId: body?.trackingId,
      };
      const created = await createRequest(payload);
      return sendJson(res, 201, created);
    }

    if (req.method === 'GET' && pathname === '/api/pricing/tiers') {
      const tiers = await getPricingTiers();
      return sendJson(res, 200, tiers);
    }

    if (req.method === 'POST' && pathname === '/api/pricing/quote') {
      const body = await readJson(req);
      if (!body?.shippingType) {
        return sendJson(res, 400, { message: 'shippingType is required' });
      }
      const quote = calculatePriceQuote({
        shippingType: body.shippingType,
        weightKg: Number(body.weightKg ?? 0),
        lengthCm: Number(body.lengthCm ?? 0),
        widthCm: Number(body.widthCm ?? 0),
        heightCm: Number(body.heightCm ?? 0),
        origin: body.origin ?? 'Germany',
        destination: body.destination ?? 'USA',
        declaredValue: Number(body.declaredValue ?? 0),
        includeInsurance: Boolean(body.includeInsurance),
        extraSurcharges: Number(body.extraSurcharges ?? 0),
      });
      return sendJson(res, 200, quote);
    }

    if (req.method === 'GET' && pathname === '/api/users/me') {
      const email = searchParams.get('email');
      if (!email) {
        return sendJson(res, 400, { message: 'email query param is required' });
      }
      const entity = await findAuthEntityByEmail(String(email).toLowerCase());
      if (!entity) {
        return sendJson(res, 404, { message: 'Entity not found' });
      }
      return sendJson(res, 200, entity);
    }

    const userIdMatch = pathname.match(/^\/api\/users\/([^/]+)$/);
    if (req.method === 'GET' && userIdMatch) {
      const id = decodeURIComponent(userIdMatch[1]);
      const user = await getUserById(id);
      if (!user) {
        return sendJson(res, 404, { message: 'User not found' });
      }
      return sendJson(res, 200, user);
    }

    if (req.method === 'GET' && pathname === '/api/analytics/summary') {
      const role = searchParams.get('role');
      const entityId = searchParams.get('entityId');
      if (!role || !entityId) {
        return sendJson(res, 400, { message: 'role and entityId are required' });
      }
      const summary = await getAnalyticsSummary({ role, entityId });
      return sendJson(res, 200, summary);
    }

    return sendJson(res, 404, { message: 'Route not found' });
  } catch (error) {
    console.error('Server error', error);
    return sendJson(res, 500, { message: 'Internal server error' });
  } finally {
    const duration = Date.now() - start;
    console.info(`${req.method} ${pathname} - ${duration}ms`);
  }
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  const raw = Buffer.concat(chunks).toString('utf-8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('Invalid JSON body');
  }
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}
