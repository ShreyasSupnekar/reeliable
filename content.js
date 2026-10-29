/* =====================================================================
   ✏️  EDIT YOUR WEBSITE HERE
   ---------------------------------------------------------------------
   This is the ONLY file you need to change.
   Change the text between the "quotation marks" and save the file.

   Rules (so nothing breaks):
   • Keep the quotation marks " " around every piece of text.
   • Keep the comma , at the end of each line AND after each project's }.
   • If you want to leave something empty, use two quotes: ""
   ===================================================================== */


/* ---------------------------------------------------------------------
   1) YOUR AGENCY DETAILS
   --------------------------------------------------------------------- */
const agencyInfo = {
  name: "Reeliable",                 // Your agency name (shown in the menu, footer and browser tab)

  phone: "8010534138",               // Your phone number (digits only)
  countryCode: "91",                 // Country code without the +  (91 = India)

  email: "contact@reeliable.studio",                              // Form requests are emailed here
  instagram: "https://www.instagram.com/reeliable.studios",       // Full link
  x: "https://x.com/reeliablestudio",                             // Full link
  facebook: "https://www.facebook.com/Reeliable.studio",          // Full link
};


/* ---------------------------------------------------------------------
   2) TOP OF THE PAGE (HERO)
   Tip: wrap words in *stars* to make them italic + accent colour.
   --------------------------------------------------------------------- */
const heroContent = {
  eyebrow: "AI UGC Ad Studio",
  headline: "Your next best ad doesn't need a *film set.*",
  subtitle: "We make scroll-stopping, creator-style ads with AI — scripted, voiced and edited for social. More concepts, faster, without the shoot.",
};


/* ---------------------------------------------------------------------
   3) YOUR 6 ADS  (the "Recent Work" section)
   ---------------------------------------------------------------------
   • Put your files in the "assets" (or "Samples") folder.
   • Then write the file name in "media" below.
   • Videos (.mp4 / .webm) and images (.jpg / .png / .webp) both work.
   • File names are CASE-SENSITIVE once online (.MP4 is not .mp4).
   • Projects are shown in exactly the order below.
   • Until a file exists, a stylish placeholder is shown automatically.
   --------------------------------------------------------------------- */
const projects = [
  {
    title: "Reeliable Promo Ad",
    category: "",
    description: "Promo Reel Format",
    media: "assets/promo.mp4",
  },
  {
    title: "Foxtale Sunscreen",
    category: "",
    description: "A creator-style routine ad built around one strong hook.",
    media: "assets/WhatsApp Video 2026-10-05 at 3.23.37 PM.mp4",
  },
  {
    title: "Amazfit Smartwatch",
    category: "",
    description: "UGC style Cinematic Display.",
    media: "assets/amazfit.mp4",
  },
  {
    title: "Tiffany & Co. Perfume",
    category: "",
    description: "Classic UGC format",
    media: "assets/tiffany.mp4",
  },
  {
    title: "Vai Dai Coffee",
    category: "",
    description: "First-impression of brand made for Reels.",
    media: "assets/WhatsApp Video 2026-10-05 at 5.00.54 PM.mp4",
  },
  {
    title: "OLLO Shoes",
    category: "",
    description: "UGC Feature format.",
    media: "assets/ollo.mp4",
  },
];


/* ---------------------------------------------------------------------
   4) STRATEGY-CALL FORM
   ---------------------------------------------------------------------
   RECOMMENDED: Get a free key at https://web3forms.com using
   contact@reeliable.studio and paste it below. Every form request is
   then emailed to that address.

   If left empty, the form uses FormSubmit with the email above.
   The very first time, FormSubmit sends one "Activate" email —
   click it once and you're done.
   --------------------------------------------------------------------- */
const formSettings = {
  web3formsKey: "",                  // e.g. "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
};
