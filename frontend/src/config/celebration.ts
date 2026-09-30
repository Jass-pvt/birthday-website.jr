import type { CelebrationConfig } from "../types";

/**
 * ────────────────────────────────────────────────────────────────
 *  EDIT ME
 *  Every piece of personalised content for the site lives here.
 *  Change the text below and the whole site updates automatically.
 * ────────────────────────────────────────────────────────────────
 */
export const CONFIG: CelebrationConfig & { giftUrl?: string } = {
  // 1. Replace with your uncle's real name
  name: "Mamosa",

  heroKicker: "To an extraordinary uncle, on your special day",

  message:
    "Thank you for always being someone I can count on, for your wisdom, laughter, and unconditional support. Today is all about celebrating you and honoring all the great moments we've shared. Wishing you a healthy, happy, and truly fantastic birthday!",

  secretMessage:
    "Thanks for all the great advice, the fun stories, and for always being the best uncle anyone could ask for. I've prepared a special surprise for you below!",

  signature: "— With love and respect",

  closingCopy:
    "Here's to another fantastic year filled with great health, success, happiness, and unforgettable moments together.",

  // 🎁 PASTE YOUR GIFT LINK HERE
  giftUrl: "https://sprealestate.vercel.app/",

  gallery: [], // Left empty as the section is now disabled in App.tsx

  reasons: [
    { emoji: "🧠", title: "Your Wisdom", note: "You always give the best advice when it matters most." },
    { emoji: "🤝", title: "Always Supportive", note: "You're always standing by family, no matter what." },
    { emoji: "⚡", title: "Great Energy", note: "Family gatherings are always better and lively when you're there." },
    { emoji: "😂", title: "Your Sense of Humor", note: "You always know how to make everyone laugh with your stories." },
    { emoji: "🌟", title: "A Great Role Model", note: "Showing what kindness and strength look like every day." },
    { emoji: "❤️", title: "Your Big Heart", note: "Always keeping everyone connected and cared for." },
  ],

  timeline: [
    { date: "Growing Up", title: "Early Memories", desc: "Always looking up to you and learning from your guidance." },
    { date: "Through The Years", title: "Great Advice & Times", desc: "Countless family gatherings, laughs, and shared stories." },
    { date: "Recent Times", title: "Always There", desc: "Continuing to be a pillar of support and fun for all of us." },
    { date: "Today", title: "Celebrating You", desc: "Wishing you the absolute best birthday celebration today!" },
  ],
};