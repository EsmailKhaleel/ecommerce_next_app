import './globals.css'
export default function Loading() {
  return (
    <div className='loadingContainer'>
      <div className='spinner'></div>
      <p className='loadingText'>Loading...</p>
    </div>
  )
}