# TinyTeller — UX Design & Flows

**Version:** 1.0.0  
**Date:** 2026-04-19  
**Designer:** UX Designer  
**Project:** TinyTeller MVP

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [User Personas](#user-personas)
3. [Design Principles](#design-principles)
4. [Primary User Flow](#primary-user-flow)
5. [Wireframes](#wireframes)
6. [Component Specifications](#component-specifications)
7. [Interaction Patterns](#interaction-patterns)
8. [Edge Cases & Error States](#edge-cases--error-states)
9. [Accessibility Considerations](#accessibility-considerations)
10. [Next Steps](#next-steps)

---

## Executive Summary

TinyTeller is a minimalist story-generation app designed for parents of toddlers (ages 2-4). The core interaction is the "Magic Button" — a single-tap experience that instantly generates and displays a bite-sized, age-appropriate story.

### Key UX Goals

- **Zero friction:** One tap from landing to story
- **Toddler-safe:** Large touch targets, no complex navigation
- **Parent-friendly:** Works in low light, minimal cognitive load
- **Delightful:** Magic-like experience that feels special

### Design Constraints

- Mobile-first (responsive for desktop)
- Must work with authentication flow (register/login)
- Backend API provides story generation via `/api/stories/generate`
- Stories are short (under 2 minutes reading time)
- Target: parents using the app while holding/sitting with a toddler

---

## User Personas

### Primary: Sarah, the Bedtime Parent

- **Age:** 32
- **Context:** Uses app at bedtime when her 3-year-old asks for "one more story"
- **Pain Points:** 
  - Too tired to make up stories
  - Physical books require light and disturb sleepy toddler
  - Complex apps frustrate her in the moment
- **Needs:**
  - Instant story access
  - Low-light friendly interface
  - No scrolling or complex menus
  - Stories that end quickly

### Secondary: Marcus, the Waiting Room Parent

- **Age:** 28
- **Context:** Uses app in waiting rooms, car rides, grocery store lines
- **Pain Points:**
  - Toddler gets restless and loud in public
  - Needs instant distraction
  - Can't always read aloud (public spaces)
- **Needs:**
  - Quick story generation
  - Readable on phone with one hand
  - Silent interaction (can whisper-read)

---

## Design Principles

### 1. Clarity over Cleverness

No hidden features. Every interaction is obvious.

### 2. One Tap to Magic

The primary conversion path should be: open app → tap button → see story. Three steps maximum.

### 3. Toddler-Proof

Large buttons (minimum 60px touch target), high contrast, no destructive actions without confirmation.

### 4. Parent-Exhausted Friendly

Works when parent is tired, distracted, or in low light. Minimal reading, maximum clarity.

### 5. Instant Gratification

Loading states are brief and reassuring. Never leave the user wondering if something happened.

---

## Primary User Flow

### Flow 1: First-Time User (Registration Path)

```
┌─────────────────────────────────┐
│  Landing Screen                 │
│  - Hero: "Instant Magic Stories"│
│  - Big Button: "Get Started"    │
│  - Subtext: "Free • No Ads"     │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Registration Screen            │
│  - Email input                  │
│  - Password input               │
│  - "Create Account" button      │
│  - "Already have account?" link │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Main Story Screen              │
│  - Welcome message (first time) │
│  - Big Magic Button             │
│  - "Tap for your story"         │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Story Display Screen           │
│  - Story title                  │
│  - Story content (scrollable)   │
│  - "New Story" button           │
│  - "Save" icon (optional MVP)   │
└─────────────────────────────────┘
```

**Flow Duration:** ~30 seconds including registration  
**Tap Count:** 4 taps total (Get Started → Create Account → Magic Button → New Story)

---

### Flow 2: Returning User (Login Path)

```
┌─────────────────────────────────┐
│  Landing Screen                 │
│  (same as above)                │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Login Screen                   │
│  - Email input                  │
│  - Password input               │
│  - "Log In" button              │
│  - "Need account?" link         │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Main Story Screen              │
│  (jumps directly to button)     │
└─────────────────────────────────┘
```

**Flow Duration:** ~10 seconds  
**Tap Count:** 2 taps (Get Started → Log In → Magic Button)

---

### Flow 3: Authenticated User (Direct to Magic)

```
┌─────────────────────────────────┐
│  Main Story Screen              │
│  (already authenticated)        │
│  - Big Magic Button             │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Loading State (1-3 seconds)    │
│  - Animated sparkle/magic effect│
│  - "Crafting your story..."     │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Story Display                  │
│  - Title appears first          │
│  - Content fades in             │
│  - "New Story" button at bottom │
└─────────────────────────────────┘
```

**Flow Duration:** ~5 seconds to see story  
**Tap Count:** 1 tap (Magic Button)

---

## Wireframes

### Screen 1: Landing Screen (Unauthenticated)

```
┌───────────────────────────────────────┐
│                                       │
│              ✨ TinyTeller            │
│                                       │
│     Instant Magic Stories for         │
│          Little Listeners             │
│                                       │
│                                       │
│         [  Get Started  ]             │
│        (large, centered button)       │
│                                       │
│        Free • No Ads • No Hassle      │
│                                       │
│                                       │
│     Already have an account?          │
│              Log In                   │
│              (link)                   │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Center-aligned, vertical stack
- Large button (min 60px height, 80% screen width)
- Soft gradient background (calming blues/purples)
- Top 1/3: branding and tagline
- Middle 1/3: CTA button
- Bottom 1/3: secondary action link

---

### Screen 2: Registration Screen

```
┌───────────────────────────────────────┐
│  ← Back          ✨ TinyTeller        │
│                                       │
│       Create Your Free Account        │
│                                       │
│                                       │
│   Email                               │
│   ┌─────────────────────────────────┐ │
│   │ you@example.com                 │ │
│   └─────────────────────────────────┘ │
│                                       │
│   Password                            │
│   ┌─────────────────────────────────┐ │
│   │ ••••••••                        │ │
│   └─────────────────────────────────┘ │
│   (min 8 characters)                  │
│                                       │
│                                       │
│       [  Create Account  ]            │
│                                       │
│                                       │
│     Already have an account?          │
│              Log In                   │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Back button top-left for escape route
- Input fields: 48px height minimum
- Clear validation messaging below each field
- Primary button only enabled when form is valid
- Link to login at bottom

---

### Screen 3: Login Screen

```
┌───────────────────────────────────────┐
│  ← Back          ✨ TinyTeller        │
│                                       │
│            Welcome Back!              │
│                                       │
│                                       │
│   Email                               │
│   ┌─────────────────────────────────┐ │
│   │ you@example.com                 │ │
│   └─────────────────────────────────┘ │
│                                       │
│   Password                            │
│   ┌─────────────────────────────────┐ │
│   │ ••••••••                        │ │
│   └─────────────────────────────────┘ │
│                                       │
│                                       │
│          [  Log In  ]                 │
│                                       │
│                                       │
│        Need an account?               │
│            Sign Up                    │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Identical structure to registration for consistency
- Friendly "Welcome Back!" instead of cold "Login"
- Same input field specifications

---

### Screen 4: Main Story Screen (Magic Button)

```
┌───────────────────────────────────────┐
│                                    ☰  │
│                                       │
│                                       │
│              ✨                        │
│         TinyTeller                    │
│                                       │
│                                       │
│                                       │
│          ┌──────────────┐             │
│          │              │             │
│          │      ✨      │             │
│          │    Magic     │             │
│          │    Button    │             │
│          │              │             │
│          └──────────────┘             │
│       (large circular button)         │
│                                       │
│       Tap for your story              │
│                                       │
│                                       │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Hamburger menu top-right (for logout/settings)
- Magic Button: circular, 180px diameter
- Center of screen (vertically and horizontally)
- Pulsing glow animation (subtle)
- Minimalist — nothing else competes for attention

---

### Screen 5: Loading State

```
┌───────────────────────────────────────┐
│                                       │
│                                       │
│                                       │
│              ✨                        │
│         TinyTeller                    │
│                                       │
│                                       │
│          ┌──────────────┐             │
│          │              │             │
│          │      ✨      │             │
│          │   [spinner]  │             │
│          │              │             │
│          └──────────────┘             │
│                                       │
│      Crafting your story...           │
│                                       │
│       (animated sparkles)             │
│                                       │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Same layout as Main Story Screen
- Button transforms into spinner
- Reassuring text below
- Subtle sparkle animations around button
- Duration: 1-3 seconds (typical API response time)

---

### Screen 6: Story Display

```
┌───────────────────────────────────────┐
│  ← Back                            ☰  │
│                                       │
│        The Brave Little Rabbit        │
│              (title)                  │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │                                 │  │
│  │  Once upon a time, in a cozy   │  │
│  │  meadow, there lived a little  │  │
│  │  rabbit named Rosie. Rosie     │  │
│  │  loved to hop and play...      │  │
│  │                                 │  │
│  │  [Story content continues...]  │  │
│  │                                 │  │
│  │  ...and Rosie hopped happily   │  │
│  │  home. The end.                │  │
│  │                                 │  │
│  └─────────────────────────────────┘  │
│                                       │
│          [  New Story  ]              │
│                                       │
│              ♡ Save                   │
│             (optional)                │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Back button returns to Magic Button screen
- Story title: large, centered, 24px font
- Story content: scrollable area, 18px font, generous line height (1.6)
- "New Story" button: primary action, fixed at bottom
- Optional "Save" link below (out of scope for MVP?)

---

### Screen 7: Menu Overlay (Hamburger)

```
┌───────────────────────────────────────┐
│                                    ✕  │
│                                       │
│         ✨ TinyTeller                 │
│                                       │
│                                       │
│         My Account                    │
│         you@example.com               │
│                                       │
│                                       │
│         Settings                      │
│                                       │
│         Help & Support                │
│                                       │
│         Log Out                       │
│                                       │
│                                       │
│                                       │
│                                       │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Slide-in from right or overlay
- Close button (✕) top-right
- Simple vertical list of menu items
- Log Out at bottom (destructive action, visually separated)

---

### Screen 8: Error State (API Failure)

```
┌───────────────────────────────────────┐
│                                    ☰  │
│                                       │
│                                       │
│              ✨                        │
│         TinyTeller                    │
│                                       │
│                                       │
│          ┌──────────────┐             │
│          │              │             │
│          │      ⚠️      │             │
│          │    Oops!     │             │
│          │              │             │
│          └──────────────┘             │
│                                       │
│    Something went wrong.              │
│      Let's try that again.            │
│                                       │
│          [  Try Again  ]              │
│                                       │
└───────────────────────────────────────┘
```

**Layout Notes:**
- Same layout as Magic Button screen
- Error icon replaces sparkle
- Friendly, non-technical error message
- "Try Again" button to retry API call
- No blame language ("we" instead of "you")

---

## Component Specifications

### Button: Primary (Magic Button)

**Size:** 180px diameter (circular)  
**States:**
- Default: Gradient fill (purple to blue), white sparkle icon, subtle glow
- Hover: Increased glow intensity
- Active/Pressed: Scale down 95%, stronger shadow
- Loading: Transform to spinner, maintain size
- Disabled: Grayscale, no glow, no interaction

**Animation:**
- Idle: Gentle pulsing glow (0.8s loop)
- Tap: Immediate scale feedback + haptic (if mobile)
- Loading: Spinner rotation + sparkle particles

**Accessibility:**
- ARIA label: "Generate new story"
- Minimum touch target: 180px (exceeds 44px WCAG requirement)
- Focus ring: 4px solid outline when keyboard-focused

---

### Button: Secondary (New Story, Try Again)

**Size:** Full width (with padding), 56px height  
**States:**
- Default: Solid color, rounded corners (12px)
- Hover: Slightly darker shade
- Active: Scale 98%
- Disabled: Low opacity, no interaction

**Typography:**
- Font size: 18px
- Font weight: 600 (semibold)
- Letter spacing: 0.5px

---

### Input Field (Email, Password)

**Size:** Full width, 48px height  
**Border:** 2px solid, rounded corners (8px)  
**States:**
- Default: Light gray border
- Focus: Blue border, slight shadow
- Error: Red border, error message below
- Disabled: Gray background

**Typography:**
- Placeholder: 16px, gray color
- Input text: 16px, black color
- Helper/error text: 14px, below field

**Validation:**
- Email: Real-time format validation after blur
- Password: Character count shown, strength indicator (out of scope?)

---

### Story Content Container

**Layout:**
- Max width: 600px (on desktop)
- Padding: 24px
- Background: Soft cream/white
- Border radius: 16px

**Typography:**
- Title: 24px, bold, centered
- Body: 18px, line height 1.6, left-aligned
- Font family: Georgia or similar serif (for story readability)

**Scrolling:**
- Vertical scroll if content exceeds viewport
- Smooth scroll behavior
- Padding at bottom to ensure full story visible

---

## Interaction Patterns

### Pattern 1: Magic Button Tap

**User Action:** Taps Magic Button  
**System Response:**
1. Immediate visual feedback (scale down)
2. Haptic feedback (if mobile)
3. Transform button to loading spinner
4. Display "Crafting your story..." text
5. API call to `POST /api/stories/generate`
6. On success: Transition to Story Display (fade in)
7. On error: Show error state with "Try Again" button

**Expected Duration:** 1-3 seconds  
**Fallback:** If API takes >5 seconds, show extended loading message

---

### Pattern 2: Navigation Back from Story

**User Action:** Taps "Back" or "New Story"  
**System Response:**
1. Immediate visual feedback
2. Transition back to Magic Button screen (slide or fade)
3. Magic Button ready for next tap

**Expected Duration:** <500ms  
**Note:** Story is not persisted unless explicitly saved

---

### Pattern 3: Form Validation (Registration/Login)

**User Action:** Fills in email/password, taps submit  
**System Response:**
1. Disable submit button during API call
2. Show loading spinner in button
3. On success: Navigate to Main Story Screen
4. On error: Display inline error below relevant field
5. Re-enable form for corrections

**Error Messages:**
- Email already exists: "This email is already registered. Try logging in?"
- Invalid credentials: "Email or password is incorrect. Please try again."
- Network error: "Connection problem. Please check your internet and try again."

---

### Pattern 4: Menu Open/Close

**User Action:** Taps hamburger icon  
**System Response:**
1. Slide in menu from right (300ms animation)
2. Dim background behind menu
3. Close on: Tap X, tap outside menu, tap menu item

**Accessibility:**
- Focus trapped in menu when open
- Escape key closes menu
- Screen reader announces menu state

---

## Edge Cases & Error States

### Edge Case 1: Slow Network

**Scenario:** API call takes >3 seconds  
**Behavior:**
- Continue showing loading spinner
- After 5 seconds: Add text "Almost there..."
- After 10 seconds: Show timeout error
- Provide "Try Again" button

**Rationale:** Parent may be on slow network; avoid frustration by setting expectations

---

### Edge Case 2: Empty Story Response

**Scenario:** API returns success but story content is empty/malformed  
**Behavior:**
- Log error to monitoring
- Show generic error state to user
- "Try Again" generates new request

**Rationale:** Prevent blank screen; backend should validate, but frontend defends

---

### Edge Case 3: Toddler Spam-Taps Button

**Scenario:** Button tapped multiple times rapidly  
**Behavior:**
- Disable button after first tap
- Ignore subsequent taps until story loads or error occurs
- No multiple simultaneous API calls

**Rationale:** Prevent duplicate requests, preserve backend resources

---

### Edge Case 4: User Logs Out While Story Loading

**Scenario:** User opens menu and logs out during API call  
**Behavior:**
- Cancel in-flight API request
- Clear any partial story data
- Redirect to Landing Screen

**Rationale:** Clean state management; no orphaned data

---

### Edge Case 5: Extremely Long Story

**Scenario:** Backend returns story exceeding expected length (>2000 characters)  
**Behavior:**
- Display full story in scrollable container
- No artificial truncation
- Log analytics event (backend may need tuning)

**Rationale:** Trust backend but allow flexibility; don't break user experience

---

### Error State 1: Network Offline

**Message:** "You seem to be offline. Stories need an internet connection. Please check your connection and try again."  
**Action:** "Try Again" button  
**Prevention:** Check `navigator.onLine` before API call (optional)

---

### Error State 2: Authentication Expired

**Scenario:** JWT expires while user is on Magic Button screen  
**Behavior:**
- API returns 401 Unauthorized
- Frontend detects and redirects to Login screen
- Toast message: "Your session expired. Please log in again."

**Rationale:** Seamless re-authentication without data loss

---

### Error State 3: Server Error (500)

**Message:** "Our story generator is taking a break. Please try again in a moment."  
**Action:** "Try Again" button  
**Logging:** Send error to monitoring service

**Rationale:** Friendly language avoids technical jargon

---

## Accessibility Considerations

### WCAG 2.1 AA Compliance

**Color Contrast:**
- All text: minimum 4.5:1 contrast ratio
- Large text (24px+): minimum 3:1 contrast ratio
- Button states clearly distinguishable without relying on color alone

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Focus indicators clearly visible (4px outline)
- Logical tab order (top to bottom, left to right)

**Screen Reader Support:**
- ARIA labels on all buttons and inputs
- Form validation errors announced
- Loading states announced ("Generating story, please wait")
- Story title and content properly structured (h1, p tags)

**Touch Targets:**
- Minimum 44x44px for all tappable elements (WCAG 2.5.5)
- Magic Button exceeds this at 180px
- Adequate spacing between interactive elements (minimum 8px)

**Motion & Animation:**
- Respect `prefers-reduced-motion` media query
- Disable sparkle animations and pulsing for users who request reduced motion
- Maintain functionality without animations

**Font Sizing:**
- Support browser zoom up to 200%
- Use relative units (rem, em) instead of fixed pixels
- Minimum 16px base font size

---

## Responsive Design Notes

### Mobile (Primary Target)

- Portrait orientation optimized
- Magic Button: 180px diameter
- Full-width buttons with side padding
- Story text: 18px base size

### Tablet

- Same layout as mobile
- Slightly larger Magic Button (220px)
- Max-width constraints on story content (600px)

### Desktop

- Centered layout with max-width (480px)
- Story content wider (max 800px)
- Keyboard shortcuts (Enter to submit forms, Escape to close menu)

---

## Design Decisions & Rationale

### Decision 1: Circular Magic Button

**Why:** Circular buttons feel more "magical" and playful, appropriate for toddler-focused app. Also, no wrong way to tap a circle (vs rectangular button with edges).

**Alternatives Considered:** Star-shaped button (too complex), rectangular "Generate" button (too corporate)

---

### Decision 2: No Story History (MVP)

**Why:** Simplifies UI and reduces cognitive load. Focus on "one more story" use case, not library management.

**Future:** Could add "Saved Stories" feature post-MVP if user research shows demand.

---

### Decision 3: Authentication Required

**Why:** Backend API contract requires authentication. Allows future personalization (age-specific stories, saved preferences).

**Tradeoff:** Adds friction to first-time use. Mitigated by fast registration flow (2 fields only).

---

### Decision 4: Loading State with Friendly Text

**Why:** Reduces perceived wait time and sets expectations. Sparkle animation reinforces "magic" theme.

**Alternatives Considered:** Silent loading (feels broken), progress bar (too technical for this use case)

---

### Decision 5: Serif Font for Story Content

**Why:** Serif fonts are more readable for long-form text and evoke "storybook" feel.

**Alternatives Considered:** Sans-serif (too modern/digital), handwriting font (readability issues)

---

## Visual Design Notes (for Figma Implementation)

### Color Palette

**Primary Colors:**
- Magic Purple: `#8B5CF6` (button gradient start)
- Sky Blue: `#3B82F6` (button gradient end)
- Warm White: `#FAFAF9` (background)

**Neutral Colors:**
- Text Dark: `#1F2937` (headings, body text)
- Text Medium: `#6B7280` (helper text)
- Text Light: `#9CA3AF` (placeholders)

**Status Colors:**
- Success Green: `#10B981`
- Error Red: `#EF4444`
- Warning Yellow: `#F59E0B`

**Backgrounds:**
- Story Container: `#FFFBEB` (soft cream)
- Input Fields: `#FFFFFF` (pure white)

### Typography Scale

- **H1 (Landing):** 32px, bold
- **H2 (Screen Titles):** 24px, semibold
- **Story Title:** 24px, bold
- **Body Text:** 18px, regular
- **Button Text:** 18px, semibold
- **Helper Text:** 14px, regular

**Font Families:**
- UI Elements: Inter, SF Pro, system-ui (sans-serif)
- Story Content: Georgia, Cambria, serif

### Spacing System

- Base unit: 8px
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px
- XXLarge: 48px

### Shadows

- **Button Shadow:** `0 4px 12px rgba(139, 92, 246, 0.3)`
- **Card Shadow:** `0 2px 8px rgba(0, 0, 0, 0.1)`
- **Input Focus Shadow:** `0 0 0 3px rgba(59, 130, 246, 0.2)`

---

## Next Steps

### For Frontend Engineers

1. Implement screens in React components based on wireframes
2. Use component specifications for styling
3. Implement interaction patterns as described
4. Handle all edge cases and error states
5. Test with real API endpoints from backend team
6. Validate accessibility with automated tools (axe, Lighthouse)

### For Backend Engineers

1. Ensure `/api/stories/generate` endpoint exists and returns expected format
2. Implement proper error responses (400, 401, 500) with helpful messages
3. Test response times; target <2 seconds for story generation
4. Validate story length constraints (optimize for 2-minute read time)

### For PM/COO

1. Review user flows for alignment with product vision
2. Confirm "Magic Button" branding and naming
3. Decide on MVP scope (Save feature? Story history?)
4. Approve Figma prototype before engineering begins

---

## Acceptance Criteria Validation

✅ **Prototype covers all acceptance criteria flows:**
- First-time user registration → story generation
- Returning user login → story generation
- Authenticated user → instant story generation
- Error handling and edge cases

✅ **Figma link or exported artifacts:**
- This document serves as low-fidelity wireframe specification
- Figma prototype to be created based on these specs (next task)

⏳ **UX sign-off documented:**
- Awaiting PM/COO review of this document
- Will update issue thread with sign-off once approved

---

## Appendix: API Integration Notes

### Expected API Endpoints (from Backend API Design)

**Authentication:**
- `POST /api/auth/register` → Returns user object + JWT
- `POST /api/auth/login` → Returns user object + JWT
- `GET /api/user/me` → Returns current user (for session validation)

**Story Generation (New Endpoint Needed):**
- `POST /api/stories/generate` → Returns story object

**Expected Story Object Schema:**

```json
{
  "id": "uuid",
  "title": "The Brave Little Rabbit",
  "content": "Once upon a time, in a cozy meadow...",
  "createdAt": "2026-04-19T12:00:00.000Z",
  "userId": "uuid"
}
```

**Note:** Backend API design document does not currently include `/api/stories` endpoints. This will need to be added by backend team, or we adapt to use `/api/items` endpoints with appropriate naming.

---

**Document Status:** Draft v1.0  
**Next Review:** PM/COO approval  
**Figma Prototype:** Pending creation
