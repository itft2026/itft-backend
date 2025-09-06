const eventTemplate = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>{{title}}</title>
  <style>
    /* Client Resets */
    body,table,td,a { -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; }
    img { border:0; outline:none; text-decoration:none; height:auto; display:block; }
    table { border-collapse:collapse !important; }
    body { margin:0 !important; padding:0 !important; width:100% !important; }

    /* Responsive */
    @media screen and (max-width: 600px) {
      .container { width:100% !important; }
      .p-24 { padding:16px !important; }
      .h1 { font-size:22px !important; line-height:28px !important; }
      .btn { padding:12px 18px !important; }
      .logo { max-width:120px !important; height:auto !important; }
      .poster { max-width:100% !important; }
      .details-table td { display:block !important; width:100% !important; padding-bottom:12px !important; }
    }

    /* Dark mode (limited client support) */
    @media (prefers-color-scheme: dark) {
      body, .email-bg { background:#0b0f14 !important; }
      .card { background:#121821 !important; }
      .text, .muted, .h1 { color:#e8eef5 !important; }
      .muted { color:#b7c2cf !important; }
      .divider { border-color:#223042 !important; }
      .logo { filter: brightness(0.9) !important; }
    }

    /* Utilities */
    .email-bg { background:#f3f6fa; }
    .card { background:#ffffff; border-radius:14px; box-shadow:0 4px 6px rgba(0,0,0,0.05); }
    .p-24 { padding:24px; }
    .h1 { font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:28px; line-height:36px; color:#0b1a33; margin:0 0 12px 0; font-weight:700; }
    .text { font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#243b53; margin:0; }
    .muted { font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#5d728a; }
    .badge { display:inline-block; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:12px; line-height:1; padding:8px 12px; border-radius:999px; background:#eef4ff; color:#2b50ee; margin-right:8px; margin-bottom:4px; font-weight:600; }
    .badge--status { background:#e7f7ef; color:#0b8a46; }
    .badge--type { background:#fff2e6; color:#cc6600; }
    .btn { font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:16px; font-weight:600; text-decoration:none; padding:16px 32px; border-radius:12px; background:#ff6b35; color:#ffffff; display:inline-block; transition: all 0.3s ease; box-shadow:0 2px 4px rgba(255,107,53,0.3); white-space:nowrap; }
    .btn:hover { background:#e55a2b; transform:translateY(-1px); box-shadow:0 4px 8px rgba(255,107,53,0.4); }
    .btn-secondary { background:#e9eef9; color:#2b50ee; box-shadow:0 2px 4px rgba(0,0,0,0.1); }
    .divider { border-top:1px solid #e5edf7; height:1px; line-height:1px; margin:24px 0; }
    .center { text-align:center; }
    .w-100 { width:100%; }
    .logo { max-width:150px; height:auto; margin:0 auto; }
    .poster { border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); max-width:100%; height:auto; margin:0 auto; }
    .spacer-8 { height:8px; line-height:8px; }
    .spacer-16 { height:16px; line-height:16px; }
    .spacer-24 { height:24px; line-height:24px; }
    .spacer-32 { height:32px; line-height:32px; }
    
    /* Enhanced styling */
    .header-brand { background:linear-gradient(135deg, #2b50ee 0%, #1e3fd4 100%); padding:16px 24px; border-radius:14px 14px 0 0; }
    .event-details { background:#f8fafc; border-radius:8px; padding:20px; margin:16px 0; }
    .detail-item { text-align:center; }
    .detail-icon { font-size:24px; display:block; text-align:center; margin:0 auto 8px auto; line-height:1.2; }
    .detail-label { font-weight:600; color:#0b1a33; margin-bottom:4px; }
    .detail-value { color:#5d728a; }
  </style>
</head>
<body class="email-bg" style="background:#f3f6fa;">
  <!-- Preheader (hidden in most clients) -->
  <div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    New event from ITFT: {{title}} on {{date}} at {{location}}. Reserve your spot now!
  </div>

  <table role="presentation" class="w-100" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 24px;">
        <!-- Container -->
        <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:100%;">
          
          <!-- Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" class="card">
                <!-- Header with Logo -->
                <tr>
                  <td class="header-brand center">
                    <img class="logo" src="https://drive.google.com/uc?export=view&id=1UCmgYe_iqhYGnQjjGyoMzdOzVpT7_pGj" alt="ITFT Logo" width="150" style="max-width:150px; height:auto; margin:0 auto; display:block;">
                    <div class="spacer-16"></div>
                    <p style="color:#ffffff; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:14px; font-weight:600; margin:0; letter-spacing:0.5px;">UPCOMING EVENT</p>
                  </td>
                </tr>

                <tr>
                  <td class="p-24" style="padding:32px 24px 24px;">
                    <!-- Badges -->
                    <div class="center">
                      <span class="badge badge--status">{{status}}</span>
                      <span class="badge badge--type">{{type}}</span>
                    </div>

                    <div class="spacer-24"></div>

                    <!-- Title -->
                    <h1 class="h1 center">{{title}}</h1>

                    <!-- Poster (centered) -->
                    <div class="center">
                      <img class="poster" src="https://drive.google.com/uc?export=view&id={{poster}}" alt="Event Poster" width="500">
                    </div>

                    <div class="spacer-32"></div>

                    <!-- Description -->
                    <p class="text" style="text-align:center; font-size:18px; line-height:28px;">{{description}}</p>

                    <div class="spacer-24"></div>

                    <!-- Enhanced Details Block -->
                    <div class="event-details">
                      <table role="presentation" width="100%" class="details-table">
                        <tr>
                          <td class="detail-item" style="vertical-align:top; width:33%; text-align:center; padding:0 8px;">
                            <div class="detail-icon">📅</div>
                            <div class="detail-label text">Date & Time</div>
                            <div class="detail-value muted">{{date}}</div>
                          </td>
                          <td class="detail-item" style="vertical-align:top; width:33%; text-align:center; padding:0 8px;">
                            <div class="detail-icon">📍</div>
                            <div class="detail-label text">Location</div>
                            <div class="detail-value muted">{{location}}</div>
                          </td>
                          <td class="detail-item" style="vertical-align:top; width:34%; text-align:center; padding:0 8px;">
                            <div class="detail-icon">🎯</div>
                            <div class="detail-label text">Status</div>
                            <div class="detail-value muted">{{status}}</div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div class="spacer-32"></div>
                    <div class="center">
                      <a href="{{registrationLink}}" target="_blank" class="btn"><span style="white-space:nowrap;">🎫 Register Now</span></a>
                    </div>

                    <div class="spacer-24"></div>
                    <div class="divider"></div>
                    <div class="spacer-16"></div>

                    <!-- Footer -->
                    <p class="muted center" style="line-height:22px;">
                      You're receiving this because you subscribed to ITFT event updates.
                      <br>
                      <a href="{{unsubscribeUrl}}" style="color:#2b50ee; text-decoration:none;">Unsubscribe</a> • 
                      <a href="#" style="color:#2b50ee; text-decoration:none;">Update Preferences</a>
                    </p>
                    <p class="muted center">
                      <strong>ITFT</strong> • D-Block Kallam Haranadhareddy Institute of Technology, Guntur<br>Behind Kallam Spinning Mills, Chowdavaram, Guntur
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Copyright -->
          <tr>
            <td class="center muted" style="padding:16px 0 0 0; font-size:11px;">
               © 2025 Information Technology Future Technocrats (ITFT). All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = eventTemplate;
