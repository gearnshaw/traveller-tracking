import { logger, consoleTransport } from 'react-native-logs';
import { InteractionManager } from 'react-native';

// Create a base logger configuration
const baseConfig = {
  transport: consoleTransport, // Always use console transport in development
  severity: __DEV__ ? 'debug' : 'error',
  transportOptions: {
    colors: {
      info: 'blueBright' as const,
      warn: 'yellowBright' as const,
      error: 'redBright' as const
    }
  },
  fixedExtLvlLength: true,
  async: true,
  asyncFunc: InteractionManager.runAfterInteractions
};

// Create the base logger
const baseLogger = logger.createLogger(baseConfig);

// Export a function to create feature-specific loggers
export const createFeatureLogger = (featureName: string) => {
  return baseLogger.extend(featureName);
};

// Export a default logger for general use
export const log = baseLogger;
export const debugLog = baseLogger.extend('👾👾👾👾');

log.debug('hello world');

// Export the logger types for type safety
export type Logger = ReturnType<typeof createFeatureLogger>;
