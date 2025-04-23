import { logger, consoleTransport, fileAsyncTransport } from 'react-native-logs';
import RNFS from 'react-native-fs';
import { InteractionManager } from 'react-native';

// Create a base logger configuration
const baseConfig = {
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? 'debug' : 'error',
  transportOptions: {
    colors: {
      info: 'blueBright' as const,
      warn: 'yellowBright' as const,
      error: 'redBright' as const
    },
    FS: RNFS as any // Type assertion needed due to type mismatch between libraries
  },
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

// Export the logger types for type safety
export type Logger = ReturnType<typeof createFeatureLogger>;
