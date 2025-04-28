import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = false;
const token = process.env.MIXPANEL_TOKEN || '';
const mixpanel = new Mixpanel(token, trackAutomaticEvents);
mixpanel.init();

export const track = (event: string, properties?: Record<string, any>) => {
  mixpanel.track(event, properties);
};

export const flush = () => {
  mixpanel.flush();
};
