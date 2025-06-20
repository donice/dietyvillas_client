import { ALL } from "dns";

export type RouteType = {
  name: string;
  href: string | ((id: string) => string);
  sec: "public" | "protected" | "admin";
};

export const PAGE_ROUTES = {
  AUTH: {
    FORGOT_PASSWORD: { name: "Forgot Password", href: "/forgot-password" },
    SIGN_IN: { name: "Sign In", href: "/signin" },
  },
  DASHBOARD: { name: "Dashboard", href: "/dashboard", sec: "protected" },
  TICKETS: {
    ALL: { name: "Tickets", href: "/tickets", sec: "protected" },
    CREATE: {
      name: "Create Ticket",
      href: "/tickets/create",
      sec: "protected",
    },
    VIEW: {
      name: "View Ticket",
      href: (id: string) => `/tickets/${id}`,
      sec: "protected",
    },
    ASSIGNEES: {
      name: "Assignees",
      href: "/tickets/assignees",
      sec: "protected",
    },
  },
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/core/account/login",
    FORGOT_PASSWORD: "/api/core/account/forget-password",
    FORGOT_PASSWORD_VERIFICATION:
      "/api/core/account/forget-password/verification",
  },
  PROFILE: {
    GET_PROFILE: "/api/core/user/account",
    UPDATE_PROFILE: "/api/core/user/update-profile",
    UPDATE_PROFILE_PICTURE: "/api/core/user/update-profile-photo",
    CHANGE_PASSWORD: "/api/core/user/change-password",
  },
  DASHBOARD: {
    TICKETS: "/api/core/dashboard/tickets",
    PLATFORM: "/api/core/dashboard/platform",
    FREQUENT_ISSUES: "/api/core/dashboard/frequent-issues",
    TICKET_ASSIGNEES: "/api/core/dashboard/ticket-assignees",
    DAILY_TICKET_OVERVIEW: "/api/core/dashboard/ticket-overview",
  },
  TICKETS: {
    ALL_TICKETS: "/api/core/tickets/all",
    CREATE_TICKET: "/api/core/tickets/create",
    POST_COMMENT: "/api/core/tickets/comment/create",
    TICKET_UPDATE: `/api/core/tickets/update`,
    TICKET_DETAILS: (id: string) => `/api/core/tickets/details/${id}`,
    TICKET_COMMENTS: (id: string) => `/api/core/tickets/${id}/comments`,

  },
  REPORTS: {
    ALL: "/api/core/reports/filters",
    ALL_REPORTS: "/api/core/reports/platform",
    ALL_REPORTS_BY_EMPLOYEES: "/api/core/reports/employee",
    ALL_REPORTS_BY_DATE: "/api/core/reports/date",
    ALL_REPORTS_PRIORITY: "/api/core/reports/priority",
    ALL_REPORTS_CATEGORY: "/api/core/reports/category",
  },
  ACCOUNT: {
    ALL_EMPLOYEES: "/api/core/employees",
    CHANGE_PASSWORD: "/api/core/user/change-password",
    ENABLE_DISABLE_USER: "/api/core/employees/disable-enable",
    ENABLE_FOR_PLATFORM_NOTIFICATION: "/api/core/tickets/enable-for-platform-notification",
  },
  CATEGORY: {
    CREATE: "/api/core/category/create",
    EDIT: "/api/core/category/edit",
    ALL_CATEGORIES: "/api/core/category/all",
    MAIN_CATEGORIES: "/api/core/category/main",
    SUB_CATEGORIES: (id: string) =>
      `/api/core/category/sub/${id}`,
  },
  SETTINGS: {
    ADD_EMPLOYEE: "/api/core/employees/create",
  },
  ROLES: "/api/core/user/roles",
  AUDIT_LOGS: "/api/core/reports/audit-logs"
} as const;
