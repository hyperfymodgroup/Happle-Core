# Happle-Core

A modern, cyberpunk-themed application framework reverse engineered from Hyperfy's core systems. This documentation details the exact implementation and modifications made to create a standalone version of the HyperFone core system.

## 🔬 Reverse Engineering Details

### Original Hyperfy Files Modified

1. **Core UI System** (`/src/client/components/`)
   ```
   hyperfy/src/client/components/
   ├── HyperFone.js         # Main phone interface (17KB)
   ├── hyperfoneOS.js       # Operating system layer (14KB)
   ├── GUI.js               # Base GUI system (4.0KB)
   └── hyperfone_core/      # Core components directory
   ```

2. **Component Integration** (`/src/client/components/hyperfone_core/`)
   ```
   hyperfone_core/
   ├── AppLauncher.js       # App management system
   ├── AppStore.js          # Application marketplace
   ├── AppWindow.js         # Window management
   ├── ChatApp.js           # Messaging system
   └── ... (other apps)
   ```

### Core System Modifications

1. **HyperFone Base System** (`HyperFone.js`)
```javascript
// Original Hyperfy Implementation
import { GUI } from './GUI'
import { useWorld } from '../hooks/useWorld'

export function HyperFone() {
  const world = useWorld()
  // ... original implementation
}

// Modified Standalone Version
import { css } from '@firebolt-dev/css'
import { cyberpunkTheme } from './themes'

export function HyperFone({ children }) {
  // Standalone implementation
  return (
    <div css={baseStyles}>
      <PhoneFrame />
      <AppContainer>{children}</AppContainer>
    </div>
  )
}
```

2. **Operating System Layer** (`hyperfoneOS.js`)
```javascript
// Original Hyperfy Integration
const hyperfoneOS = {
  apps: new Map(),
  windows: new Map(),
  state: new WorldState()
}

// Standalone Implementation
export const hyperfoneOS = {
  apps: new Map(),
  windows: new Map(),
  state: new LocalState(),
  
  // Added standalone functionality
  registerApp(app) {
    this.apps.set(app.id, app)
    this.emit('appRegistered', app)
  }
}
```

### Core Components Extraction

1. **GUI System** (`GUI.js`)
```javascript
// Original Hyperfy Implementation
export function GUI({ world, children }) {
  return (
    <WorldContext.Provider value={world}>
      {children}
    </WorldContext.Provider>
  )
}

// Standalone Version
export function GUI({ children }) {
  return (
    <HappleCoreProvider>
      <ThemeProvider theme={cyberpunkTheme}>
        {children}
      </ThemeProvider>
    </HappleCoreProvider>
  )
}
```

2. **State Management** (`state.js`)
```javascript
// Original Hyperfy World State
class WorldState {
  constructor(world) {
    this.world = world
    this.subscribers = new Map()
  }
}

// Standalone State Implementation
class LocalState {
  constructor() {
    this.state = {}
    this.subscribers = new Map()
  }
  
  setState(path, value) {
    // Local state implementation
  }
}
```

### Network Layer Adaptation

1. **Event System** (`events.js`)
```javascript
// Original Hyperfy Events
world.on('playerJoined', player => {
  // Hyperfy-specific handling
})

// Standalone Event System
class EventEmitter {
  constructor() {
    this.events = new Map()
  }
  
  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event).add(handler)
  }
  
  emit(event, data) {
    const handlers = this.events.get(event)
    if (handlers) {
      handlers.forEach(handler => handler(data))
    }
  }
}
```

2. **Network Communication** (`network.js`)
```javascript
// Original Hyperfy Network
world.state({
  hyperfone: {
    // World state structure
  }
})

// Standalone Network Layer
export class NetworkManager {
  constructor() {
    this.connections = new Map()
    this.state = new LocalState()
  }
  
  connect(peerId) {
    // P2P connection implementation
  }
  
  syncState(path, value) {
    // State synchronization
  }
}
```

## 🔮 Implementation Details

### Core Systems Replication

1. **Window Management System**
```javascript
// Original Hyperfy Window System
class WindowManager {
  constructor(world) {
    this.world = world
    this.windows = new Map()
  }
}

// Standalone Window System
export class WindowManager {
  constructor() {
    this.windows = new Map()
    this.activeWindow = null
    this.events = new EventEmitter()
  }
  
  createWindow(app) {
    const window = new AppWindow(app)
    this.windows.set(app.id, window)
    return window
  }
  
  focusWindow(windowId) {
    const window = this.windows.get(windowId)
    if (window) {
      this.activeWindow = window
      this.events.emit('windowFocused', window)
    }
  }
}
```

2. **App Management System**
```javascript
// App Registry Implementation
export class AppRegistry {
  constructor() {
    this.apps = new Map()
    this.events = new EventEmitter()
  }
  
  registerApp(appDefinition) {
    const app = new App(appDefinition)
    this.apps.set(app.id, app)
    this.events.emit('appRegistered', app)
    return app
  }
  
  launchApp(appId) {
    const app = this.apps.get(appId)
    if (app) {
      const instance = app.createInstance()
      this.events.emit('appLaunched', instance)
      return instance
    }
  }
}
```

### File Structure Comparison

```
Original Hyperfy Structure          Standalone Implementation
------------------------          ------------------------
/src/client/                     /Happle-Core/
  ├── components/                  ├── core/
  │   ├── HyperFone.js            │   ├── HyperFone.js
  │   ├── hyperfoneOS.js          │   ├── OS.js
  │   └── GUI.js                  │   └── GUI.js
  └── hyperfone_core/             └── apps/
      ├── AppLauncher.js              ├── AppLauncher.js
      ├── ChatApp.js                  ├── ChatApp.js
      └── ...                         └── ...
```

## 🔧 Development

### Building from Hyperfy Source

1. Extract core components:
```bash
# Create core directory structure
mkdir -p Happle-Core/core Happle-Core/apps

# Copy and modify core files
cp hyperfy/src/client/components/HyperFone.js Happle-Core/core/
cp hyperfy/src/client/components/hyperfoneOS.js Happle-Core/core/OS.js
```

2. Modify dependencies:
```javascript
// Remove Hyperfy-specific imports
- import { useWorld } from '../hooks/useWorld'
+ import { useHappleCore } from '../hooks/useHappleCore'

// Replace world references
- world.state({})
+ happleCore.state({})
```

3. Implement standalone features:
```javascript
// Add standalone state management
export class HappleCoreState {
  constructor() {
    this.state = {}
    this.events = new EventEmitter()
  }
  
  setState(path, value) {
    // Implementation
  }
  
  getState(path) {
    // Implementation
  }
}
```

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

## 🔄 Future2 Branch Improvements

### Core System Enhancements

1. **Enhanced GUI System**
```javascript
// New GUI Implementation
export function GUI({ world }) {
  const [ref, width, height] = useElemSize()
  return (
    <div ref={ref} css={baseStyles}>
      {width > 0 && <Content world={world} width={width} height={height} />}
    </div>
  )
}

// Responsive Content Handler
function Content({ world, width, height }) {
  const small = width < 600
  const touch = useMemo(() => 
    navigator.userAgent.match(/OculusBrowser|iPhone|iPad|iPod|Android/i), 
  [])
  
  // Enhanced state management
  const [ready, setReady] = useState(false)
  const [context, setContext] = useState(null)
  const [inspect, setInspect] = useState(null)
  const [code, setCode] = useState(false)
  const [chat, setChat] = useState(() => !touch)
  const [avatar, setAvatar] = useState(null)
  const [disconnected, setDisconnected] = useState(false)
  
  // Improved event handling
  useEffect(() => {
    const events = {
      ready: setReady,
      context: setContext,
      inspect: setInspect,
      code: setCode,
      avatar: setAvatar,
      disconnect: setDisconnected
    }
    
    // Register events
    Object.entries(events).forEach(([event, handler]) => {
      world.on(event, handler)
    })
    
    // Cleanup
    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        world.off(event, handler)
      })
    }
  }, [])
}
```

2. **Advanced Inspection System**
```javascript
// Enhanced InspectPane with Copy/Paste Support
export function InspectPane({ world, entity }) {
  // Global store for copied values
  const copiedValues = {
    current: null
  }
  
  // Entity type handling
  if (entity.isApp) {
    return <AppPane world={world} app={entity} />
  }
  if (entity.isPlayer) {
    return <PlayerPane world={world} player={entity} />
  }
}

// Improved Field Management
function Field({ world, config, field, value, modify }) {
  const handleCopy = () => {
    copiedValues.current = value
  }
  
  const handlePaste = () => {
    if (copiedValues.current !== null) {
      modify(field.key, copiedValues.current)
    }
  }
}
```

3. **Enhanced State Management**
```javascript
// Improved state synchronization
function useAppState(initialState) {
  const [state, setState] = useState(initialState)
  const [syncing, setSyncing] = useState(false)
  
  useEffect(() => {
    if (!syncing) {
      world.setState(`happleCore.apps.${app.id}`, state)
    }
  }, [state])
  
  // State sync with debounce
  const syncState = useCallback(
    debounce((newState) => {
      setSyncing(true)
      world.setState(`happleCore.apps.${app.id}`, newState)
      setSyncing(false)
    }, 100),
    []
  )
  
  return [state, setState, syncState]
}
```

### New Features

1. **Improved Touch Support**
   - Enhanced mobile device detection
   - Optimized touch interactions
   - Responsive UI adjustments for small screens

2. **Enhanced Copy/Paste System**
   - Global value storage
   - Cross-component value transfer
   - Type-safe value handling

3. **Advanced Field Management**
   - Expression evaluation for numeric inputs
   - Draggable number inputs
   - Vector3 and Euler angle field types

4. **Connection Management**
   - Improved disconnection handling
   - Connection state visualization
   - Automatic reconnection attempts

### Implementation Changes

1. **File Structure Updates**
```
Happle-Core/
├── core/
│   ├── gui/
│   │   ├── GUI.js              # Enhanced GUI system
│   │   ├── Content.js          # Responsive content handler
│   │   └── TouchHandler.js     # Touch interaction system
│   ├── inspect/
│   │   ├── InspectPane.js      # Improved inspection system
│   │   ├── FieldTypes.js       # Enhanced field handlers
│   │   └── CopyPaste.js        # Value transfer system
│   └── state/
│       ├── AppState.js         # Enhanced state management
│       └── SyncManager.js      # State synchronization
```

2. **Component Updates**
```javascript
// Enhanced window management
export class WindowManager {
  constructor() {
    this.windows = new Map()
    this.activeWindow = null
    this.events = new EventEmitter()
    this.touchEnabled = false
    
    // Touch detection
    if (typeof window !== 'undefined') {
      this.touchEnabled = 'ontouchstart' in window
    }
  }
  
  createWindow(app, options = {}) {
    const window = new AppWindow(app, {
      ...options,
      touchEnabled: this.touchEnabled
    })
    this.windows.set(app.id, window)
    return window
  }
}
```

3. **State Synchronization**
```javascript
// Improved state sync
export class SyncManager {
  constructor() {
    this.pending = new Map()
    this.syncQueue = []
    this.processing = false
  }
  
  queueSync(path, value) {
    this.syncQueue.push({ path, value })
    if (!this.processing) {
      this.processQueue()
    }
  }
  
  async processQueue() {
    this.processing = true
    while (this.syncQueue.length > 0) {
      const { path, value } = this.syncQueue.shift()
      await this.syncState(path, value)
    }
    this.processing = false
  }
}
```

### Migration Guide

1. Update core dependencies:
```bash
npm install @firebolt-dev/css@latest @firebolt-dev/jsx@latest
```

2. Replace existing GUI implementation:
```bash
cp -r core/gui/* new-core/gui/
```

3. Update state management:
```javascript
// Replace old state implementation
import { useAppState } from './state/AppState'

// Use new state management
const [state, setState, syncState] = useAppState(initialState)
```

4. Implement touch support:
```javascript
// Add touch detection
const touch = useMemo(() => 
  navigator.userAgent.match(/OculusBrowser|iPhone|iPad|iPod|Android/i), 
[])

// Update component rendering
{touch ? <TouchOptimizedUI /> : <StandardUI />}
```

[Previous sections remain the same...] 