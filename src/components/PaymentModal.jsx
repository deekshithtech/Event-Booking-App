import { useState } from 'react'
import './PaymentModal.css'

const PaymentModal = ({ event, onClose }) => {
  const [step, setStep] = useState('form') // form, success, failure
  const [tickets, setTickets] = useState(1)

  const handlePayment = (e) => {
    e.preventDefault()
    // simulate payment success/failure
    const isSuccess = Math.random() > 0.3 // 70% success
    setStep(isSuccess ? 'success' : 'failure')
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        {step === 'form' && (
          <>
            <h2>Book Tickets for {event.name}</h2>
            <p>Price per ticket: ${event.price}</p>
            <p>Available: {event.availableTickets}</p>
            <form onSubmit={handlePayment}>
              <label>Number of Tickets:</label>
              <input 
                type="number" 
                min="1" 
                max={event.availableTickets} 
                value={tickets} 
                onChange={e => setTickets(e.target.value)} 
              />
              <p>Total: ${event.price * tickets}</p>
              <button type="submit" className="pay-btn">Pay & Book</button>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="payment-result success">
            <h2>🎉 Payment Successful!</h2>
            <p>{tickets} ticket(s) booked for {event.name}</p>
            <p>Total: ${event.price * tickets}</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}

        {step === 'failure' && (
          <div className="payment-result failure">
            <h2>❌ Payment Failed</h2>
            <p>There was an error processing your payment.</p>
            <button onClick={() => setStep('form')}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
