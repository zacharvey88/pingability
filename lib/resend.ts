import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export { resend }

// Email templates
export const sendContactEmail = async (formData: {
  name: string
  email: string
  phone?: string
  message: string
  contactMethod?: string
  hearAbout?: string
}) => {
  const { name, email, phone, message, contactMethod, hearAbout } = formData

  try {
    const { data, error } = await resend.emails.send({
      from: 'Pingability Contact <noreply@pingability.co.uk>',
      to: ['info@pingability.co.uk'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
            ${contactMethod ? `<p><strong>Preferred Contact Method:</strong> ${contactMethod}</p>` : ''}
            ${hearAbout ? `<p><strong>How they heard about us:</strong> ${hearAbout}</p>` : ''}
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from the Pingability contact form at ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      reply_to: email,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send email')
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export const sendBookingConfirmationEmail = async (bookingData: {
  customerName: string
  customerEmail: string
  sessionCount: number
  totalAmount: number
  lessonType: string
}) => {
  const { customerName, customerEmail, sessionCount, totalAmount, lessonType } = bookingData

  try {
    const { data, error } = await resend.emails.send({
      from: 'Pingability Bookings <noreply@pingability.co.uk>',
      to: [customerEmail],
      subject: `Booking Confirmation - ${sessionCount} Table Tennis Lesson${sessionCount > 1 ? 's' : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Booking Confirmation
          </h2>
          
          <p>Hi ${customerName},</p>
          
          <p>Thank you for booking your table tennis lesson${sessionCount > 1 ? 's' : ''} with Alex! We're excited to help you improve your game.</p>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
            <p><strong>Lesson Type:</strong> ${lessonType === 'individual' ? 'Individual' : 'Group'}</p>
            <p><strong>Number of Sessions:</strong> ${sessionCount}</p>
            <p><strong>Total Amount:</strong> £${totalAmount.toFixed(2)}</p>
            <p><strong>Status:</strong> Confirmed</p>
          </div>

          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Next Steps</h3>
            <p>Alex will contact you within 24 hours to arrange your first lesson at St Matthew's Community Centre.</p>
            <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:info@pingability.co.uk">info@pingability.co.uk</a> or call <a href="tel:+447432628588">+44 7432 628588</a>.</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This booking was confirmed on ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send confirmation email')
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export const sendCoachNotificationEmail = async (bookingData: {
  customerName: string
  customerEmail: string
  customerPhone?: string
  sessionCount: number
  totalAmount: number
  lessonType: string
  bookingId: string
}) => {
  const { customerName, customerEmail, customerPhone, sessionCount, totalAmount, lessonType, bookingId } = bookingData

  try {
    const { data, error } = await resend.emails.send({
      from: 'Pingability Bookings <noreply@pingability.co.uk>',
      to: ['info@pingability.co.uk'],
      subject: `🎾 New Booking - ${customerName} (${sessionCount} lesson${sessionCount > 1 ? 's' : ''})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            🎾 New Table Tennis Booking
          </h2>
          
          <p>Hi Alex,</p>
          
          <p>You have a new booking! A customer has just completed payment for table tennis lessons.</p>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
            ${customerPhone ? `<p><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>` : ''}
          </div>

          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Booking Details</h3>
            <p><strong>Lesson Type:</strong> ${lessonType === 'individual' ? 'Individual' : 'Group'}</p>
            <p><strong>Number of Sessions:</strong> ${sessionCount}</p>
            <p><strong>Total Amount:</strong> £${totalAmount.toFixed(2)}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Status:</strong> Confirmed & Paid</p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Action Required</h3>
            <p><strong>Next Steps:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Contact ${customerName} within 24 hours</li>
              <li>Arrange first lesson at St Matthew's Community Centre</li>
              <li>Confirm lesson schedule and availability</li>
            </ul>
            <p style="margin-top: 15px;">
              <strong>Quick Contact:</strong> 
              <a href="mailto:${customerEmail}?subject=Table Tennis Lesson Arrangement" style="color: #05325c;">Reply to ${customerName}</a>
              ${customerPhone ? ` | <a href="tel:${customerPhone}" style="color: #05325c;">Call ${customerPhone}</a>` : ''}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Booking received on ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              This is an automated notification from your Pingability booking system.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send coach notification email')
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}
