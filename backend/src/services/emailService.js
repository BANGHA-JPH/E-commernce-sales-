import nodemailer from 'nodemailer';

// Configure Transporter from Environment Variables (e.g. Gmail, Outlook, Brevo, SendGrid, or custom SMTP)
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;

  if (emailHost && emailUser && emailPass) {
    return nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort, 10) || 587,
      secure: parseInt(emailPort, 10) === 465,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
  }

  if (emailUser && emailPass) {
    // Default to Gmail or standard provider
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
  }

  return null;
};

export const emailService = {
  /**
   * Send automated status update email to customer
   */
  async sendRequestStatusEmail({ to, userName, requestId, partTitle, price, newStatus, customNotes }) {
    if (!to) {
      console.warn('⚠️ Cannot send email: No destination address provided');
      return { success: false, message: 'No email address' };
    }

    const transporter = createTransporter();
    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'support@classicaircooledvw.com';

    const statusColors = {
      Approved: '#10b981', // Emerald
      Reserved: '#a855f7', // Purple
      Shipped: '#06b6d4',  // Cyan
      Delivered: '#10b981', // Green
      Pending: '#ff7a1a',  // Orange
      Rejected: '#ef4444'   // Red
    };

    const statusBadgeColor = statusColors[newStatus] || '#ff7a1a';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0d0d0e; color: #f5f2f0; padding: 24px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid #332d29;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #292421;">
          <h1 style="color: #ff7a1a; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1.5px;">Classic Aircooled VW Works</h1>
          <p style="color: #a78b7d; margin: 4px 0 0 0; font-size: 12px;">Aircooled VW Engines, Parts & Specialist Restoration</p>
        </div>

        <div style="padding: 24px 0;">
          <p style="font-size: 15px; margin-bottom: 16px;">Hello <strong>${userName || 'Valued Restorer'}</strong>,</p>
          <p style="font-size: 14px; color: #d6ccc2; line-height: 1.6;">
            We are writing to inform you that the status of your vintage parts request has been updated by our engineering desk.
          </p>

          <div style="background-color: #171618; border: 1px solid #3a332e; border-radius: 6px; padding: 18px; margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="font-size: 11px; color: #a78b7d; text-transform: uppercase;">Request ID:</span>
              <span style="font-size: 12px; font-weight: bold; color: #ff7a1a;">#${requestId}</span>
            </div>
            <div style="margin-bottom: 10px;">
              <span style="font-size: 11px; color: #a78b7d; text-transform: uppercase; display: block;">Part Name:</span>
              <strong style="font-size: 15px; color: #ffffff;">${partTitle}</strong>
            </div>
            ${price ? `
            <div style="margin-bottom: 10px;">
              <span style="font-size: 11px; color: #a78b7d; text-transform: uppercase;">Estimated Value:</span>
              <strong style="font-size: 14px; color: #ff7a1a; margin-left: 8px;">$${price}</strong>
            </div>` : ''}
            <div>
              <span style="font-size: 11px; color: #a78b7d; text-transform: uppercase;">Current Status:</span>
              <span style="display: inline-block; background-color: ${statusBadgeColor}; color: #000; font-weight: bold; font-size: 12px; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; margin-left: 8px;">
                ${newStatus}
              </span>
            </div>
          </div>

          ${customNotes ? `
          <div style="background-color: #1c1b1c; border-left: 3px solid #ff7a1a; padding: 12px 16px; margin: 16px 0; font-size: 13px; color: #f5f2f0;">
            <strong>Note from Master Admin:</strong><br/>
            ${customNotes}
          </div>` : ''}

          <p style="font-size: 13px; color: #a78b7d; line-height: 1.5; margin-top: 20px;">
            You can log into your <strong>User Dashboard</strong> at any time to track order status, review shipping details, or live chat directly with our engine specialists.
          </p>
        </div>

        <div style="text-align: center; border-top: 1px solid #292421; padding-top: 20px; color: #786d66; font-size: 11px;">
          <p style="margin: 0 0 6px 0;">Classic Aircooled VW Works • Specialist Aircooled VW Heritage Restoration</p>
          <p style="margin: 0;">Have technical questions? Reply to this email or visit your Restorer Dashboard.</p>
        </div>
      </div>
    `;

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"Classic Aircooled VW Works" <${fromAddress}>`,
          to,
          subject: `🔔 [Update #${requestId}] Your request for ${partTitle} is now ${newStatus.toUpperCase()}`,
          html: htmlContent
        });
        console.log(`✅ Automated email dispatched to ${to} for Request #${requestId}: MessageId ${info.messageId}`);
        return { success: true, messageId: info.messageId };
      } catch (err) {
        console.error(`⚠️ Failed to send email via SMTP to ${to}:`, err.message);
        return { success: false, error: err.message };
      }
    } else {
      console.log(`✉️ [EMAIL NOTIFICATION SIMULATION]`);
      console.log(`   To: ${to}`);
      console.log(`   Subject: Update #${requestId} - ${partTitle} is ${newStatus}`);
      console.log(`   (Configure EMAIL_USER and EMAIL_PASS in .env to send real emails with any standard Gmail/Outlook account)`);
      return { success: true, simulated: true };
    }
  },

  /**
   * Send a direct custom message email from Admin to Customer
   */
  async sendDirectEmail({ to, userName, subject, message }) {
    if (!to) return { success: false, message: 'No email provided' };

    const transporter = createTransporter();
    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'support@classicaircooledvw.com';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0d0d0e; color: #f5f2f0; padding: 24px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid #332d29;">
        <div style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #292421;">
          <h1 style="color: #ff7a1a; margin: 0; font-size: 20px; text-transform: uppercase;">Classic Aircooled VW Works</h1>
          <p style="color: #a78b7d; margin: 4px 0 0 0; font-size: 11px;">Message from Specialist Engineering Desk</p>
        </div>

        <div style="padding: 20px 0;">
          <p style="font-size: 14px;">Hello <strong>${userName || 'Restorer Member'}</strong>,</p>
          <div style="background-color: #171618; border-left: 4px solid #ff7a1a; padding: 14px; margin: 16px 0; font-size: 14px; line-height: 1.6; color: #f5f2f0; white-space: pre-wrap;">
${message}
          </div>
        </div>

        <div style="text-align: center; border-top: 1px solid #292421; padding-top: 16px; color: #786d66; font-size: 11px;">
          <p style="margin: 0;">Classic Aircooled VW Works • Specialist Aircooled VW Heritage Restoration</p>
        </div>
      </div>
    `;

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"Classic Aircooled VW Works" <${fromAddress}>`,
          to,
          subject: subject || 'Message regarding your Classic VW Parts Request',
          html: htmlContent
        });
        return { success: true, messageId: info.messageId };
      } catch (err) {
        console.error(`⚠️ Failed to send direct email to ${to}:`, err.message);
        return { success: false, error: err.message };
      }
    } else {
      console.log(`✉️ [DIRECT EMAIL DISPATCH SIMULATED] To: ${to} | Subject: ${subject}`);
      return { success: true, simulated: true };
    }
  }
};
