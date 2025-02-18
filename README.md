# Happle-Core

A modern, cyberpunk-themed application framework originally developed as a Hyperfy mod, now available as a standalone core framework. This system provides a suite of interconnected applications and utilities designed to create immersive virtual experiences within Hyperfy worlds.

## 🌟 Core Features

- **Modular Architecture**: Built with a component-based structure for easy extensibility
- **Cyberpunk UI/UX**: Featuring a distinctive cyberpunk aesthetic with neon accents and futuristic design
- **Rich Application Suite**: Includes various built-in applications for different functionalities
- **Hyperfy Integration**: Seamlessly integrates with Hyperfy's virtual world platform

## 🔮 Hyperfy Mod Implementation

This framework was originally implemented as a Hyperfy mod, utilizing Hyperfy's core features:

### Integration Points

1. **Three.js Integration**
   - Utilizes Hyperfy's Three.js implementation for 3D rendering
   - Interfaces with Hyperfy's world components and entity system
   - Compatible with Hyperfy's VRM avatar system

2. **Networking Layer**
   - Leverages Hyperfy's WebSocket infrastructure for real-time communication
   - Integrates with Hyperfy's player management system
   - Utilizes matrix-js-sdk for enhanced chat capabilities

3. **UI Framework**
   - Built using @firebolt-dev/css and @firebolt-dev/jsx
   - Implements Hyperfy's component lifecycle management
   - Maintains consistent styling with Hyperfy's theming system

### Converting to .hyp Files

To convert Happle-Core components into Hyperfy mod files (.hyp):

1. **Component Preparation**
```javascript
// Component structure
export default {
  name: 'HappleCore',
  components: {
    HyperFone,
    ChatApp,
    // ... other components
  }
}
```

2. **Build Process**
```bash
# Install Hyperfy CLI
npm install -g @hyperfy/cli

# Build .hyp file
hyperfy build --input ./src --output ./dist/happle-core.hyp
```

3. **Required Directory Structure**
```
happle-core/
├── manifest.json     # Mod metadata
├── components/       # Core components
├── apps/            # Application modules
└── themes/          # Styling and themes
```

## 📱 Built-in Applications

1. **ChatApp** (`ChatApp.js`)
   - Real-time messaging and communication hub
   - Support for various message types and interactions
   - 77KB of sophisticated chat functionality

2. **WebBrowser** (`WebBrowser.js`)
   - Integrated web browsing capabilities
   - Custom navigation and content rendering
   - 23KB of browsing features

3. **WalletApp** (`WalletApp.js`)
   - Digital asset management
   - Transaction handling and balance tracking
   - 28KB of financial functionality

4. **Settings** (`Settings.js`)
   - Comprehensive system configuration
   - User preferences management
   - 82KB of customization options

5. **ProfileApp** (`ProfileApp.js`)
   - User profile management
   - Identity and personalization features
   - 13KB of profile functionality

6. **MeshyApp** (`MeshyApp.js`)
   - Network and connectivity management
   - 32KB of mesh networking features

7. **InventoryApp** (`InventoryApp.js`)
   - Digital asset inventory system
   - Item management and organization
   - 38KB of inventory features

## 🎨 UI Components

- **HyperFone** (`HyperFone.js`): Main container component with cyberpunk styling
- **AppWindow** (`AppWindow.js`): Window management system
- **StatusBar** (`StatusBar.js`): System status display
- **AppLauncher** (`AppLauncher.js`): Application launching interface
- **LockScreen** (`LockScreen.js`): Security and authentication interface

## 🛠️ Developer Tools

- **DeveloperApp** (`DeveloperApp.js`): Development tools and debugging interface
- **WorldInspector** (`WorldInspector.js`): Environment inspection tools
- **Terminal** (`Terminal.js`): Command-line interface

## 🎯 Core System Files

- **index.js**: Main entry point and app registration
- **themes.js**: Theme definitions and styling constants
- **AppTemplate.js**: Base template for creating new applications
- **manifest.json**: Hyperfy mod configuration and metadata

## 🔧 Development

### Prerequisites
- Node.js 22.11.0 or higher
- npm 10.0.0 or higher
- Hyperfy CLI
- React 18.3.1
- Modern web browser

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/Happle-Core.git
```

2. Install dependencies
```bash
npm install
```

3. Development server
```bash
npm run dev
```

4. Building Hyperfy mod
```bash
npm run build
```

### Testing in Hyperfy

1. Place the built .hyp file in your Hyperfy world's mods directory
2. Enable the mod in your world settings
3. Test functionality in the Hyperfy client

## 📚 Application Structure

```
Happle-Core/
├── src/
│   ├── components/          # Core UI components
│   ├── apps/               # Application modules
│   ├── themes/             # Styling system
│   └── hyperfy/            # Hyperfy integration
├── build/                  # Build output
└── dist/                   # Distribution files
```

## 🎨 Theming

The framework uses a cyberpunk-inspired theme system defined in `themes.js`, compatible with Hyperfy's theming engine. All components are styled using CSS-in-JS with consistent design tokens and animations.

## 🔌 Hyperfy Integration

### Event System
```javascript
// Subscribe to Hyperfy world events
world.on('playerJoined', (player) => {
  // Handle player join
})

// Emit custom events
world.emit('happleCore:ready')
```

### Entity Management
```javascript
// Create Hyperfy entities
world.createEntity({
  type: 'happleCore',
  position: [0, 0, 0],
  components: {
    // ... component configuration
  }
})
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with 💻 by the Happle-Core Team 