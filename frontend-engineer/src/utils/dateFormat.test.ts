import { formatMessageDate } from './dateFormat';

describe('dateFormat', () => {
  it('formats an ISO timestamp for the message date caption', () => {
    expect(formatMessageDate('2026-07-07T18:26:02.625Z')).toBe(
      '07 July 2026 20:26'
    );
  });
});
