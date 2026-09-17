import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Carousel.css'

export default function Carousel({ children, label, className = '' }) {
  const trackRef = useRef(null)
  const dragRef = useRef(null)
  const draggedRef = useRef(false)
  const [position, setPosition] = useState({ atStart: true, atEnd: false })

  const updatePosition = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const remaining = track.scrollWidth - track.clientWidth - track.scrollLeft
    setPosition({ atStart: track.scrollLeft < 2, atEnd: remaining < 2 })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    updatePosition()
    const resizeObserver = new ResizeObserver(updatePosition)
    resizeObserver.observe(track)
    track.addEventListener('scroll', updatePosition, { passive: true })
    return () => { resizeObserver.disconnect(); track.removeEventListener('scroll', updatePosition) }
  }, [children, updatePosition])

  const move = (direction) => trackRef.current?.scrollBy({ left: direction * trackRef.current.clientWidth * .88, behavior: 'smooth' })
  const startDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const track = trackRef.current
    draggedRef.current = false
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, scrollLeft: track.scrollLeft }
    track.setPointerCapture(event.pointerId)
  }
  const drag = (event) => {
    const dragState = dragRef.current
    if (!dragState) return
    const distance = event.clientX - dragState.x
    if (Math.abs(distance) > 4) draggedRef.current = true
    trackRef.current.scrollLeft = dragState.scrollLeft - distance
  }
  const endDrag = (event) => {
    const dragState = dragRef.current
    if (!dragState) return
    if (trackRef.current.hasPointerCapture(event.pointerId)) trackRef.current.releasePointerCapture(event.pointerId)
    dragRef.current = null
  }
  const stopClickAfterDrag = (event) => {
    if (!draggedRef.current) return
    event.preventDefault()
    event.stopPropagation()
    draggedRef.current = false
  }

  return <div className={`carousel ${className}`}>
    <div className="carousel-controls" aria-label={`${label} carousel controls`}>
      <button type="button" onClick={() => move(-1)} disabled={position.atStart} aria-label={`Previous ${label}`}><ChevronLeft /></button>
      <button type="button" onClick={() => move(1)} disabled={position.atEnd} aria-label={`Next ${label}`}><ChevronRight /></button>
    </div>
    <div ref={trackRef} className="carousel-track" role="region" aria-label={label} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={stopClickAfterDrag}>
      {Children.toArray(children).map((child, index) => <div className="carousel-slide" key={child.key ?? index}>{child}</div>)}
    </div>
  </div>
}
