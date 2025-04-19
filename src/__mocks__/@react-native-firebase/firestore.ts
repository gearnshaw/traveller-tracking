export const collection = jest.fn();
export const addDoc = jest.fn();
export const onSnapshot = jest.fn();
export const query = jest.fn();
export const orderBy = jest.fn();
export const limit = jest.fn();
export const getDocs = jest.fn();
export const doc = jest.fn();
export const updateDoc = jest.fn();
export const deleteDoc = jest.fn();
export const getDoc = jest.fn();
export const setDoc = jest.fn();

export const Timestamp = {
  fromDate: jest.fn().mockImplementation((date) => ({
    toDate: () => date,
    toMillis: () => date.getTime(),
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: (date.getTime() % 1000) * 1000000
  }))
};

export default () => ({
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  Timestamp
});
