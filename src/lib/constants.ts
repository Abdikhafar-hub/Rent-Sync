
export const APP_NAME = "RentalSync";

export const USER_ROLES = {
  ADMIN: "admin",
  TENANT: "tenant",
};

export const UNIT_STATUS = {
  OCCUPIED: "occupied",
  VACANT: "vacant",
  MAINTENANCE: "maintenance",
};

export const PAYMENT_TYPES = {
  RENT: "rent",
  UTILITY: "utility",
  LATE_FEE: "late_fee",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
};

export const MAINTENANCE_STATUS = {
  SUBMITTED: "submitted",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const MOVE_OUT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  DENIED: "denied",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TENANT: {
    DASHBOARD: "/tenant",
    PAYMENTS: "/tenant/payments",
    PAYMENT_HISTORY: "/tenant/payment-history",
    MAINTENANCE: "/tenant/maintenance",
    DOCUMENTS: "/tenant/documents",
    MOVE_OUT: "/tenant/move-out",
    MESSAGES: "/tenant/messages",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    PROPERTIES: "/admin/properties",
    TENANTS: "/admin/tenants",
    PAYMENTS: "/admin/payments",
    MAINTENANCE: "/admin/maintenance",
    MOVE_OUT: "/admin/move-out",
    DOCUMENTS: "/admin/documents",
    MESSAGES: "/admin/messages",
    ANALYTICS: "/admin/analytics",
  },
};
