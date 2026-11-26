const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () =>
  localStorage.getItem("token") || localStorage.getItem("edulearn_token");

async function request(endpoint, options = {}) {
  const { params, headers: customHeaders, body, ...rest } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const response = await fetch(url, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authAPI = {
  login: (credentials) => request("/admin/login", { method: "POST", body: credentials }),
  register: (data) => request("/admin/register", { method: "POST", body: data }),
  me: () => request("/admin/me"),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("edulearn_token");
    localStorage.removeItem("edulearn_admin");
  },
};

export const dashboardAPI = {
  getOverview: () => request("/dashboard/stats"),
  getUpcomingEvents: () => request("/events"),
  getRecentEnrollments: () => request("/enrollments"),
};

export const courseAPI = {
  getAll: (params) => request("/courses", { params }),
  getById: (id) => request(`/courses/${id}`),
  create: (data) => request("/courses", { method: "POST", body: data }),
  update: (id, data) => request(`/courses/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/courses/${id}`, { method: "DELETE" }),
};

export const studentAPI = {
  getAll: (params) => request("/students", { params }),
  getById: (id) => request(`/students/${id}`),
  create: (data) => request("/students", { method: "POST", body: data }),
  update: (id, data) => request(`/students/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/students/${id}`, { method: "DELETE" }),
};

export const enquiryAPI = {
  getAll: (params) => request("/enquiries", { params }),
  create: (data) => request("/enquiries", { method: "POST", body: data }),
  update: (id, data) => request(`/enquiries/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/enquiries/${id}`, { method: "DELETE" }),
};

export const adminAPI = {
  register: (data) => request("/admin/register", { method: "POST", body: data }),
  login: (data) => request("/admin/login", { method: "POST", body: data }),
  getProfile: () => request("/admin/profile"),
  getAll: () => request("/admin/all"),
};

export const serviceAPI = {
  getAll: (params) => request("/services", { params }),
  create: (data) => request("/services", { method: "POST", body: data }),
  update: (id, data) => request(`/services/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/services/${id}`, { method: "DELETE" }),
};

export const galleryAPI = {
  getAll: (params) => request("/gallery", { params }),
  create: (data) => request("/gallery", { method: "POST", body: data }),
  update: (id, data) => request(`/gallery/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/gallery/${id}`, { method: "DELETE" }),
};

export const faqAPI = {
  getAll: (params) => request("/faqs", { params }),
  create: (data) => request("/faqs", { method: "POST", body: data }),
  update: (id, data) => request(`/faqs/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/faqs/${id}`, { method: "DELETE" }),
};

export const contactAPI = {
  getInfo: () => request("/contact"),
  getAll: (params) => request("/contacts", { params }),
  create: (data) => request("/contacts", { method: "POST", body: data }),
  update: (id, data) => request(`/contacts/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/contacts/${id}`, { method: "DELETE" }),
};

export default {
  authAPI,
  dashboardAPI,
  courseAPI,
  studentAPI,
  enquiryAPI,
  adminAPI,
  serviceAPI,
  galleryAPI,
  faqAPI,
  contactAPI,
};
