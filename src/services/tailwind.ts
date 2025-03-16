import { create } from "twrnc";
import type { Instance as TwInstance } from "twrnc";
import config from "../../tailwind.config.js";

export interface TailwindService {
  /**
   * Apply Tailwind classes to create styles
   * @param classes - Tailwind class string
   */
  style: TwInstance["style"];
}

const createTailwindService = (): TailwindService => {
  const tw = create(config);

  return {
    style: tw.style.bind(tw),
  };
};

// Export the singleton instance
export const tailwindService = createTailwindService();

// Export a convenience method for the common use case
export const tw = tailwindService.style;
