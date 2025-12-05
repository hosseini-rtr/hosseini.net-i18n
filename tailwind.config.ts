import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/[locale]/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: [
          "Vazirmatn",
          "var(--font-vazirmatn)",
          "system-ui",
          "sans-serif",
        ],
        inter: [
          "Inter",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              color: "#e2e8f0",
              backgroundColor: "rgba(63, 63, 70, 0.4)",
              paddingLeft: "0.375rem",
              paddingRight: "0.375rem",
              paddingTop: "0.125rem",
              paddingBottom: "0.125rem",
              borderRadius: "0.375rem",
              fontWeight: "400",
              fontSize: "0.875em",
              border: "1px solid rgba(75, 85, 99, 0.5)",
            },
            "pre code": {
              backgroundColor: "transparent",
              border: "none",
              padding: "0",
              color: "#e2e8f0",
            },
            pre: {
              backgroundColor: "rgba(31, 41, 55, 0.5)",
              border: "1px solid rgba(75, 85, 99, 0.5)",
              borderRadius: "0.5rem",
              padding: "1rem",
              overflow: "auto",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--accent))",
              borderLeftWidth: "4px",
              paddingLeft: "1.5rem",
              fontStyle: "italic",
              color: "#d1d5db",
              backgroundColor: "rgba(31, 41, 55, 0.3)",
              borderRadius: "0 0.5rem 0.5rem 0",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            },
            "blockquote p": {
              margin: "0",
            },
            h1: {
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              marginTop: "0",
              marginBottom: "1rem",
            },
            h2: {
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h3: {
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1.5rem",
              lineHeight: "2rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h4: {
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h5: {
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h6: {
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1rem",
              lineHeight: "1.5rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            p: {
              color: "#e5e7eb",
              marginBottom: "1rem",
              lineHeight: "1.75",
            },
            strong: {
              color: "#ffffff",
              fontWeight: "700",
            },
            em: {
              color: "#d1d5db",
              fontStyle: "italic",
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginBottom: "1.5rem",
            },
            ol: {
              listStyleType: "decimal",
              paddingLeft: "1.5rem",
              marginBottom: "1.5rem",
            },
            li: {
              color: "#e5e7eb",
              marginBottom: "0.5rem",
            },
            "ul ul, ol ul": {
              listStyleType: "circle",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            "ol ol, ul ol": {
              listStyleType: "lower-alpha",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            table: {
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1.5rem",
            },
            "table th": {
              backgroundColor: "rgba(55, 65, 81, 0.5)",
              border: "1px solid rgba(75, 85, 99, 0.5)",
              padding: "0.5rem 1rem",
              textAlign: "left",
              fontWeight: "600",
              color: "#ffffff",
            },
            "table td": {
              border: "1px solid rgba(75, 85, 99, 0.5)",
              padding: "0.5rem 1rem",
              color: "#e5e7eb",
            },
            "table tr:nth-child(even)": {
              backgroundColor: "rgba(31, 41, 55, 0.3)",
            },
            hr: {
              borderColor: "rgba(75, 85, 99, 0.5)",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            a: {
              color: "hsl(var(--accent))",
              textDecoration: "underline",
              textDecorationColor: "hsl(var(--accent))",
              textUnderlineOffset: "2px",
            },
            "a:hover": {
              color: "hsl(var(--accent) / 0.8)",
              textDecorationColor: "hsl(var(--accent) / 0.8)",
            },
            img: {
              borderRadius: "0.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            // RTL support
            "[dir='rtl'] &": {
              textAlign: "right",
            },
            "[dir='rtl'] blockquote": {
              borderLeftColor: "transparent",
              borderRightColor: "hsl(var(--accent))",
              borderLeftWidth: "0",
              borderRightWidth: "4px",
              paddingLeft: "0",
              paddingRight: "1.5rem",
            },
            "[dir='rtl'] ul, [dir='rtl'] ol": {
              paddingLeft: "0",
              paddingRight: "1.5rem",
            },
            "[dir='rtl'] table th, [dir='rtl'] table td": {
              textAlign: "right",
            },
          },
        },
        invert: {
          css: {
            color: "#e5e7eb",
            code: {
              color: "#e2e8f0",
              backgroundColor: "rgba(63, 63, 70, 0.4)",
              border: "1px solid rgba(75, 85, 99, 0.5)",
            },
            "pre code": {
              backgroundColor: "transparent",
              border: "none",
              color: "#e2e8f0",
            },
            pre: {
              backgroundColor: "rgba(31, 41, 55, 0.5)",
              border: "1px solid rgba(75, 85, 99, 0.5)",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--accent))",
              color: "#d1d5db",
              backgroundColor: "rgba(31, 41, 55, 0.3)",
            },
            h1: {
              color: "#ffffff",
            },
            h2: {
              color: "#ffffff",
            },
            h3: {
              color: "#ffffff",
            },
            h4: {
              color: "#ffffff",
            },
            h5: {
              color: "#ffffff",
            },
            h6: {
              color: "#ffffff",
            },
            strong: {
              color: "#ffffff",
            },
            em: {
              color: "#d1d5db",
            },
            li: {
              color: "#e5e7eb",
            },
            "table th": {
              backgroundColor: "rgba(55, 65, 81, 0.5)",
              color: "#ffffff",
            },
            "table td": {
              color: "#e5e7eb",
            },
            hr: {
              borderColor: "rgba(75, 85, 99, 0.5)",
            },
            a: {
              color: "hsl(var(--accent))",
            },
            "a:hover": {
              color: "hsl(var(--accent) / 0.8)",
            },
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
