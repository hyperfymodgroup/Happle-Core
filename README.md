# Happle-Core

A modern, cyberpunk-themed application framework originally implemented as a core mod for Hyperfy virtual worlds. This system provides a suite of interconnected applications and utilities designed to create immersive virtual experiences within Hyperfy environments.

## 🌟 Core Features

- **Modular Architecture**: Built with a component-based structure for easy extensibility
- **Cyberpunk UI/UX**: Featuring a distinctive cyberpunk aesthetic with neon accents and futuristic design
- **Rich Application Suite**: Includes various built-in applications for different functionalities
- **Hyperfy Integration**: Deep integration with Hyperfy's core systems and APIs

## 🔮 Implementation in Hyperfy

### Core Architecture

1. **Component Registration**
```javascript
// index.js - Core App Registration
export const coreApps = [
  {
    id: 'chat',
    name: 'Chat',
    icon: '💬',
    component: ChatApp
  },
  {
    id: 'browser',
    name: 'Browser',
    icon: '🌐',
    component: WebBrowser
  }
]
```

2. **Main Container Implementation**
```javascript
// HyperFone.js - Core Container
export function HyperFone({ children }) {
  return (
    <div css={css`
      // Cyberpunk styling and layout
      background: ${cyberpunkTheme.background};
      ${cyberpunkTheme.common.grid}
      // ... styling implementation
    `}>
      {/* Phone Frame */}
      <div css={phoneFrameStyles}>
        // Frame implementation
      </div>
      {/* Content */}
      <div css={contentStyles}>
        {children}
      </div>
    </div>
  )
}
```

### Integration Points

1. **Hyperfy World Integration**
```javascript
// Implementation in Hyperfy world
world.on('ready', () => {
  // Register HyperFone component
  world.registerComponent('happle-core', {
    component: HyperFone,
    apps: coreApps
  })
})
```

2. **Player Management**
```javascript
// Player session handling
world.on('playerJoined', (player) => {
  // Initialize player HyperFone instance
  player.spawn('happle-core', {
    position: player.position,
    rotation: player.rotation
  })
})
```

3. **Networking Implementation**
```javascript
// Network state synchronization
world.state({
  happleCore: {
    players: {},
    apps: {},
    shared: {}
  }
})

// State updates
world.onStateChange('happleCore.players', (players) => {
  // Handle player state changes
})
```

### Core Systems

1. **UI Framework**
   - Uses @firebolt-dev/css for styling
   - Implements custom cyberpunk theme system
   - Responsive layout management
   - Global style definitions

2. **Application Management**
   - Dynamic app loading system
   - State persistence
   - Inter-app communication
   - Window management

3. **Theme System**
   - Cyberpunk-inspired design tokens
   - Global style definitions
   - Consistent component styling
   - Animation system

### File Structure and Organization

```
Happle-Core/
├── core/
│   ├── HyperFone.js        # Main container
│   ├── AppWindow.js        # Window system
│   └── StatusBar.js        # Status display
├── apps/
│   ├── ChatApp.js          # Messaging (77KB)
│   ├── WebBrowser.js       # Browser (23KB)
│   ├── WalletApp.js        # Wallet (28KB)
│   └── ...
├── components/
│   ├── common/             # Shared components
│   └── ui/                 # UI elements
└── themes/
    └── cyberpunk.js        # Theme definitions
```

### Implementation Details

1. **Window Management**
```javascript
// AppWindow.js
export function AppWindow({ app, children }) {
  return (
    <div css={windowStyles}>
      <WindowHeader app={app} />
      <WindowContent>
        {children}
      </WindowContent>
    </div>
  )
}
```

2. **App Communication**
```javascript
// Inter-app messaging
export function sendAppMessage(fromApp, toApp, message) {
  world.emit('happleCore:appMessage', {
    from: fromApp,
    to: toApp,
    message
  })
}
```

3. **State Management**
```javascript
// App state handling
function useAppState(initialState) {
  const [state, setState] = useState(initialState)
  
  useEffect(() => {
    // Sync with Hyperfy world state
    world.setState(`happleCore.apps.${app.id}`, state)
  }, [state])
  
  return [state, setState]
}
```

## 🔧 Development

### Prerequisites
- Node.js 22.11.0 or higher
- npm 10.0.0 or higher
- React 18.3.1
- Modern web browser
- Hyperfy world environment

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/Happle-Core.git
```

2. Install dependencies
```bash
npm install
```

3. Development
```bash
npm run dev
```

### Integration in Hyperfy World

1. Copy the Happle-Core directory to your Hyperfy world's mods directory
2. Add the following to your world's configuration:
```javascript
// world.js
import { HappleCore } from './mods/Happle-Core'

export default {
  components: {
    'happle-core': HappleCore
  }
}
```

## 🎨 Theming System

The framework implements a comprehensive theming system through `themes.js`:

```javascript
// themes.js
export const cyberpunkTheme = {
  background: '#0a0a0a',
  primary: '#00ff9d',
  // ... theme tokens
  
  common: {
    grid: css`
      display: grid;
      grid-template-rows: auto 1fr;
    `,
    // ... common styles
  }
}
```

## 🔌 Event System

```javascript
// Core event system
const events = {
  'happleCore:ready': () => {
    // Initialize core systems
  },
  'happleCore:appLaunch': (app) => {
    // Handle app launch
  },
  'happleCore:appClose': (app) => {
    // Handle app close
  }
}

// Event registration
Object.entries(events).forEach(([event, handler]) => {
  world.on(event, handler)
})
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with 💻 by the Happle-Core Team 