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

const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL ?? "noreply@pingability.co.uk"
const RECIPIENT_EMAIL = process.env.MAILERSEND_RECIPIENT_EMAIL ?? "alex.bashforth78@gmail.com"
const RECIPIENT_NAME = process.env.MAILERSEND_RECIPIENT_NAME ?? "Alex"

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
    const recipients = [new Recipient(RECIPIENT_EMAIL, RECIPIENT_NAME)]

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

    await getMailerSend().email.send(emailParams)
    return { success: true }
  } catch (error) {
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
    const recipients = [new Recipient(RECIPIENT_EMAIL, RECIPIENT_NAME)]

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

    await getMailerSend().email.send(emailParams)
    return { success: true }
  } catch (error) {
    throw error
  }
}

export const sendNotificationEmail = async (bookingData: {
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
    const recipients = [new Recipient(RECIPIENT_EMAIL, RECIPIENT_NAME)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(customerEmail, customerName))
      .setSubject(`🏓 New Coaching Enquiry - ${customerName} (${sessionCount} lesson${sessionCount > 1 ? 's' : ''})`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            🏓 New Coaching Enquiry
          </h2>
          
          <p>Hi ${RECIPIENT_NAME},</p>
          
          <p>Someone has requested table tennis coaching. No payment is taken on the site—please get in touch to arrange sessions and discuss payment.</p>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
            ${customerPhone ? `<p><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>` : ''}
          </div>

          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Request Details</h3>
            <p><strong>Lesson Type:</strong> ${lessonType === 'individual' ? 'Individual' : 'Group'}</p>
            <p><strong>Number of Sessions Requested:</strong> ${sessionCount}</p>
            <p><strong>Quoted Total:</strong> £${totalAmount.toFixed(2)}</p>
            <p><strong>Request ID:</strong> ${bookingId}</p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Contact ${customerName} to confirm availability and arrange the first session</li>
              <li>Agree lesson schedule (e.g. at St Matthew's Community Centre)</li>
              <li>Arrange payment when you confirm the sessions</li>
            </ul>
            <p style="margin-top: 15px;">
              <strong>Quick contact:</strong>
              <a href="mailto:${customerEmail}?subject=Table Tennis Coaching Enquiry" style="color: #05325c;">Reply to ${customerName}</a>
              ${customerPhone ? ` | <a href="tel:${customerPhone}" style="color: #05325c;">Call ${customerPhone}</a>` : ''}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Request received on ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              This is an automated notification from your Pingability website.
            </p>
          </div>
        </div>
      `)

    await getMailerSend().email.send(emailParams)
    return { success: true }
  } catch (error) {
    throw error
  }
}

