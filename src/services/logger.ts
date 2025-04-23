import { logger, consoleTransport, fileAsyncTransport } from 'react-native-logs';
import { InteractionManager } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Create a base logger configuration
const baseConfig = {
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? 'debug' : 'info',
  transportOptions: {
    FS: FileSystem as any, // Type assertion needed as react-native-logs expects a different type
    fileName: '{date-today}-log.txt',
    fileNameDateType: 'iso' as const,
    colors: {
      info: 'blueBright' as const,
      warn: 'yellowBright' as const,
      error: 'redBright' as const
    }
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
