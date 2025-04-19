export default () => ({
  initializeApp: jest.fn(),
  apps: [],
  app: jest.fn(),
  auth: () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    currentUser: null,
    onAuthStateChanged: jest.fn(),
    sendPasswordResetEmail: jest.fn()
  })
});
