# Happle-Core Installation & Integration Guide

## Recent Updates (February 2024)

Major improvements have been made to the HyperFone component, including enhanced navigation, draggable interface, and improved app management. This guide will help you integrate these changes into your Happle-Core installation.

## Prerequisites

- Node.js 22.11.0 or higher
- npm 10.0.0 or higher
- React 18.3.1
- @firebolt-dev/css
- lucide-react

## Installation Steps

1. **Install Dependencies** (CHECK PACKAGE.JSON FIRST)
```bash
npm install @firebolt-dev/css lucide-react
```

2. **Update File Structure**
```
Happle-Core/
├── core/
│   ├── components/
│   │   ├── HeadScreen.jsx      # New component for head displays
│   │   └── ...
│   ├── animations/
│   │   ├── IdleManager.js      # Idle animation system
│   │   └── ...
│   └── config.js               # Configuration file
├── apps/                       # App components
│   ├── ChatApp.js
│   ├── BrowserApp.js
│   └── ...
└── HyperFone.jsx              # Main component
```

## Key Changes

### 1. Enhanced Navigation System
- Added back button functionality
- Improved title bar with dynamic app names
- Reset to home screen when phone is closed

```javascript
// Navigation state management
const [currentApp, setCurrentApp] = useState('home')

// Reset on close
useEffect(() => {
  if (!isOpen) {
    setCurrentApp('home')
  }
}, [isOpen])
```

### 2. Draggable Interface
The phone interface can now be dragged around the screen:

```javascript
// Drag handling
useEffect(() => {
  if (!phoneRef.current || !dragRef.current) return

  let isDragging = false
  let startX = 0, startY = 0
  let startLeft = 0, startTop = 0

  const handleMouseDown = (e) => {
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    const rect = phoneRef.current.getBoundingClientRect()
    startLeft = rect.left
    startTop = rect.top
    phoneRef.current.style.transition = 'none'
  }

  // ... drag implementation
}, [])
```

### 3. Keyboard Shortcuts
Added keyboard shortcuts for non-touch devices:
- Alt + H: Toggle phone
- Escape: Close phone

### 4. Styling System
Updated styling system with improved scrollbars and transitions:

```javascript
const styles = {
  phoneInterface: css`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 400px;
    height: 80%;
    max-height: 600px;
    // ... styling
  `,
  // ... other styles
}
```

## Integration Steps

1. **Replace HyperFone Component**
   - Back up your existing `HyperFone.js`
   - Copy the new `HyperFone.jsx` to your project
   - Update imports and dependencies

2. **Update Configuration**
```javascript
// config.js
export const config = {
  idle: {
    enabled: true,
    delay: 5000,
    animations: [
      'idle_stretch',
      'idle_look_around',
      'idle_check_phone'
    ]
  },
  // ... other config
}
```

3. **Add Required Components**
   - Implement `HeadScreen` component
   - Set up `IdleManager`
   - Create or update app components

4. **Update App Registry**
```javascript
const apps = [
  { id: 'home', icon: Home, name: 'Home', component: HomeApp },
  { id: 'chat', icon: MessageCircle, name: 'Chat', component: ChatApp },
  // ... other apps
]
```

## Testing

1. **Basic Functionality**
   - Phone opens/closes correctly
   - Navigation works (home, apps, back button)
   - Dragging works smoothly

2. **App Integration**
   - All apps load correctly
   - State management works
   - Back navigation functions

3. **Keyboard Shortcuts**
   - Alt + H toggles phone
   - Escape closes phone

## Troubleshooting

1. **Styling Issues**
   - Check CSS imports
   - Verify @firebolt-dev/css installation
   - Check for CSS conflicts

2. **Navigation Problems**
   - Verify app registry
   - Check state management
   - Confirm event handlers

3. **Performance Issues**
   - Check drag handler cleanup
   - Verify useEffect dependencies
   - Monitor memory usage

## Contributing

When contributing changes:
1. Follow the existing code style
2. Add comments for complex logic
3. Update documentation
4. Test thoroughly before submitting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For more information, see the main [README.md](./README.md) file. 