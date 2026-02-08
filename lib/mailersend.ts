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

export const sendCoachingEmail = async (formData: {
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
  
  const lessonPackage = packageType === 'general' ? 'General Enquiry' :
    packageType === 'single' ? 'Single Lesson' :
    packageType === 'package_3' ? '3-Lesson Package' :
    packageType === 'package_5' ? '5-Lesson Package' : ''
  
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
            <p><strong>Interested In:</strong> ${lessonPackage}</p>
            ${startDate ? `<p><strong>Preferred Start Date:</strong> ${dateDisplay}</p>` : ''}
            ${skillLevel ? `<p><strong>Current Skill Level:</strong> ${skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</p>` : ''}
          </div>
          ` : ''}

          ${skillLevel && !packageType ? `
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1ac2ab; margin-top: 0;">Skill Level</h3>
            <p><strong>Current Skill Level:</strong> ${skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</p>
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

export const sendCustomBatEmail = async (formData: {
  name: string
  email: string
  phone: string
  message: string
  consultationType?: string
  playingStyle?: string
}) => {
  const { name, email, phone, message, consultationType, playingStyle } = formData
  
  try {
    const sentFrom = new Sender(FROM_EMAIL, "Pingability")
    const recipients = [new Recipient(RECIPIENT_EMAIL, RECIPIENT_NAME)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(email, name))
      .setSubject(`🏓 Custom Bat Enquiry from ${name}`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05325c; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            🏓 Custom Bat Enquiry
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
            ${playingStyle ? `<p><strong>Playing Style:</strong> ${playingStyle.charAt(0).toUpperCase() + playingStyle.slice(1)}</p>` : ''}
            ${consultationType ? `<p><strong>Preferred Consultation Method:</strong> ${consultationType.charAt(0).toUpperCase() + consultationType.slice(1)}</p>` : ''}
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

