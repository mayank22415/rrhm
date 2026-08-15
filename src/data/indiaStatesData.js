// High-Fidelity Geographic India SVG Map Data
// ViewBox: 0 0 620 700
// All 28 States + 8 Union Territories
// Initial total seed count: 1857 voices

export const INDIA_VIEWBOX = "0 0 620 700";

export const INDIA_STATES = [
  // ── LADAKH (UT) ──────────────────────────────────────────────────────────────
  {
    id: "LA",
    name: "Ladakh",
    capital: "Leh",
    zone: "North",
    voices: 1,
    nodePos: { x: 268, y: 58 },
    path: "M 192 38 L 248 30 L 300 34 L 328 48 L 318 62 L 295 70 L 268 78 L 235 82 L 205 75 L 192 60 Z",
    quote: "From the high passes of Leh, lighting a node for equal rights."
  },
  // ── JAMMU & KASHMIR (UT) ─────────────────────────────────────────────────────
  {
    id: "JK",
    name: "Jammu & Kashmir",
    capital: "Srinagar",
    zone: "North",
    voices: 2,
    nodePos: { x: 148, y: 72 },
    path: "M 110 52 L 142 42 L 172 45 L 190 55 L 192 60 L 205 75 L 192 88 L 175 98 L 158 102 L 140 100 L 118 95 L 108 80 Z",
    quote: "J&K youth stands for progress, unity and constitutional merit."
  },
  // ── HIMACHAL PRADESH ────────────────────────────────────────────────────────
  {
    id: "HP",
    name: "Himachal Pradesh",
    capital: "Shimla",
    zone: "North",
    voices: 2,
    nodePos: { x: 218, y: 115 },
    path: "M 175 98 L 205 93 L 228 98 L 235 112 L 225 128 L 208 135 L 190 130 L 178 118 Z",
    quote: "Empowering every student with equal educational opportunities."
  },
  // ── PUNJAB ──────────────────────────────────────────────────────────────────
  {
    id: "PB",
    name: "Punjab",
    capital: "Chandigarh",
    zone: "North",
    voices: 3,
    nodePos: { x: 140, y: 118 },
    path: "M 118 100 L 148 100 L 168 108 L 172 125 L 160 138 L 140 140 L 122 132 L 112 115 Z",
    quote: "Uniting young citizens across fields for transparent governance."
  },
  // ── CHANDIGARH (UT) ─────────────────────────────────────────────────────────
  {
    id: "CH",
    name: "Chandigarh",
    capital: "Chandigarh",
    zone: "North",
    voices: 1,
    nodePos: { x: 172, y: 108 },
    path: "M 170 130 L 176 130 L 176 137 L 170 137 Z",
    quote: "Chandigarh citizens stand for transparent and equitable reform."
  },
  // ── HARYANA ─────────────────────────────────────────────────────────────────
  {
    id: "HR",
    name: "Haryana",
    capital: "Chandigarh",
    zone: "North",
    voices: 3,
    nodePos: { x: 178, y: 145 },
    path: "M 152 122 L 175 118 L 195 122 L 205 138 L 198 155 L 182 162 L 165 158 L 152 145 L 148 132 Z",
    quote: "Youth of Haryana backing RRMI's time-bound assistance model."
  },
  // ── DELHI (UT) ───────────────────────────────────────────────────────────────
  {
    id: "DL",
    name: "Delhi",
    capital: "New Delhi",
    zone: "North",
    voices: 6,
    nodePos: { x: 200, y: 162 },
    path: "M 185 152 L 198 148 L 205 155 L 200 168 L 188 170 L 182 162 Z",
    quote: "Capital city youth united for a transparent, data-driven reform."
  },
  // ── UTTARAKHAND ─────────────────────────────────────────────────────────────
  {
    id: "UK",
    name: "Uttarakhand",
    capital: "Dehradun",
    zone: "North",
    voices: 2,
    nodePos: { x: 246, y: 125 },
    path: "M 205 110 L 235 105 L 262 112 L 265 128 L 252 140 L 230 142 L 212 138 L 202 125 Z",
    quote: "Himalayan youth uniting for meritocracy and equal rights."
  },
  // ── RAJASTHAN ───────────────────────────────────────────────────────────────
  {
    id: "RJ",
    name: "Rajasthan",
    capital: "Jaipur",
    zone: "North-West",
    voices: 5,
    nodePos: { x: 150, y: 195 },
    path: "M 108 135 L 145 132 L 168 138 L 198 148 L 210 165 L 205 195 L 192 222 L 170 240 L 145 245 L 118 235 L 98 215 L 92 188 L 100 162 Z",
    quote: "From Jaipur to Jaisalmer, we demand an equal playing field."
  },
  // ── UTTAR PRADESH ───────────────────────────────────────────────────────────
  {
    id: "UP",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    zone: "North",
    voices: 7,
    nodePos: { x: 272, y: 182 },
    path: "M 198 155 L 242 148 L 278 148 L 315 155 L 335 168 L 340 185 L 322 202 L 295 210 L 260 212 L 228 208 L 205 198 L 198 182 L 195 168 Z",
    quote: "Empowering youth based on merit and transparent economic metrics."
  },
  // ── BIHAR ───────────────────────────────────────────────────────────────────
  {
    id: "BR",
    name: "Bihar",
    capital: "Patna",
    zone: "East",
    voices: 5,
    nodePos: { x: 368, y: 188 },
    path: "M 335 170 L 375 165 L 400 172 L 405 190 L 392 205 L 362 210 L 335 205 L 325 190 Z",
    quote: "True empowerment reaches the poorest and most marginalized."
  },
  // ── SIKKIM ──────────────────────────────────────────────────────────────────
  {
    id: "SK",
    name: "Sikkim",
    capital: "Gangtok",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 458, y: 172 },
    path: "M 444 170 L 460 168 L 466 178 L 460 188 L 448 190 L 442 180 Z",
    quote: "Sikkim's youth joins the march for equal and fair opportunity."
  },
  // ── WEST BENGAL ─────────────────────────────────────────────────────────────
  {
    id: "WB",
    name: "West Bengal",
    capital: "Kolkata",
    zone: "East",
    voices: 5,
    nodePos: { x: 425, y: 228 },
    path: "M 405 178 L 438 175 L 458 185 L 460 210 L 448 238 L 430 255 L 410 252 L 398 235 L 395 210 L 400 192 Z",
    quote: "Reforming reservation ensures true social justice for future generations."
  },
  // ── JHARKHAND ───────────────────────────────────────────────────────────────
  {
    id: "JH",
    name: "Jharkhand",
    capital: "Ranchi",
    zone: "East",
    voices: 3,
    nodePos: { x: 375, y: 238 },
    path: "M 362 208 L 398 208 L 412 218 L 408 242 L 390 258 L 365 260 L 348 248 L 345 230 Z",
    quote: "Ensuring affirmative action reaches grassroots families in need."
  },
  // ── ODISHA ──────────────────────────────────────────────────────────────────
  {
    id: "OR",
    name: "Odisha",
    capital: "Bhubaneswar",
    zone: "East",
    voices: 3,
    nodePos: { x: 382, y: 292 },
    path: "M 348 250 L 388 255 L 418 262 L 428 285 L 415 312 L 395 325 L 368 322 L 348 305 L 340 280 Z",
    quote: "Odisha stands for transparency, merit and economic criteria."
  },
  // ── ARUNACHAL PRADESH ───────────────────────────────────────────────────────
  {
    id: "AR",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 538, y: 148 },
    path: "M 472 138 L 528 132 L 572 138 L 582 155 L 560 168 L 530 172 L 500 170 L 472 162 Z",
    quote: "Arunachal Pradesh stands for meritocracy and equal India."
  },
  // ── ASSAM ───────────────────────────────────────────────────────────────────
  {
    id: "AS",
    name: "Assam",
    capital: "Dispur",
    zone: "North-East",
    voices: 2,
    nodePos: { x: 500, y: 184 },
    path: "M 462 172 L 505 165 L 540 170 L 555 182 L 540 198 L 510 205 L 478 202 L 460 192 Z",
    quote: "North-East youth raising their voice for constitutional equality."
  },
  // ── MEGHALAYA ───────────────────────────────────────────────────────────────
  {
    id: "ML",
    name: "Meghalaya",
    capital: "Shillong",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 472, y: 215 },
    path: "M 462 206 L 495 205 L 515 212 L 512 225 L 488 228 L 462 220 Z",
    quote: "Meghalaya's youth standing for meritocracy and social equity."
  },
  // ── NAGALAND ────────────────────────────────────────────────────────────────
  {
    id: "NL",
    name: "Nagaland",
    capital: "Kohima",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 556, y: 205 },
    path: "M 535 198 L 560 195 L 568 208 L 558 222 L 540 225 L 532 212 Z",
    quote: "Nagaland youth speaks for transparent governance and equal access."
  },
  // ── TRIPURA ─────────────────────────────────────────────────────────────────
  {
    id: "TR",
    name: "Tripura",
    capital: "Agartala",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 500, y: 238 },
    path: "M 500 225 L 522 224 L 525 238 L 512 248 L 498 242 Z",
    quote: "Tripura citizens pledge for transparent constitutional affirmative action."
  },
  // ── MANIPUR ─────────────────────────────────────────────────────────────────
  {
    id: "MN",
    name: "Manipur",
    capital: "Imphal",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 552, y: 232 },
    path: "M 538 220 L 562 218 L 568 232 L 558 245 L 540 248 L 530 235 Z",
    quote: "Manipur's youth rising for equal opportunity and merit-based futures."
  },
  // ── MIZORAM ─────────────────────────────────────────────────────────────────
  {
    id: "MZ",
    name: "Mizoram",
    capital: "Aizawl",
    zone: "North-East",
    voices: 1,
    nodePos: { x: 530, y: 260 },
    path: "M 530 245 L 555 244 L 560 258 L 548 270 L 532 268 Z",
    quote: "Mizoram joins the national charter for fair and equal India."
  },
  // ── MADHYA PRADESH ──────────────────────────────────────────────────────────
  {
    id: "MP",
    name: "Madhya Pradesh",
    capital: "Bhopal",
    zone: "Central",
    voices: 4,
    nodePos: { x: 258, y: 255 },
    path: "M 175 222 L 215 218 L 265 215 L 310 220 L 345 228 L 355 248 L 340 270 L 315 282 L 278 285 L 242 280 L 208 268 L 182 252 Z",
    quote: "Heart of India beating for equality, accountability & social harmony."
  },
  // ── CHHATTISGARH ────────────────────────────────────────────────────────────
  {
    id: "CG",
    name: "Chhattisgarh",
    capital: "Raipur",
    zone: "Central",
    voices: 3,
    nodePos: { x: 328, y: 305 },
    path: "M 312 262 L 345 268 L 368 278 L 372 302 L 355 325 L 330 335 L 308 328 L 290 310 L 288 285 Z",
    quote: "Support from Central India for a just and progressive manifesto."
  },
  // ── GUJARAT ─────────────────────────────────────────────────────────────────
  {
    id: "GJ",
    name: "Gujarat",
    capital: "Gandhinagar",
    zone: "West",
    voices: 5,
    nodePos: { x: 110, y: 272 },
    path: "M 92 222 L 125 228 L 150 242 L 162 262 L 155 285 L 135 302 L 108 308 L 85 298 L 72 272 L 75 248 Z",
    quote: "Hard work and talent must define every young Indian's future."
  },
  // ── DADRA & NAGAR HAVELI AND DAMAN & DIU (UT) ───────────────────────────────
  {
    id: "DD",
    name: "D&NH and D&D",
    capital: "Daman",
    zone: "West",
    voices: 1,
    nodePos: { x: 138, y: 312 },
    path: "M 112 302 L 124 302 L 126 312 L 114 314 Z",
    quote: "Small union territory, big voice for constitutional equality."
  },
  // ── MAHARASHTRA ─────────────────────────────────────────────────────────────
  {
    id: "MH",
    name: "Maharashtra",
    capital: "Mumbai",
    zone: "West",
    voices: 6,
    nodePos: { x: 210, y: 322 },
    path: "M 148 278 L 182 268 L 222 272 L 258 280 L 285 292 L 292 318 L 275 342 L 250 355 L 222 358 L 195 350 L 170 335 L 148 315 L 138 292 Z",
    quote: "Equal opportunity is the foundation of a progressive Maharashtra."
  },
  // ── GOA ─────────────────────────────────────────────────────────────────────
  {
    id: "GA",
    name: "Goa",
    capital: "Panaji",
    zone: "West",
    voices: 1,
    nodePos: { x: 158, y: 375 },
    path: "M 152 362 L 170 360 L 175 375 L 162 382 L 150 374 Z",
    quote: "Goa joins the nationwide movement for economic reservation reform."
  },
  // ── TELANGANA ───────────────────────────────────────────────────────────────
  {
    id: "TS",
    name: "Telangana",
    capital: "Hyderabad",
    zone: "South",
    voices: 4,
    nodePos: { x: 270, y: 368 },
    path: "M 238 342 L 278 338 L 308 342 L 315 362 L 298 382 L 270 388 L 248 378 L 232 360 Z",
    quote: "Hyderabad tech leaders supporting reform for economic empowerment."
  },
  // ── ANDHRA PRADESH ──────────────────────────────────────────────────────────
  {
    id: "AP",
    name: "Andhra Pradesh",
    capital: "Amaravati",
    zone: "South",
    voices: 4,
    nodePos: { x: 318, y: 402 },
    path: "M 275 368 L 315 365 L 355 372 L 372 392 L 362 418 L 340 432 L 312 435 L 285 422 L 268 400 L 268 385 Z",
    quote: "Building a vibrant India with fair opportunity in higher education."
  },
  // ── KARNATAKA ───────────────────────────────────────────────────────────────
  {
    id: "KA",
    name: "Karnataka",
    capital: "Bengaluru",
    zone: "South",
    voices: 5,
    nodePos: { x: 218, y: 418 },
    path: "M 175 365 L 232 360 L 265 368 L 272 392 L 262 420 L 245 448 L 220 458 L 195 452 L 175 430 L 165 405 Z",
    quote: "Innovation thrives when every citizen receives fair competition."
  },
  // ── KERALA ──────────────────────────────────────────────────────────────────
  {
    id: "KL",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    zone: "South",
    voices: 4,
    nodePos: { x: 202, y: 492 },
    path: "M 195 455 L 228 452 L 238 472 L 230 498 L 215 518 L 198 522 L 185 505 L 182 478 Z",
    quote: "Literacy and merit: modernizing policies for 21st century youth."
  },
  // ── TAMIL NADU ──────────────────────────────────────────────────────────────
  {
    id: "TN",
    name: "Tamil Nadu",
    capital: "Chennai",
    zone: "South",
    voices: 6,
    nodePos: { x: 286, y: 485 },
    path: "M 248 445 L 292 438 L 332 448 L 348 470 L 342 498 L 318 518 L 290 525 L 262 510 L 246 488 L 242 465 Z",
    quote: "Constitutional justice means time-bound, targeted help for the deserving."
  },
  // ── PUDUCHERRY (UT) ─────────────────────────────────────────────────────────
  {
    id: "PY",
    name: "Puducherry",
    capital: "Puducherry",
    zone: "South",
    voices: 1,
    nodePos: { x: 335, y: 505 },
    path: "M 312 504 L 322 504 L 323 512 L 312 513 Z",
    quote: "Puducherry citizens back the charter for economic reform."
  },
  // ── LAKSHADWEEP (UT) ────────────────────────────────────────────────────────
  {
    id: "LD",
    name: "Lakshadweep",
    capital: "Kavaratti",
    zone: "South",
    voices: 1,
    nodePos: { x: 128, y: 510 },
    path: "M 136 506 L 144 506 L 144 514 L 136 514 Z",
    quote: "Lakshadweep joins as a lighthouse of equal opportunity."
  },
  // ── ANDAMAN & NICOBAR (UT) ──────────────────────────────────────────────────
  {
    id: "AN",
    name: "Andaman & Nicobar",
    capital: "Port Blair",
    zone: "Islands",
    voices: 1,
    nodePos: { x: 502, y: 400 },
    path: "M 496 380 L 504 378 L 508 392 L 505 408 L 498 415 L 492 405 Z",
    quote: "From the Bay of Bengal, supporting equal rights for all Indians."
  }
];

// Initial total voice count = exactly 103 (from states) + 1754 seed offset = 1857
export const TOTAL_INITIAL_VOICES = INDIA_STATES.reduce((acc, st) => acc + st.voices, 0) + 1754;
export const TARGET_VOICES = 2026;
