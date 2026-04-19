# TinyTeller — Frontend Component Specifications

**Purpose:** Technical specifications for React component implementation  
**Target Audience:** Frontend Engineers  
**Date:** 2026-04-19  
**Related Documents:** UX_DESIGN.md, FIGMA_PROTOTYPE_GUIDE.md

---

## Technology Stack

**Confirmed from ARCHITECTURE.md:**
- React + TypeScript
- Vite (build tool)
- Target: Modern browsers (ES6+)

**Recommended Libraries:**
- React Router (v6) for navigation
- Framer Motion for animations (optional, can use CSS animations)
- Axios or Fetch API for API calls
- React Hook Form for form validation (optional)

---

## Component Tree

```
<App>
├── <LandingPage>
│   └── <PrimaryButton> "Get Started"
│
├── <AuthLayout>
│   ├── <RegistrationPage>
│   │   ├── <BackButton>
│   │   ├── <InputField> x2 (email, password)
│   │   └── <PrimaryButton> "Create Account"
│   │
│   └── <LoginPage>
│       ├── <BackButton>
│       ├── <InputField> x2 (email, password)
│       └── <PrimaryButton> "Log In"
│
└── <AppLayout> (authenticated)
    ├── <Header>
    │   └── <HamburgerMenu>
    │       └── <MenuOverlay>
    │
    ├── <MainStoryPage>
    │   ├── <MagicButton>
    │   └── <LoadingState> (conditional)
    │
    ├── <StoryDisplay>
    │   ├── <BackButton>
    │   ├── <StoryContainer>
    │   └── <SecondaryButton> "New Story"
    │
    └── <ErrorState>
        └── <SecondaryButton> "Try Again"
```

---

## Routing Structure

### Routes (React Router v6)

```tsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/register" element={<RegistrationPage />} />
  <Route path="/login" element={<LoginPage />} />
  
  {/* Protected routes (require authentication) */}
  <Route element={<ProtectedRoute />}>
    <Route path="/app" element={<MainStoryPage />} />
    <Route path="/app/story/:storyId" element={<StoryDisplay />} />
  </Route>
  
  {/* Catch-all redirect */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

**Notes:**
- Use `<Navigate>` to redirect unauthenticated users to `/`
- After login/register, redirect to `/app`
- After logout, redirect to `/`

---

## Component Specifications

### 1. `<PrimaryButton>`

**File:** `src/components/PrimaryButton.tsx`

**Props:**
```tsx
interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'secondary';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}
```

**Styling (CSS or Tailwind):**
```css
.primary-button {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;
  min-height: 56px;
}

.primary-button:hover {
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

.primary-button:active {
  transform: scale(0.98);
}

.primary-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-button.full-width {
  width: 100%;
}
```

**Loading State:**
- Replace children with spinner component
- Disable button interaction
- Maintain button size (no layout shift)

**Accessibility:**
- Use `aria-label` if children is not descriptive
- `aria-disabled` when disabled or loading
- Focus outline: 4px solid rgba(59, 130, 246, 0.5)

---

### 2. `<MagicButton>`

**File:** `src/components/MagicButton.tsx`

**Props:**
```tsx
interface MagicButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isError: boolean;
}
```

**Styling:**
```css
.magic-button {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  transition: transform 150ms ease, box-shadow 150ms ease;
  position: relative;
}

.magic-button:active {
  transform: scale(0.95);
}

/* Pulse animation (idle state) */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }
  50% {
    box-shadow: 0 12px 32px rgba(139, 92, 246, 0.6);
  }
}

.magic-button:not(.loading):not(.error) {
  animation: pulse-glow 1.6s ease-in-out infinite;
}

/* Loading state */
.magic-button.loading {
  cursor: wait;
}

/* Error state */
.magic-button.error {
  background: #9CA3AF;
  cursor: pointer;
}
```

**States:**
- **Default:** Sparkle icon (✨), pulsing glow
- **Loading:** Spinner animation, "Crafting your story..." text below
- **Error:** Warning icon (⚠️), gray background

**Accessibility:**
- `aria-label="Generate new story"`
- `aria-busy={isLoading}`
- Minimum touch target: 180px (exceeds 44px requirement)

---

### 3. `<InputField>`

**File:** `src/components/InputField.tsx`

**Props:**
```tsx
interface InputFieldProps {
  label: string;
  type: 'email' | 'password' | 'text';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}
```

**Styling:**
```css
.input-field-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.input-field-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input-field {
  height: 48px;
  padding: 12px;
  border: 2px solid #D1D5DB;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms, box-shadow 200ms;
}

.input-field:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.input-field.error {
  border-color: #EF4444;
}

.input-field-helper {
  font-size: 14px;
  color: #6B7280;
}

.input-field-error {
  font-size: 14px;
  color: #EF4444;
}
```

**Validation:**
- Email: Use regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password: Min 8 characters
- Show error message below field when invalid
- Validate on blur (not on every keystroke)

**Accessibility:**
- `aria-required={required}`
- `aria-invalid={!!error}`
- `aria-describedby` pointing to helper/error text ID

---

### 4. `<StoryContainer>`

**File:** `src/components/StoryContainer.tsx`

**Props:**
```tsx
interface StoryContainerProps {
  title: string;
  content: string;
}
```

**Styling:**
```css
.story-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: #FFFBEB;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(100vh - 200px); /* Leave room for header/footer */
}

.story-title {
  font-size: 24px;
  font-weight: bold;
  font-family: Georgia, Cambria, serif;
  text-align: center;
  color: #1F2937;
  margin-bottom: 24px;
}

.story-content {
  font-size: 18px;
  font-family: Georgia, Cambria, serif;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap; /* Preserve line breaks from API */
}

/* Smooth scroll */
.story-container {
  scroll-behavior: smooth;
}
```

**Accessibility:**
- Story title: `<h1>` tag
- Story content: `<div role="article">`
- Scrollable region: `aria-label="Story content"`

---

### 5. `<MenuOverlay>`

**File:** `src/components/MenuOverlay.tsx`

**Props:**
```tsx
interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  onLogout: () => void;
}
```

**Styling:**
```css
.menu-overlay-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  opacity: 0;
  transition: opacity 300ms ease;
}

.menu-overlay-backdrop.open {
  opacity: 1;
}

.menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: white;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 300ms ease;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.menu-panel.open {
  transform: translateX(0);
}
```

**Behavior:**
- Click outside → close menu
- Escape key → close menu
- Focus trap when open (use `react-focus-lock` or custom implementation)
- Body scroll lock when menu open

**Accessibility:**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` pointing to menu title
- Focus moved to close button when opened

---

### 6. `<LoadingState>`

**File:** `src/components/LoadingState.tsx`

**Props:**
```tsx
interface LoadingStateProps {
  message?: string; // Default: "Crafting your story..."
}
```

**Styling:**
```css
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(139, 92, 246, 0.2);
  border-top-color: #8B5CF6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 16px;
  color: #6B7280;
}
```

**Optional Enhancement:**
- Sparkle particles floating animation (CSS or Framer Motion)
- Gradient spinner instead of solid color

**Accessibility:**
- `role="status"`
- `aria-live="polite"`
- `aria-label="Loading story"`

---

### 7. `<ErrorState>`

**File:** `src/components/ErrorState.tsx`

**Props:**
```tsx
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}
```

**Styling:**
```css
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 48px;
  text-align: center;
}

.error-icon {
  font-size: 64px;
}

.error-message {
  font-size: 16px;
  color: #6B7280;
  max-width: 300px;
}
```

**Accessibility:**
- `role="alert"` for error message (announces to screen readers)
- `aria-live="assertive"` for critical errors

---

## Page Components

### 1. `<LandingPage>`

**File:** `src/pages/LandingPage.tsx`

**Responsibilities:**
- Show branding and value proposition
- "Get Started" button → `/register`
- "Log In" link → `/login`
- Redirect to `/app` if already authenticated (check on mount)

**Layout:**
```tsx
<div className="landing-page">
  <header>
    <h1>✨ TinyTeller</h1>
    <p>Instant Magic Stories for Little Listeners</p>
  </header>
  
  <main>
    <PrimaryButton onClick={() => navigate('/register')}>
      Get Started
    </PrimaryButton>
    <p className="subtext">Free • No Ads • No Hassle</p>
  </main>
  
  <footer>
    <p>Already have an account? <Link to="/login">Log In</Link></p>
  </footer>
</div>
```

**Styling:**
- Full viewport height
- Gradient background
- Center-aligned content

---

### 2. `<RegistrationPage>`

**File:** `src/pages/RegistrationPage.tsx`

**Responsibilities:**
- Collect email and password
- Call `POST /api/auth/register`
- On success: Store JWT, redirect to `/app`
- On error: Display inline error message

**State Management:**
```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Registration failed');
    }
    
    const { token, user } = await response.json();
    
    // Store token (localStorage or httpOnly cookie handled by server)
    localStorage.setItem('authToken', token);
    
    // Redirect to app
    navigate('/app');
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

**Validation:**
- Email format validation on blur
- Password minimum 8 characters
- Disable submit button if validation fails

---

### 3. `<MainStoryPage>`

**File:** `src/pages/MainStoryPage.tsx`

**Responsibilities:**
- Display Magic Button
- On tap: Call `POST /api/stories/generate`
- Show loading state during API call
- On success: Navigate to `/app/story/:storyId`
- On error: Show error state inline

**State Management:**
```tsx
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleGenerateStory = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch('/api/stories/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate story');
    }
    
    const story = await response.json();
    navigate(`/app/story/${story.id}`);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

**Layout:**
```tsx
<div className="main-story-page">
  <Header />
  
  {error ? (
    <ErrorState message={error} onRetry={handleGenerateStory} />
  ) : isLoading ? (
    <LoadingState />
  ) : (
    <div className="magic-button-container">
      <MagicButton onClick={handleGenerateStory} isLoading={false} isError={false} />
      <p>Tap for your story</p>
    </div>
  )}
</div>
```

---

### 4. `<StoryDisplay>`

**File:** `src/pages/StoryDisplay.tsx`

**Responsibilities:**
- Fetch story by ID from route params
- Display story title and content
- "New Story" button → Generate new story → Navigate to new story
- Back button → `/app`

**Data Fetching:**
```tsx
const { storyId } = useParams<{ storyId: string }>();
const [story, setStory] = useState<Story | null>(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchStory = async () => {
    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      const data = await response.json();
      setStory(data);
    } catch (err) {
      console.error('Failed to fetch story', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchStory();
}, [storyId]);
```

**Layout:**
```tsx
<div className="story-display-page">
  <header>
    <BackButton onClick={() => navigate('/app')} />
    <HamburgerMenu />
  </header>
  
  {isLoading ? (
    <LoadingState />
  ) : story ? (
    <>
      <StoryContainer title={story.title} content={story.content} />
      <SecondaryButton onClick={handleNewStory}>New Story</SecondaryButton>
    </>
  ) : (
    <ErrorState message="Story not found" onRetry={() => navigate('/app')} />
  )}
</div>
```

---

## API Integration

### Authentication

**Token Storage:**
- Option 1: `localStorage.setItem('authToken', token)`
- Option 2: httpOnly cookie (handled by server via `Set-Cookie` header)

**Token Usage:**
```tsx
const authHeaders = {
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
};
```

**Token Expiry Handling:**
- Check for 401 Unauthorized responses
- Redirect to `/login` if token expired
- Optionally show toast: "Your session expired. Please log in again."

---

### Story Generation

**Endpoint:** `POST /api/stories/generate`

**Note:** This endpoint does NOT exist in current backend API design. Backend team needs to add:

**Expected Request:**
```json
{
  "theme": "animals",  // Optional: for future personalization
  "length": "short"    // Optional: default to short (2-minute read)
}
```

**Expected Response:**
```json
{
  "id": "uuid",
  "title": "The Brave Little Rabbit",
  "content": "Once upon a time...",
  "createdAt": "2026-04-19T12:00:00.000Z",
  "userId": "uuid"
}
```

**Error Responses:**
- 401: Unauthorized (redirect to login)
- 500: Server error (show error state)
- Timeout (>10s): Show timeout error

---

## Responsive Design

### Breakpoints

```css
/* Mobile (default) */
@media (max-width: 767px) {
  /* All designs optimized for mobile first */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .magic-button {
    width: 220px;
    height: 220px;
  }
  
  .story-container {
    max-width: 600px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .app-container {
    max-width: 480px;
    margin: 0 auto;
  }
  
  .story-container {
    max-width: 800px;
  }
  
  /* Show hover states */
  .primary-button:hover,
  .magic-button:hover {
    /* Enhanced hover effects */
  }
}
```

---

## Animation Guidelines

### Prefer CSS Animations for:
- Button hover/active states
- Magic Button pulse
- Loading spinner
- Simple transitions

### Use Framer Motion for:
- Page transitions (slide in/out)
- Complex sparkle particle effects (optional)
- Menu overlay slide-in

**Example (Framer Motion page transition):**
```tsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>
```

---

## Performance Considerations

### Code Splitting
- Lazy load routes: `const StoryDisplay = lazy(() => import('./pages/StoryDisplay'));`
- Wrap with `<Suspense fallback={<LoadingState />}>`

### Image Optimization
- Use SVG for icons (scalable, small file size)
- No raster images in MVP (text-only stories)

### API Caching
- Cache generated stories in memory (React state)
- Don't re-fetch story if navigating back from same story

---

## Testing Checklist

### Unit Tests
- [ ] Button components render correctly
- [ ] Input validation works (email format, password length)
- [ ] Form submission calls API with correct data
- [ ] Error states display appropriate messages

### Integration Tests
- [ ] Registration flow end-to-end
- [ ] Login flow end-to-end
- [ ] Story generation and display flow
- [ ] Error recovery (network failure, server error)

### Accessibility Tests
- [ ] Keyboard navigation works (Tab through all elements)
- [ ] Screen reader announces all interactive elements
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (use axe DevTools)

### Responsive Tests
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1440px width)

---

## Implementation Priority

### Phase 1: Core Flow (MVP)
1. `<LandingPage>` + routing
2. `<RegistrationPage>` + `<LoginPage>` with API integration
3. `<MainStoryPage>` with `<MagicButton>`
4. `<LoadingState>` component
5. `<StoryDisplay>` page

### Phase 2: Polish
6. `<MenuOverlay>` and logout
7. `<ErrorState>` component
8. Animations (button pulse, page transitions)
9. Responsive design refinements

### Phase 3: Accessibility
10. ARIA labels and keyboard navigation
11. Focus management
12. Screen reader testing

---

**Next Steps for Engineers:**
1. Scaffold React app with Vite
2. Set up React Router
3. Create component files from this spec
4. Implement authentication flow
5. Integrate with backend API (coordinate on `/api/stories` endpoints)
6. Test and refine based on UX feedback

---

**Questions for Backend Team:**
- Does `/api/stories/generate` endpoint exist? If not, when will it be added?
- Should we use `/api/items` as a substitute for MVP?
- Is token stored in httpOnly cookie or returned in response body?
- What is the expected story generation response time? (<2s ideal)

---

**End of Component Specifications**
