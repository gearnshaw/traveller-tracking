import { createFeatureLogger } from '@/services/logger';

// Create a logger specific to the auth feature
export const authLogger = createFeatureLogger('AUTH');
