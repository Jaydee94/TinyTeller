# TinyTeller — Figma Prototype Guide

**Purpose:** Guide for creating the interactive Figma prototype based on UX_DESIGN.md  
**Target Audience:** UX Designer, PM/COO (for review), Frontend Engineers (for implementation reference)  
**Date:** 2026-04-19

---

## Prototype Scope

### What to Include

1. **All 8 Core Screens:**
   - Landing Screen (unauthenticated)
   - Registration Screen
   - Login Screen
   - Main Story Screen (Magic Button)
   - Loading State
   - Story Display
   - Menu Overlay
   - Error State

2. **Interactive Click-Through:**
   - Landing → Registration → Magic Button → Story Display
   - Landing → Login → Magic Button → Story Display
   - Magic Button → Loading → Story Display
   - Magic Button → Error State → Try Again
   - Menu open/close interaction

3. **Component Library:**
   - Reusable button components (Primary, Secondary)
   - Input field components (with states: default, focus, error)
   - Magic Button component (with all states)
   - Story content container
   - Navigation elements

### What to Exclude (Post-MVP)

- Settings screen (out of scope)
- Story history/saved stories
- Password reset flow
- User profile editing

---

## Figma File Structure

```
📁 TinyTeller Prototype
│
├── 📄 Cover Page
│   └── Project title, version, date, designer credits
│
├── 🎨 Design System
│   ├── Color Palette (swatches with hex codes)
│   ├── Typography Styles (all text styles defined)
│   ├── Spacing Grid (8px base unit guide)
│   └── Component Library
│       ├── Buttons (all variants)
│       ├── Input Fields (all states)
│       ├── Icons (sparkle, hamburger, back, etc.)
│       └── Containers
│
├── 🖼️ Wireframes (Low-Fi)
│   ├── Screen 1: Landing
│   ├── Screen 2: Registration
│   ├── Screen 3: Login
│   ├── Screen 4: Main Story Screen
│   ├── Screen 5: Loading State
│   ├── Screen 6: Story Display
│   ├── Screen 7: Menu Overlay
│   └── Screen 8: Error State
│
├── 🎯 High-Fidelity Screens
│   └── (Same 8 screens with full visual design)
│
└── 🔗 Prototype Flow
    └── Interactive links connecting all screens
```

---

## Screen-by-Screen Implementation

### 1. Landing Screen

**Frame Size:** 375 x 812 (iPhone X/11/12 base)  
**Background:** Linear gradient `#8B5CF6` → `#3B82F6` (top to bottom)

**Elements:**
- Logo/Icon: Sparkle emoji or vector icon (centered, 64px)
- App Title: "TinyTeller" (32px, bold, white)
- Tagline: "Instant Magic Stories for Little Listeners" (18px, white, 70% opacity)
- Primary Button: "Get Started" (see button specs)
- Subtext: "Free • No Ads • No Hassle" (14px, white, 60% opacity)
- Link: "Already have an account? Log In" (16px, white underline)

**Spacing:**
- Top margin: 80px from top
- Between elements: 24px
- Button: 32px margin top and bottom
- Bottom link: 48px from button

**Interactions:**
- "Get Started" → Registration Screen
- "Log In" link → Login Screen

---

### 2. Registration Screen

**Frame Size:** 375 x 812  
**Background:** Solid white `#FFFFFF`

**Elements:**
- Back button: Left arrow icon (top-left, 44x44px tap target)
- Logo: Small sparkle icon (centered, 32px)
- Title: "Create Your Free Account" (24px, semibold, dark gray)
- Email Input Field (with label "Email", placeholder "you@example.com")
- Password Input Field (with label "Password", helper text "min 8 characters")
- Primary Button: "Create Account"
- Link: "Already have an account? Log In"

**Input Field States (show as variants):**
- Default
- Focus (blue border)
- Error (red border, error message below)
- Disabled (gray background)

**Interactions:**
- Back button → Landing Screen
- "Create Account" → Main Story Screen (simulated success)
- "Log In" link → Login Screen
- Input fields: Show focus state on click

---

### 3. Login Screen

**Frame Size:** 375 x 812  
**Background:** Solid white

**Elements:**
- Identical structure to Registration Screen
- Title: "Welcome Back!" instead
- Button text: "Log In"
- Link: "Need an account? Sign Up"

**Interactions:**
- Back → Landing
- "Log In" → Main Story Screen
- "Sign Up" link → Registration Screen

---

### 4. Main Story Screen (Magic Button)

**Frame Size:** 375 x 812  
**Background:** Soft gradient `#FAFAF9` → `#F3F4F6`

**Elements:**
- Hamburger menu icon (top-right, 44x44px)
- Logo: Small "TinyTeller" text (centered top, 18px)
- Magic Button: Circular button (180px diameter, centered)
  - Gradient fill `#8B5CF6` → `#3B82F6`
  - White sparkle icon (32px)
  - Glow shadow: `0 8px 24px rgba(139, 92, 246, 0.4)`
  - Pulsing animation (0.8s loop, subtle scale 100% → 105%)
- Instruction text: "Tap for your story" (16px, gray, centered below button)

**Interactions:**
- Magic Button → Loading State (with delay animation)
- Hamburger icon → Menu Overlay

---

### 5. Loading State

**Frame Size:** 375 x 812  
**Background:** Same as Main Story Screen

**Elements:**
- Same layout as Main Story Screen
- Magic Button transforms:
  - Remove sparkle icon
  - Add spinner animation (rotating circle)
  - Maintain size and position
- Text changes: "Crafting your story..." (16px, gray)
- Sparkle particles: Small sparkles floating around button (optional decorative animation)

**Interactions:**
- Auto-transition → Story Display after 2 seconds (simulated API response)
- Alternate path → Error State (for demo purposes, add variant)

---

### 6. Story Display

**Frame Size:** 375 x 812  
**Background:** Soft white `#FAFAF9`

**Elements:**
- Back button (top-left)
- Hamburger menu (top-right)
- Story Title: "The Brave Little Rabbit" (24px, bold, centered, dark gray)
- Story Container:
  - Background: `#FFFBEB` (cream)
  - Border radius: 16px
  - Padding: 24px
  - Story text: 18px, Georgia serif, line-height 1.6
  - Sample story: Use placeholder text from UX_DESIGN.md
- "New Story" button (bottom, 56px height, full width with padding)
- Optional: "♡ Save" link (16px, centered below button)

**Interactions:**
- Back button → Main Story Screen
- "New Story" button → Loading State → New story (with different title)
- Hamburger → Menu Overlay

**Scrolling:**
- Story content area should be scrollable (overflow auto)
- Use long sample text to demonstrate scroll behavior

---

### 7. Menu Overlay

**Frame Size:** 375 x 812  
**Type:** Overlay on top of current screen

**Elements:**
- Dimmed background: 60% black overlay on underlying screen
- Menu panel: Slides in from right
  - Width: 280px
  - Background: White
  - Height: Full screen
- Close button: X icon (top-right of menu panel, 44x44px)
- Menu content (vertical list, centered):
  - Logo: Small "TinyTeller" sparkle (top)
  - "My Account" (18px, semibold)
  - User email: "you@example.com" (14px, gray)
  - Divider line
  - "Settings" (18px)
  - "Help & Support" (18px)
  - Divider line
  - "Log Out" (18px, red text)

**Interactions:**
- X button → Close overlay (return to previous screen)
- Click outside menu → Close overlay
- "Log Out" → Landing Screen (simulated logout)

---

### 8. Error State

**Frame Size:** 375 x 812  
**Background:** Same as Main Story Screen

**Elements:**
- Hamburger menu (top-right)
- Logo: "TinyTeller" (top)
- Error Button (same size as Magic Button):
  - Gray background (no gradient)
  - Warning icon: ⚠️ (32px)
  - Text inside: "Oops!" (16px, semibold)
- Error message: "Something went wrong. Let's try that again." (16px, centered, gray)
- "Try Again" button (secondary button style, below message)

**Interactions:**
- "Try Again" → Loading State → Story Display (simulated success recovery)
- Hamburger → Menu Overlay

---

## Component Specifications

### Primary Button (Magic Button & CTA Buttons)

**Variants:**
1. Default (idle state)
2. Hover (desktop only, darker shade)
3. Pressed (scale 95%)
4. Loading (spinner animation)
5. Disabled (grayscale, no interaction)

**Auto Layout:**
- Padding: 16px horizontal, 12px vertical (for text buttons)
- Border radius: 12px (for rectangular buttons), full circle (for Magic Button)
- Text: 18px, semibold, white

**Effects:**
- Shadow: `0 4px 12px rgba(139, 92, 246, 0.3)`
- Gradient fill: `#8B5CF6` → `#3B82F6` (diagonal)

---

### Secondary Button (New Story, Try Again)

**Variants:** Same as Primary

**Styling:**
- Solid color: `#3B82F6`
- Full width (with 24px side margins)
- Height: 56px
- Border radius: 12px
- Text: 18px, semibold, white

---

### Input Field Component

**Variants:**
1. Default
2. Focus
3. Error
4. Disabled

**Structure:**
- Label (14px, semibold, dark gray, above field)
- Input box:
  - Border: 2px solid `#D1D5DB` (default)
  - Border radius: 8px
  - Padding: 12px
  - Height: 48px
  - Font: 16px, regular
- Helper/Error text (14px, below field):
  - Gray for helper text
  - Red for error text

**Focus State:**
- Border color: `#3B82F6`
- Shadow: `0 0 0 3px rgba(59, 130, 246, 0.2)`

---

### Icon Components

**Required Icons:**
- Sparkle (Magic Button): 32px, white
- Hamburger menu: 24px, dark gray, 3 horizontal lines
- Back arrow: 24px, dark gray, left-pointing chevron
- Close (X): 24px, dark gray
- Warning (⚠️): 32px, yellow
- Heart (♡): 16px, gray (for Save link)

**Source:** Use Figma vector tools or import from Feather Icons / Heroicons

---

## Interactive Prototype Setup

### Prototype Flows to Create

**Flow 1: New User Registration Path**
```
Landing → Registration → Main Story Screen → Loading → Story Display → New Story → Loading → Different Story
```

**Flow 2: Returning User Login Path**
```
Landing → Login → Main Story Screen → Loading → Story Display
```

**Flow 3: Error Recovery Path**
```
Main Story Screen → Loading → Error State → Try Again → Loading → Story Display
```

**Flow 4: Menu Navigation**
```
Any Screen → Menu Overlay → Log Out → Landing Screen
Any Screen → Menu Overlay → Close → Same Screen
```

### Transition Animations

**Screen Transitions:**
- Default: Slide left (300ms ease-out) for forward navigation
- Back button: Slide right (300ms ease-out)
- Instant: Menu open/close (use overlay animation instead)

**Button Interactions:**
- Tap: Scale down (100ms), then scale back (100ms)
- Loading: Cross-fade to spinner (200ms)

**Magic Button Pulse:**
- Use "While Hovering" trigger (desktop) or auto-animate (mobile)
- Scale: 100% → 102% → 100%
- Duration: 800ms
- Easing: Ease-in-out
- Loop: Infinite

---

## Design Tokens (Figma Styles)

### Colors

**Create Color Styles:**
- Primary/Purple: `#8B5CF6`
- Primary/Blue: `#3B82F6`
- Neutral/White: `#FFFFFF`
- Neutral/Warm White: `#FAFAF9`
- Neutral/Cream: `#FFFBEB`
- Neutral/Gray 100: `#F3F4F6`
- Neutral/Gray 300: `#D1D5DB`
- Neutral/Gray 500: `#6B7280`
- Neutral/Gray 700: `#374151`
- Neutral/Gray 900: `#1F2937`
- Success/Green: `#10B981`
- Error/Red: `#EF4444`
- Warning/Yellow: `#F59E0B`

### Typography

**Create Text Styles:**
- H1/Landing: 32px, bold, Inter
- H2/Screen Title: 24px, semibold, Inter
- Story Title: 24px, bold, Georgia
- Body/Story: 18px, regular, Georgia, line-height 1.6
- Body/UI: 18px, regular, Inter
- Button: 18px, semibold, Inter
- Label: 14px, semibold, Inter
- Helper: 14px, regular, Inter
- Link: 16px, regular, Inter, underline

### Effects

**Create Effect Styles:**
- Button Shadow: Drop shadow, 0 4px 12px, `rgba(139, 92, 246, 0.3)`
- Card Shadow: Drop shadow, 0 2px 8px, `rgba(0, 0, 0, 0.1)`
- Focus Ring: Drop shadow, 0 0 0 3px, `rgba(59, 130, 246, 0.2)`
- Button Glow: Drop shadow, 0 8px 24px, `rgba(139, 92, 246, 0.4)`

---

## Responsive Variants (Optional)

If time permits, create additional frames for:

- **Tablet (768 x 1024):**
  - Centered layout
  - Magic Button: 220px diameter
  - Story content max-width: 600px

- **Desktop (1440 x 900):**
  - Centered card layout (max 480px width)
  - Story content wider (max 800px)
  - Hover states for buttons

---

## Prototype Presentation Mode

### Set as Starting Point:
- Frame: Landing Screen
- Device: iPhone 11 Pro
- Background: White

### Enable:
- Hotspot hints (for demos)
- Flow starting points (show all entry flows)

### Disable:
- Fixed header/footer (not applicable for this design)

---

## Handoff Notes for Engineers

### CSS Export Tips

1. **Copy CSS from Figma:** Right-click elements → Copy/Paste → Copy as CSS
2. **Export assets:** All icons as SVG (24px, 32px variants)
3. **Export gradients:** Use CSS linear-gradient syntax
4. **Export shadows:** Use box-shadow values directly

### Animation Implementation

- Magic Button pulse: CSS keyframe animation or Framer Motion
- Loading spinner: Use SVG animation or Lottie file
- Screen transitions: React Router transitions or Framer Motion

### Accessibility Annotations

Add annotations layer in Figma with:
- ARIA labels for each interactive element
- Focus order (Tab index)
- Color contrast ratios (use Figma contrast checker plugin)
- Minimum touch target sizes (show 44x44px overlay)

---

## Review Checklist

Before sharing with PM/COO and Frontend Engineers:

- [ ] All 8 screens designed at high fidelity
- [ ] Component library complete and organized
- [ ] Interactive prototype flows working (test all paths)
- [ ] Animations smooth and purposeful
- [ ] Text is readable (no lorem ipsum in final version)
- [ ] Color contrast validated (WCAG AA)
- [ ] Mobile frame size consistent (375 x 812)
- [ ] Comments added for engineering handoff notes
- [ ] Prototype link permissions set to "Anyone with link can view"

---

## Deliverable

**Figma Link Format:**
```
https://www.figma.com/proto/[file-id]/TinyTeller-Prototype
```

**Include in Handoff:**
1. Prototype link (view mode)
2. Figma file link (for engineers to inspect)
3. This guide document (FIGMA_PROTOTYPE_GUIDE.md)
4. UX_DESIGN.md (comprehensive spec)

---

**Note:** Since this is a text-based deliverable and I (UX Designer) cannot actually create Figma files programmatically, this guide serves as the complete specification for either:

1. **PM/COO to create the Figma prototype** following this guide exactly, or
2. **Frontend Engineers to implement directly from wireframes** in UX_DESIGN.md and skip Figma prototype creation

The wireframes and component specs in UX_DESIGN.md are sufficiently detailed for frontend implementation to begin without blocking on a Figma prototype.

**Recommendation:** Frontend implementation can start immediately using UX_DESIGN.md as the source of truth. Figma prototype can be created in parallel for stakeholder demos and user testing.
