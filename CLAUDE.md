# Who Got Next - Frontend

Pickup basketball game tracker. React + TypeScript + Vite + Tailwind CSS.

## Quick Start

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
```

Backend runs at `http://localhost:3001` (see `src/api.tsx`).

## Architecture

- **React 18** with React Router 6 (client-side routing)
- **Vite + SWC** for fast builds
- **Tailwind CSS** for styling
- **@dnd-kit** for drag-and-drop player reordering
- **Context API** for state (UserContext, ToastContext, settingsContext)
- **localStorage** for persistence (players, game settings, auth token)

### Route Structure

| Route | Component | Auth? |
|---|---|---|
| `/` | Home | No |
| `/login` | LoginPage | Guests only |
| `/signup` | RegisterPage | Guests only |
| `/basketball` | BasketballPage | No |
| `/guest/basketball` | QuickBasketballPage | No |
| `/basketball/your-leagues` | YourLeaguesPage | Yes |
| `/basketball/create-league` | CreateLeaguePage | Yes |
| `/profile` | ProfilePage | Yes |

### Key Files

- `src/App.tsx` - Root component, auth logic, context providers
- `src/RoutesList.tsx` - All route definitions
- `src/api.tsx` - Backend API client (`whoGotNextApi` class)
- `src/types.tsx` - TypeScript types
- `src/Utils.tsx` - Shared constants (DEFAULT_SETTINGS)
- `src/UserContext.tsx` - Auth/user state provider
- `src/NavBar.tsx` - Navigation bar

## DO NOT MODIFY - Protected Files

The guest basketball feature (`/guest/basketball`) is **live and in use by real users**. Do not modify any of the following files:

- `src/quickbasketball/` - THE ENTIRE DIRECTORY. Every file in it:
  - `QuickBasketballPage.tsx`
  - `QuickBasketballPlayerList.tsx`
  - `QuickPlayerCard.tsx`
  - `QuickAddPlayer.tsx`
  - `Scoreboard.tsx`
  - `TeamScore.tsx`
  - `TeamScoreNext.tsx`
  - `TeamScoreGameNotStarted.tsx`
  - `Clock.tsx`
  - `GameEndPopUp.tsx`
  - `GameEndPlayerCard.tsx`
  - `GameEndPopUpStyle.tsx`
  - `CardPopUp.tsx`
  - `CardPopUpStyle.tsx`
  - `SettingsButton.tsx`
- `src/pages/BasketballPage.tsx` - The basketball hub page
- `src/audio/` - Sound files used by the guest feature

Also do not modify shared files in ways that would break the guest basketball feature:
- `src/types.tsx` - Contains `Player`, `Settings`, `quickBasketballContext` types used by guest basketball. You may ADD new types but do not rename or remove existing ones.
- `src/Utils.tsx` - Contains `DEFAULT_SETTINGS` used by guest basketball. You may ADD new exports but do not change existing ones.
- `src/RoutesList.tsx` - Do not remove or change the `/guest/basketball` or `/basketball` routes. You may add new routes.

## Conventions

- Components are PascalCase `.tsx` files
- Pages live in `src/pages/`
- Tailwind for all styling (no CSS modules)
- API calls go through `src/api.tsx`
- Auth token stored in localStorage as `authToken`
