/* =====================================================================
   ✏️  EDIT YOUR WEBSITE HERE
   ---------------------------------------------------------------------
   This is the ONLY file you need to change.
   Change the text between the "quotation marks" and save the file.

   Rules (so nothing breaks):
   • Keep the quotation marks " " around every piece of text.
   • Keep the comma , at the end of each line.
   • If you want to leave something empty, use two quotes: ""
   ===================================================================== */


/* ---------------------------------------------------------------------
   1) YOUR AGENCY DETAILS
   --------------------------------------------------------------------- */
const agencyInfo = {
  name: "Reeliable",                 // Your agency name (shown in the menu, footer and browser tab)

  phone: "8010534138",               // Your phone number (digits only)
  countryCode: "91",                 // Country code without the +  (91 = India)

  email: "",                         // e.g. "hello@youragency.com"
  instagram: "",                     // Full link, e.g. "https://instagram.com/youragency"
  x: "",                             // Full link, e.g. "https://x.com/youragency"
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
   3) YOUR 5 ADS  (the "Recent Work" section)
   ---------------------------------------------------------------------
   • Put your files in the "assets" folder.
   • Then write the file name in "media" below.
   • Videos (.mp4 / .webm) and images (.jpg / .png / .webp) both work.
   • The FIRST project is shown big (your best ad goes first!).
   • Until a file exists, a stylish placeholder is shown automatically.
   --------------------------------------------------------------------- */
const projects = [
  {
    title: "Skincare Brand",
    category: "AI UGC Product Ad",
    description: "A creator-style routine ad built around one strong hook.",
    media: "assets/work1.mp4",
  },
  {
    title: "Fitness Brand",
    category: "AI UGC Testimonial Ad",
    description: "Testimonial-style ad with three hook variations.",
    media: "assets/work2.mp4",
  },
  {
    title: "Coffee Brand",
    category: "AI UGC Unboxing Ad",
    description: "First-impression unboxing made for Reels.",
    media: "assets/work3.mp4",
  },
  {
    title: "Fashion Label",
    category: "AI UGC Try-On Ad",
    description: "Try-on haul format with on-screen captions.",
    media: "assets/work4.mp4",
  },
  {
    title: "Tech Gadget",
    category: "AI UGC Demo Ad",
    description: "Problem–solution demo in under 20 seconds.",
    media: "assets/work5.mp4",
  },
];


/* ---------------------------------------------------------------------
   4) STRATEGY-CALL FORM (optional, but recommended)
   ---------------------------------------------------------------------
   As soon as you add your email above, form requests are emailed to you
   automatically (via FormSubmit). The very first time, FormSubmit sends
   you one "Activate" email — click it once and you're done.

   Want a more reliable option? Get a free key at https://web3forms.com
   and paste it below. If a key is added, it is used instead.
   --------------------------------------------------------------------- */
const formSettings = {
  web3formsKey: "",                  // e.g. "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
};
