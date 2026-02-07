import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"

// Lazy initialization of MailerSend to avoid build-time errors
let mailerSend: MailerSend | null = null

const getMailerSend = (): MailerSend => {
  if (!mailerSend) {
    if (!process.env.MAILERSEND_API_KEY) {
      throw new Error(
        "MAILERSEND_API_KEY environment variable is required but not set. " +
        "Please add it to your Vercel environment variables or .env.local file."
      )
    }
    mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    })
  }
  return mailerSend
}

// From address must be a verified domain in your MailerSend account
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL ?? "noreply@pingability.co.uk"

// Email templates
export const sendContactEmail = async (formData: {
  name: string
  email: string
  phone: string
  message: string
  contactMethod?: string
  hearAbout?: string
  packageType?: string
  startDate?: string
  skillLevel?: string
}) => {
  const { name, email, phone, message, contactMethod, hearAbout, packageType, startDate, skillLevel } = formData
  
  // Format package type for display
  const packageDisplay = packageType === 'general' ? 'General Inquiry' :
    packageType === 'single' ? 'Single Lesson' :
    packageType === 'package_3' ? '3-Lesson Package' :
    packageType === 'package_5' ? '5-Lesson Package' : ''
  
  // Format skill level for display
  const skillDisplay = skillLevel ? skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1) : ''
  
  // Format start date for display
  const dateDisplay = startDate ? new Date(startDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : ''

  try {
    const sentFrom = new Sender(FROM_EMAIL, "Pingability")
    const recipients = [new Recipient("zac.harvey@gmail.com", "Zac Harvey")]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(email, name))
      .setSubject(`🏓 New Coaching Enquiry`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Coaching Enquiry from ${name}
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>
          
          ${packageType ? `
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Lesson Details</h3>
            <p><strong>Interested In:</strong> ${packageDisplay}</p>
            ${startDate ? `<p><strong>Preferred Start Date:</strong> ${dateDisplay}</p>` : ''}
            ${skillLevel ? `<p><strong>Current Skill Level:</strong> ${skillDisplay}</p>` : ''}
          </div>
          ` : ''}

          ${skillLevel && !packageType ? `
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Skill Level</h3>
            <p><strong>Current Skill Level:</strong> ${skillDisplay}</p>
          </div>
          ` : ''}

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          ${contactMethod || hearAbout ? `
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Additional Information</h3>
            ${contactMethod ? `<p><strong>Preferred Contact Method:</strong> ${contactMethod}</p>` : ''}
            ${hearAbout ? `<p><strong>How they heard about us:</strong> ${hearAbout}</p>` : ''}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Submitted on ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              Reply directly to this email to contact ${name}.
            </p>
          </div>
        </div>
      `)

    const response = await getMailerSend().email.send(emailParams)

    // MailerSend response structure may vary - try multiple ways to get message ID
    let messageId = 'sent'
    if (response?.headers?.['x-message-id']) {
      messageId = response.headers['x-message-id']
    } else if (response?.body?.message_id) {
      messageId = response.body.message_id
    } else if (typeof response === 'string') {
      messageId = response
    }

    return { success: true, messageId }
  } catch (error: any) {
    console.error('Email sending error:', error)
    // Log more details for debugging
    if (error?.response) {
      console.error('Error response:', error.response)
    }
    if (error?.message) {
      console.error('Error message:', error.message)
    }
    throw error
  }
}

// Custom bat inquiry email
export const sendCustomBatEmail = async (formData: {
  name: string
  email: string
  phone: string
  message: string
  consultationType?: string
  playingStyle?: string
}) => {
  const { name, email, phone, message, consultationType, playingStyle } = formData
  
  // Format consultation type for display
  const consultationDisplay = consultationType === 'email' ? 'Email' :
    consultationType === 'phone' ? 'Phone' :
    consultationType === 'in-person' ? 'In-Person' : ''
  
  // Format playing style for display
  const playingStyleDisplay = playingStyle ? playingStyle.charAt(0).toUpperCase() + playingStyle.slice(1).replace('-', ' ') : ''

  try {
    const sentFrom = new Sender(FROM_EMAIL, "Pingability")
    const recipients = [new Recipient("zac.harvey@gmail.com", "Zac Harvey")]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(email, name))
      .setSubject(`🏓 Custom Bat Inquiry from ${name}`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            🏓 Custom Bat Inquiry
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>
          
          ${playingStyle || consultationType ? `
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Bat Preferences</h3>
            ${playingStyle ? `<p><strong>Playing Style:</strong> ${playingStyleDisplay}</p>` : ''}
            ${consultationType ? `<p><strong>Preferred Consultation Method:</strong> ${consultationDisplay}</p>` : ''}
          </div>
          ` : ''}

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Submitted on ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              Reply directly to this email to contact ${name}.
            </p>
          </div>
        </div>
      `)

    const response = await getMailerSend().email.send(emailParams)

    // MailerSend response structure may vary - try multiple ways to get message ID
    let messageId = 'sent'
    if (response?.headers?.['x-message-id']) {
      messageId = response.headers['x-message-id']
    } else if (response?.body?.message_id) {
      messageId = response.body.message_id
    } else if (typeof response === 'string') {
      messageId = response
    }

    return { success: true, messageId }
  } catch (error: any) {
    console.error('Email sending error:', error)
    // Log more details for debugging
    if (error?.response) {
      console.error('Error response:', error.response)
    }
    if (error?.message) {
      console.error('Error message:', error.message)
    }
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
    const sentFrom = new Sender(FROM_EMAIL, "Pingability")
    const recipients = [new Recipient(customerEmail, customerName)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`Booking Confirmation - ${sessionCount} Table Tennis Lesson${sessionCount > 1 ? 's' : ''}`)
      .setHtml(`
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
      `)

    const response = await getMailerSend().email.send(emailParams)

    // MailerSend response structure may vary - try multiple ways to get message ID
    let messageId = 'sent'
    if (response?.headers?.['x-message-id']) {
      messageId = response.headers['x-message-id']
    } else if (response?.body?.message_id) {
      messageId = response.body.message_id
    } else if (typeof response === 'string') {
      messageId = response
    }

    return { success: true, messageId }
  } catch (error: any) {
    console.error('Email sending error:', error)
    // Log more details for debugging
    if (error?.response) {
      console.error('Error response:', error.response)
    }
    if (error?.message) {
      console.error('Error message:', error.message)
    }
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
    const sentFrom = new Sender(FROM_EMAIL, "Pingability")
    const recipients = [new Recipient("info@pingability.co.uk", "Pingability Info")]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(customerEmail, customerName))
      .setSubject(`🎾 New Booking - ${customerName} (${sessionCount} lesson${sessionCount > 1 ? 's' : ''})`)
      .setHtml(`
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
      `)

    const response = await getMailerSend().email.send(emailParams)

    // MailerSend response structure may vary - try multiple ways to get message ID
    let messageId = 'sent'
    if (response?.headers?.['x-message-id']) {
      messageId = response.headers['x-message-id']
    } else if (response?.body?.message_id) {
      messageId = response.body.message_id
    } else if (typeof response === 'string') {
      messageId = response
    }

    return { success: true, messageId }
  } catch (error: any) {
    console.error('Email sending error:', error)
    // Log more details for debugging
    if (error?.response) {
      console.error('Error response:', error.response)
    }
    if (error?.message) {
      console.error('Error message:', error.message)
    }
    throw error
  }
}

