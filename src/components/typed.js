import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'

/**
 * TYPED : Librairie d'animation pour donner une impression d'écriture clavier en live
 * @param word le mot à animer
 */
const TypedReactHook = ({ word }) => {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null)
  // Create reference to store the Typed instance itself
  const typed = useRef(null)

  useEffect(() => {
    const options = {
      strings: [`by ${word}`],
      typeSpeed: 120,
      backSpeed: 120,
      backDelay: 3000,
      loop: true
    }

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options)

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy()
    }
  }, [word])

  return <span className='text-blue' style={{ whiteSpace: 'pre' }} ref={el} />
}
export default TypedReactHook
