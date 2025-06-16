# SportsBet Depth Chart

A responsive single-page web application for managing depth charts across different sports. Currently supports NFL and Soccer, with an extensible architecture that makes it easy to add more sports.

## Features

- Depth Chart management
- Responsive UI
- Support for multiple sports (NFL, Soccer)
- Easy to extend for new sports
- Data persistence via localStorage
- Comprehensive test coverage

## Key Technologies

The project uses the following packages:
- **React (v19)**
- **Vite**
- **TypeScript**
- **Styled Components**
- **Jest & Testing Library**
- **ESLint & Prettier**

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jwcheongdev/sportsbet-depth-chart.git
cd sportsbet-depth-chart
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`  (Vite's default development port)

## Testing

Run the test suite:

```bash
npm test
```

## Linting

The project uses ESLint and Prettier for code quality and consistent formatting. To run the linter:

```bash
npm run lint
```

The linting configuration can be found in `.eslint.config.js` and `.prettierrc` files.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

The preview will be available at `http://localhost:4173` (Vite's default preview port)

## Adding a New Sport

The application is designed to be easily extensible for new sports. To add a new sport (e.g. Basketball):

1. Update the sport configuration in `src/types/depthChart.ts`:
   - Add the new sport to the `Sport` type
   - Add the new sport to the `AVAILABLE_SPORTS` constant
   - Add the new sport to the `POSITIONS` object along with an array of position names

For example, to add Basketball:
```typescript
export type Sport = 'NFL' | 'Soccer' | 'Basketball';

export const AVAILABLE_SPORTS = ['NFL', 'Soccer', 'Basketball'] as const;

export const POSITIONS:  { [key in Sport]: string[] } = {
    NFL: ['QB', 'WR', 'RB', 'TE', 'K', 'P', 'KR', 'PR'],
    Soccer: ['GK', 'RB', 'LB', 'CDM', 'CAM', 'RW', 'LW', 'SS', 'ST'],
    Basketball: ['PG', 'SG', 'SF', 'PF', 'C']
}
```

2. Update the initial state in `src/App.tsx` to include the new sport:
```typescript
const initialDepthChart: DepthChart = useMemo(() => ({
    NFL: Object.fromEntries(POSITIONS.NFL.map((position) => [position, []])),
    Soccer: Object.fromEntries(POSITIONS.Soccer.map((position) => [position, []])),
    Basketball: Object.fromEntries(POSITIONS.Basketball.map((position) => [position, []])),
}), []);
```

3. Clear existing localStorage data
This step is necessary because the existing localStorage data won't include the new sport's structure, which could cause errors.

The existing depth chart structure should automatically work with your new sport.

## Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # React components
├── hooks/         # Custom React hooks
├── mocks/         # Test mocks
├── theme/         # Styling and theming
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```
