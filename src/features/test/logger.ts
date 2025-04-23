import { createFeatureLogger } from '@/services/logger';

// Create a logger specific to the test feature
export const testLogger = createFeatureLogger('TEST');
