declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    text: string;
    header: string;
  }
}

export const theme = {
  colors: {
    primary: "#2563eb",
    danger: "#dc2626",
    success: "#16a34a",
    gray: "#6b7280",
    bg: "#ffffff",
  },
};

export const lightTheme = {
  bg: "#f8fafc",
  text: "#0f172a",
  header: "linear-gradient(135deg, #005f6a, #00b3a4)",
};

export const darkTheme = {
  bg: "#020617",
  text: "#e5e7eb",
  header: "linear-gradient(135deg, #020617, #0f172a)",
};
