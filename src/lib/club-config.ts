// ============================================================================
// RED CROSS CLUB — EDIT THESE VALUES WITH YOUR REAL DETAILS
// ============================================================================
// Replace each PLACEHOLDER below with your actual information.
// The site is fully frontend, so changes take effect after you redeploy/refresh.
// ============================================================================

export const clubConfig = {
  // Your club's WhatsApp number in INTERNATIONAL format, digits only.
  // Example for Nigeria: "2348012345678" (no +, no spaces, no dashes)
  whatsappNumber: "PLACEHOLDER_WHATSAPP_NUMBER", // e.g. "2348012345678"

  // Human-readable version shown on the page (with formatting)
  whatsappDisplay: "+234 PLACEHOLDER WHATSAPP",

  // Membership fee in Naira (number only, no commas/symbols)
  membershipFee: 2000,

  // Bank payment details displayed after the form is submitted
  bank: {
    name: "PLACEHOLDER BANK NAME",      // e.g. "Access Bank"
    accountName: "PLACEHOLDER ACCOUNT NAME", // e.g. "Red Cross Club UniAbuja"
    accountNumber: "0000000000",         // e.g. "1234567890"
  },

  // Payment window in minutes
  paymentWindowMinutes: 15,

  // Optional: alternate phone number for calls if user has no WhatsApp
  callNumber: "+234 PLACEHOLDER CALL",
};