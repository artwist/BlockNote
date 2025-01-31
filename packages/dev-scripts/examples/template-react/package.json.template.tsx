import type { Project } from "../util";

const template = (project: Project) => ({
  name: "@blocknote/example-" + project.projectSlug,
  description: "AUTO-GENERATED FILE, DO NOT EDIT DIRECTLY",
  private: true,
  version: "0.11.1",
  scripts: {
    start: "vite",
    dev: "vite",
    build: "tsc && vite build",
    preview: "vite preview",
    lint: "eslint . --max-warnings 0",
  },
  dependencies: {
    "@blocknote/core": "^0.11.1",
    "@blocknote/react": "^0.11.1",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    ...(project.config?.dependencies || {}),
  },
  devDependencies: {
    "@types/react": "^18.0.25",
    "@types/react-dom": "^18.0.9",
    "@vitejs/plugin-react": "^4.0.4",
    eslint: "^8.10.0",
    vite: "^4.4.8",
    ...(project.config?.devDependencies || {}),
  },
  eslintConfig: {
    extends: ["../../../.eslintrc.js"],
  },
  eslintIgnore: ["dist"],
});

export default template;
