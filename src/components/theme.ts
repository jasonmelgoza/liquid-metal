import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EBF1FF" },
          100: { value: "#D5E2FF" },
          200: { value: "#C0D5FF" },
          300: { value: "#97BAFF" },
          400: { value: "#6895FF" },
          500: { value: "#335CFF" },
          600: { value: "#3559E9" },
          700: { value: "#1F3BAD" },
          800: { value: "#1F3BAD" },
          900: { value: "#182F8B" },
          950: { value: "#122368" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: {
              _light: "{colors.brand.600}",
              _dark: "{colors.brand.500}",
            },
          },
          contrast: {
            value: {
              _light: "{colors.brand.100}",
              _dark: "{colors.brand.50}",
            },
          },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
