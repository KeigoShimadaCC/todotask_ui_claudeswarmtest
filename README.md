# TODO Tracker Dashboard

A modern, professional dashboard for tracking and managing TODO comments in your codebase.

## Features

- **Dashboard View**: High-level metrics and insights at a glance
- **Trend Visualization**: Track TODO count over time with interactive charts
- **Critical TODOs**: Quickly identify and address high-priority items
- **Hotspot Analysis**: Find files with the most tech debt
- **Activity Feed**: Monitor recent TODO additions and resolutions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Query (ready to integrate)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
dashboard/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with header and nav
│   ├── page.tsx           # Dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Top header with search and settings
│   ├── Navigation.tsx     # Main navigation tabs
│   ├── MetricCard.tsx     # Metric display card
│   ├── TrendChart.tsx     # Line chart for trends
│   ├── CriticalTodosList.tsx  # Critical items list
│   ├── HotspotsPanel.tsx      # File hotspots
│   └── ActivityFeed.tsx       # Recent activity
├── lib/                   # Utilities and data
│   └── mockData.ts        # Mock data for development
└── types/                 # TypeScript type definitions
    └── index.ts           # Shared types
```

## Current Status

✅ **Completed:**
- Project setup with Next.js 14 + TypeScript
- Tailwind CSS configuration with design system colors
- All main dashboard components
- Mock data for development
- Responsive layout
- Professional UI matching design spec

🔄 **Next Steps (Backend Integration):**
- Connect to real TODO tracker API
- Add React Query for data fetching
- Implement real-time updates
- Add loading states and error handling

## Design System

### Colors
- **Critical**: `#D32F2F` (red)
- **High Priority**: `#F57C00` (orange)
- **Medium**: `#FBC02D` (yellow)
- **Low**: `#757575` (gray)
- **Success**: `#388E3C` (green)
- **Info**: `#1976D2` (blue)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Monospace**: SF Mono, Monaco, Consolas

## License

MIT
