# Traveller Tracking App

A modern React Native application for tracking travel experiences, built with Expo.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app
   ```bash
   npx expo start
   ```

You can run the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Project Architecture

The project follows a feature-based architecture:

```
src/
  app/              # Expo Router pages and layouts
  features/         # Feature-specific code
    {feature}/
      components/   # Feature UI components
      hooks/        # Feature hooks
      api.ts        # Feature API calls
      types.ts      # Feature types
  shared/          # Shared code
    components/    # Reusable components
    hooks/        # Common hooks
    utils/        # Utilities
  services/        # Core services
```

### Key Features

- File-based routing with Expo Router
- Feature-based organization
- Shared component library
- Centralized services

## Tech Stack

### Core

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation

### State Management

- **Zustand** for state management
- **Firebase/Firestore** for data persistence
- **Firebase Analytics** for user tracking

### UI & Styling

- **TWRNC** (Tailwind React Native Classnames)
- Custom design system with component hierarchy:
  - Base components (fundamental UI blocks)
  - Common components (reusable combinations)
  - Composite components (complex shared components)
  - Feature components (feature-specific UI)

### Testing

- **Jest** for unit testing
- **React Native Testing Library** for component testing
- **Maestro** for E2E testing

## Development Guidelines

1. Follow the feature-based architecture
2. Use TypeScript for all new code
3. Write tests for new features
4. Follow the design system component hierarchy
5. Use Zustand for state management
6. Implement analytics for new features

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Project architecture details](docs/project-architecture.md)
- [Tech stack details](docs/tech-stack.md)
- [Design system guide](docs/design-system.md)

## Contributing

1. Create a new feature directory under `src/features/`
2. Follow the feature structure guidelines
3. Use shared components when possible
4. Add tests for your changes
5. Update documentation as needed
