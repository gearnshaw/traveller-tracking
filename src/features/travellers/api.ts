import { Traveller } from './types';

export const travellersApi = {
  getTravellers: async (): Promise<Traveller[]> => {
    // Placeholder data
    return [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      }
    ];
  }
};
