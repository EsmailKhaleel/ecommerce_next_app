import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='errorContainer'>
      <div className='errorContent'>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <div className='actions'>
          <Link href="/" className='primary'>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}