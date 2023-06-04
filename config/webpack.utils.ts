import type { Configuration } from "webpack";

const DEVELOPMENT_ENV = "development";
const PRODUCTION_ENV = "production";
const TESTING_ENV = "testing";
const VALID_ENVIRONMENTS = [DEVELOPMENT_ENV, PRODUCTION_ENV, TESTING_ENV] as const;

export type Environment = (typeof VALID_ENVIRONMENTS)[number];

export const isEnvironment = (environment: string): environment is Environment =>
    VALID_ENVIRONMENTS.includes(environment as Environment);

export const getEnvironment = () => {
    const environment = process.env.NODE_ENV;
    if (!environment || !isEnvironment(environment)) {
        throw new Error(`${environment} is not a valid environment`);
    }
    return environment;
};

const ENVIRONMENT = getEnvironment();

export const isProduction = () => ENVIRONMENT === PRODUCTION_ENV;
export const getMode = (): Configuration["mode"] => (ENVIRONMENT === PRODUCTION_ENV ? PRODUCTION_ENV : DEVELOPMENT_ENV);

export const DEV_SERVER_PORT = 9000;
export const getBackendBaseUrl = () => {
    const backendBaseUrl = process.env.BACKEND_BASE_URL;
    if (isProduction()) {
        return backendBaseUrl ?? "$BACKEND_BASE_URL";
    }
    return `http://localhost:${DEV_SERVER_PORT}`;
};
