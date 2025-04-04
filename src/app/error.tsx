'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function ErrorComponent({
  error,
  reset,
}: {
  error: unknown
  reset?: () => void
}) {
  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'An unexpected error occurred';
    }
  }
  
  const errorMessage = getErrorMessage(error);

  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])

  const handleReset = useCallback(() => {
    console.log('Retrying...')
    reset?.();
  }, [reset])

  return (
    <div className="errorContainer">
      <div className="errorContent">
        <h1>Oops!</h1>
        <h2>Something went wrong</h2>
        <p>{errorMessage}</p>
        <div className="actions">
          <button
            className="primary"
            onClick={handleReset}
            style={{ marginRight: 'var(--spacing-md)' }}
          >
            Try Again
          </button>
          <Link href="/" className="transparent">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
