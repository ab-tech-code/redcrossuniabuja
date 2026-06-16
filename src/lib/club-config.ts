// ============================================================================
// RED CROSS CLUB — EDIT THESE VALUES WITH YOUR REAL DETAILS
// ============================================================================
// Replace each PLACEHOLDER below with your actual information.
// The site is fully frontend, so changes take effect after you redeploy/refresh.
// ============================================================================

export const clubConfig = {
  // Your club's WhatsApp number in INTERNATIONAL format, digits only.
  // Example for Nigeria: "2348012345678" (no +, no spaces, no dashes)
  whatsappNumber: "2347042265967", // e.g. "2348012345678"

  // Human-readable version shown on the page (with formatting)
  whatsappDisplay: "+234 7042265967",

  // Membership fee in Naira (number only, no commas/symbols)
  membershipFee: 2000,

  // Bank payment details displayed after the form is submitted
  bank: {
    name: "Opay",      // e.g. "Access Bank"
    accountName: "Abdulhafiz Bashir", // e.g. "Red Cross Club UniAbuja"
    accountNumber: "7042265967",         // e.g. "1234567890"
  },

  // Payment window in minutes
  paymentWindowMinutes: 15,

  // Optional: alternate phone number for calls if user has no WhatsApp
  callNumber: "+234 7042265967",
};