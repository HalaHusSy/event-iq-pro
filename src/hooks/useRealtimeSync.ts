import { useEffect, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'

export function useRealtimeSync(onSync: () => void) {
  const ref = useRef(onSync)
  ref.current = onSync

  useEffect(() => {
    const socket: Socket = io({
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    })
    const handler = () => ref.current()
    socket.on('sync', handler)
    return () => {
      socket.off('sync', handler)
      socket.disconnect()
    }
  }, [])
}
