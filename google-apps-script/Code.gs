var SITE_URL = "https://your-site-domain.com";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var now = new Date();
    var dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    var timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    var subject = "New Registration: " + (data.full_name || "Unknown");

    var logoUrl = SITE_URL + "/images/logo.jpg";

    var htmlBody = '<div style="font-family:\'Segoe UI\',Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0f;color:#f0f0f0;">' +
      '<div style="background:linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 40%,#0d0d1a 100%);padding:40px 30px;text-align:center;border-bottom:2px solid rgba(102,248,156,0.3);">' +
      '<div style="font-size:32px;font-weight:700;letter-spacing:6px;color:#66f89c;margin-bottom:4px;">747</div>' +
      '<div style="font-size:11px;color:#666;letter-spacing:4px;text-transform:uppercase;">Live Casino</div>' +
      '</div>' +
      '<div style="padding:30px;background:#0a0a0f;">' +
      '<div style="background:linear-gradient(135deg,rgba(102,248,156,0.05),rgba(58,212,131,0.02));border:1px solid rgba(102,248,156,0.15);border-radius:8px;padding:20px;margin-bottom:20px;">' +
      '<div style="font-size:11px;color:#66f89c;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">Hello Kenj</div>' +
      '<div style="font-size:18px;font-weight:600;color:#f0f0f0;">New Registration Inquiry</div>' +
      '</div>' +
      '<p style="color:#f0f0f0;font-size:14px;margin:0 0 4px 0;">A new user registered through the hero form.</p>' +
      '<p style="color:#888;font-size:13px;margin:0 0 16px 0;">Please review the details below and follow up if needed.</p>' +
      '<div style="background:linear-gradient(135deg,rgba(102,248,156,0.05),rgba(58,212,131,0.02));border:1px solid rgba(102,248,156,0.15);border-radius:8px;padding:20px;margin-bottom:20px;">' +
      '<div style="font-size:11px;color:#66f89c;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">' + safe(data.full_name) + '</div>' +
      '<table style="width:100%;border-collapse:separate;border-spacing:0;">' +
      '<tr><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#666;font-size:13px;width:120px;">Full Name</td><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#f0f0f0;font-size:14px;font-weight:500;">' + safe(data.full_name) + '</td></tr>' +
      '<tr><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#666;font-size:13px;">Email</td><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;"><a href="mailto:' + safe(data.email) + '" style="color:#66f89c;text-decoration:none;font-size:14px;">' + safe(data.email) + '</a></td></tr>' +
      '<tr><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#666;font-size:13px;">Username</td><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#f0f0f0;font-size:14px;font-weight:500;">' + safe(data.username) + '</td></tr>' +
      '<tr><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#666;font-size:13px;">Phone</td><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#f0f0f0;font-size:14px;">' + safe(data.phone) + '</td></tr>' +
      '<tr><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#666;font-size:13px;">Country</td><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#f0f0f0;font-size:14px;">' + safe(data.country) + '</td></tr>' +
      (data.facebook_url ? '<tr><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;color:#666;font-size:13px;">Facebook</td><td style="padding:14px 0;border-bottom:1px solid #1a1a2e;"><a href="' + safe(data.facebook_url) + '" target="_blank" style="color:#66f89c;text-decoration:none;font-size:14px;">' + safe(data.facebook_url) + '</a></td></tr>' : '') +
      '<tr><td style="padding:14px 0;color:#666;font-size:13px;">Date</td><td style="padding:14px 0;color:#f0f0f0;font-size:14px;">' + dateStr + '</td></tr>' +
      '<tr><td style="padding:0;color:#666;font-size:13px;">Time</td><td style="padding:0;color:#f0f0f0;font-size:14px;">' + timeStr + '</td></tr>' +
      '</table>' +
      '<div style="margin-top:24px;padding:16px;background:#12121a;border:1px solid #1a1a2e;border-radius:6px;text-align:center;">' +
      '<div style="font-size:11px;color:#66f89c;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Reply</div>' +
      '<a href="mailto:747livecasino.teamkenj@atomicmail.io" style="color:#f0f0f0;font-size:14px;text-decoration:underline;">747livecasino.teamkenj@atomicmail.io</a>' +
      '</div>' +
      '</div>' +
      '<div style="padding:16px 30px;background:#07070d;text-align:center;color:#333;font-size:10px;letter-spacing:1px;border-top:1px solid #1a1a2e;">' +
      '747 LIVE CASINO &middot; Registration Inquiry &middot; ' + dateStr + ' at ' + timeStr +
      '</div>' +
      '</div>';

    MailApp.sendEmail({
      to: "747livecasino.teamkenj@atomicmail.io",
      replyTo: "747livecasino.teamkenj@atomicmail.io",
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function safe(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function doGet(e) {
  return ContentService.createTextOutput("OK");
}

function testSendEmail() {
  var now = new Date();
  var dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  var timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  var htmlBody = '<div style="font-family:\'Segoe UI\',Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0f;color:#f0f0f0;">' +
    '<div style="background:linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 40%,#0d0d1a 100%);padding:40px 30px;text-align:center;border-bottom:2px solid rgba(102,248,156,0.3);">' +
    '<div style="font-size:32px;font-weight:700;letter-spacing:6px;color:#66f89c;margin-bottom:4px;">747</div>' +
    '<div style="font-size:11px;color:#666;letter-spacing:4px;text-transform:uppercase;">Live Casino</div>' +
    '</div>' +
    '<div style="padding:30px;background:#0a0a0f;">' +
    '<div style="background:linear-gradient(135deg,rgba(102,248,156,0.05),rgba(58,212,131,0.02));border:1px solid rgba(102,248,156,0.15);border-radius:8px;padding:20px;margin-bottom:20px;">' +
    '<div style="font-size:11px;color:#66f89c;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Test Email</div>' +
    '<div style="font-size:18px;font-weight:600;color:#f0f0f0;">Email is working</div>' +
    '</div>' +
    '<p style="color:#f0f0f0;font-size:14px;margin:0 0 8px 0;">If you see this email, Google Apps Script is configured correctly.</p>' +
    '<p style="color:#666;font-size:13px;margin:0;">' + dateStr + ' at ' + timeStr + '</p>' +
    '</div>' +
    '<div style="padding:16px 30px;background:#07070d;text-align:center;color:#333;font-size:10px;letter-spacing:1px;border-top:1px solid #1a1a2e;">' +
    '747 LIVE CASINO &middot; Test Email &middot; ' + dateStr + ' at ' + timeStr +
    '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: "747livecasino.teamkenj@atomicmail.io",
    subject: "GAS Test — 747 Live Casino",
    htmlBody: htmlBody
  });
}