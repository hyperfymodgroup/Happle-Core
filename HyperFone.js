import { useEffect, useRef, useState, useMemo } from 'react'
import { css } from '@firebolt-dev/css'
import { cyberpunkTheme } from '../../theme/cyberpunk'
import { HeadScreen } from './components/HeadScreen'
import { IdleManager } from './animations/IdleManager'
import { config } from './config'
import { Phone, X, Home, Settings, MessageCircle, Globe, Wallet, LayoutGrid, ArrowLeft } from 'lucide-react'
import { ChatApp } from './apps/ChatApp'
import { BrowserApp } from './apps/BrowserApp'
import { WalletApp } from './apps/WalletApp'
import { SettingsApp } from './apps/SettingsApp'
import { AppStoreApp } from './apps/AppStoreApp'

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
    background: rgba(22, 22, 28, 1);
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 30px;
    border-radius: 16px;
    backdrop-filter: blur(3px);
    display: none;
    pointer-events: auto;

    &.active {
      display: block;
    }
  `,
  dragHandle: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    cursor: move;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px 16px 0 0;
  `,
  titleBar: css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  backButton: css`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `,
  title: css`
    color: white;
    font-size: 18px;
    font-weight: 500;
  `,
  closeButton: css`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `,
  content: css`
    padding: 16px;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
  `,
  apps: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
  `,
  app: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    svg {
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
      color: #00ff9d;
    }

    span {
      color: white;
      font-size: 14px;
      text-align: center;
    }
  `,
  appContent: css`
    height: 100%;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `
}

const apps = [
  { id: 'home', icon: Home, name: 'Home', component: HomeApp },
  { id: 'chat', icon: MessageCircle, name: 'Chat', component: ChatApp },
  { id: 'browser', icon: Globe, name: 'Browser', component: BrowserApp },
  { id: 'wallet', icon: Wallet, name: 'Wallet', component: WalletApp },
  { id: 'settings', icon: Settings, name: 'Settings', component: SettingsApp },
  { id: 'apps', icon: LayoutGrid, name: 'App Store', component: AppStoreApp }
]

function HomeApp() {
  return (
    <div css={styles.appContent}>
      <div css={css`padding: 16px;`}>
        <h2>Welcome to HyperFone</h2>
        <p>Select an app to get started!</p>
      </div>
    </div>
  )
}

export function HyperFone({ world, isOpen, onClose }) {
  const idleManagerRef = useRef(null)
  const [currentApp, setCurrentApp] = useState('home')
  const phoneRef = useRef(null)
  const dragRef = useRef(null)
  const touch = useMemo(() => navigator.userAgent.match(/OculusBrowser|iPhone|iPad|iPod|Android/i), [])

  useEffect(() => {
    const idleManager = new IdleManager(world)
    idleManagerRef.current = idleManager
    const cleanup = idleManager.init()

    // Add keyboard shortcut listener (only for non-touch devices)
    if (!touch) {
      const handleKeyPress = (e) => {
        if (e.key === 'h' && e.altKey) {
          onClose?.(!isOpen)
        }
        if (e.key === 'Escape' && isOpen) {
          onClose?.(false)
        }
      }
      window.addEventListener('keydown', handleKeyPress)
      return () => {
        cleanup?.()
        window.removeEventListener('keydown', handleKeyPress)
      }
    }
    return cleanup
  }, [world, isOpen, touch, onClose])

  useEffect(() => {
    if (!phoneRef.current || !dragRef.current) return

    let isDragging = false
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0

    const handleMouseDown = (e) => {
      isDragging = true
      startX = e.clientX
      startY = e.clientY
      const rect = phoneRef.current.getBoundingClientRect()
      startLeft = rect.left
      startTop = rect.top
      phoneRef.current.style.transition = 'none'
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      phoneRef.current.style.left = `${startLeft + deltaX}px`
      phoneRef.current.style.top = `${startTop + deltaY}px`
      phoneRef.current.style.transform = 'none'
    }

    const handleMouseUp = () => {
      isDragging = false
      phoneRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }

    dragRef.current.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      dragRef.current?.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setCurrentApp('home')
    }
  }, [isOpen])

  const handleAppClick = (appId) => {
    setCurrentApp(appId)
    world.playSound?.('ui_click', { volume: 0.2 })
  }

  const handleBack = () => {
    setCurrentApp('home')
    world.playSound?.('ui_click', { volume: 0.2 })
  }

  const CurrentAppComponent = apps.find(app => app.id === currentApp)?.component || HomeApp

  return (
    <>
      {/* Phone Interface */}
      <div ref={phoneRef} className={isOpen ? 'active' : ''} css={styles.phoneInterface}>
        <div ref={dragRef} css={styles.dragHandle}>
          <div css={styles.titleBar}>
            {currentApp !== 'home' && (
              <button css={styles.backButton} onClick={handleBack} title="Back to Home">
                <ArrowLeft size={20} />
              </button>
            )}
            <div css={styles.title}>
              {currentApp === 'home' ? 'HyperFone' : apps.find(app => app.id === currentApp)?.name}
            </div>
          </div>
          <button css={styles.closeButton} onClick={() => onClose?.(false)}>
            <X size={20} />
          </button>
        </div>

        <div css={styles.content}>
          {currentApp === 'home' ? (
            <div css={styles.apps}>
              {apps.map(app => (
                <div
                  key={app.id}
                  css={styles.app}
                  onClick={() => handleAppClick(app.id)}
                >
                  <app.icon />
                  <span>{app.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <CurrentAppComponent world={world} onBack={handleBack} />
          )}
        </div>
      </div>

      {/* Head Screens */}
      {world.avatar?.object && (
        <HeadScreen
          world={world}
          player={world.avatar.object}
          content={world.avatar.status || ''}
        />
      )}
      {world.players?.map(player => (
        <HeadScreen
          key={player.id}
          world={world}
          player={player.object}
          content={player.status || ''}
        />
      ))}
    </>
  )
}

export { config } 