import { formatRelativeTime } from './formatRelativeTime';

describe('formatRelativeTime', () => {
  const mockDate = new Date('2024-03-20T12:00:00Z');
  const mockNow = mockDate.getTime();
  const formattedNow = mockDate.toISOString();

  const testData = [
    {
      date: mockNow - 15 * 1000, // 15 seconds ago
      expected: 'just now'
    },
    {
      date: mockNow - 30 * 60 * 1000, // 30 minutes ago
      expected: 'in the last hour'
    },
    {
      date: mockNow - 60 * 60 * 1000, // 1 hour ago
      expected: '1 hour ago'
    },
    {
      date: mockNow - 2 * 60 * 60 * 1000, // 2 hours ago
      expected: '2 hours ago'
    },
    {
      date: mockNow - 24 * 60 * 60 * 1000, // 1 day ago
      expected: '1 day ago'
    },
    {
      date: mockNow - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      expected: '2 days ago'
    },
    {
      date: mockNow - 7 * 24 * 60 * 60 * 1000, // 1 week ago
      expected: '1 week ago'
    },
    {
      date: mockNow - 2 * 7 * 24 * 60 * 60 * 1000, // 2 weeks ago
      expected: '2 weeks ago'
    },
    {
      date: mockNow - 30 * 24 * 60 * 60 * 1000, // 1 month ago
      expected: '1 month ago'
    },
    {
      date: mockNow - 2 * 30 * 24 * 60 * 60 * 1000, // 2 months ago
      expected: '2 months ago'
    },
    {
      date: mockNow - 365 * 24 * 60 * 60 * 1000, // 1 year ago
      expected: '1 year ago'
    },
    {
      date: mockNow - 2 * 365 * 24 * 60 * 60 * 1000, // 2 years ago
      expected: '2 years ago'
    }
  ];

  testData.forEach(({ date, expected }) => {
    const dateStr = new Date(date).toISOString();
    it(`should return "${expected}" for ${dateStr} relative to ${formattedNow}`, () => {
      expect(formatRelativeTime(date, mockNow)).toBe(expected);
    });
  });

  it('should work with Date objects', () => {
    const oneHourAgo = new Date(mockNow - 60 * 60 * 1000);
    expect(formatRelativeTime(oneHourAgo, mockNow)).toBe('1 hour ago');
  });

  it('should use current time when now parameter is not provided', () => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const result = formatRelativeTime(oneHourAgo);
    expect(result).toBe('1 hour ago');
  });
});
