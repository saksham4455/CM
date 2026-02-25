# Deployment Checklist

## Pre-Deployment Checks

### 1. Build & Test
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Check for console errors in production build
- [ ] Verify all routes work correctly
- [ ] Test lazy loading of components

### 2. Performance Verification
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check Core Web Vitals:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Test on mobile devices (actual devices, not just emulation)
- [ ] Verify smooth scrolling and animations
- [ ] Check memory usage (no leaks)

### 3. Responsive Design Testing
Test on these breakpoints:
- [ ] 320px (Galaxy Fold)
- [ ] 375px (iPhone SE)
- [ ] 414px (iPhone Pro Max)
- [ ] 768px (iPad Mini)
- [ ] 1024px (iPad Pro)
- [ ] 1440px (Laptop)
- [ ] 1920px (Desktop)
- [ ] 2560px (4K Display)

### 4. Browser Compatibility
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 5. Functionality Checks
- [ ] Navigation menu works on all devices
- [ ] All links navigate correctly
- [ ] Theme switcher works
- [ ] Contact form submits (if connected)
- [ ] Images load properly (lazy loading)
- [ ] Animations run smoothly
- [ ] Canvas elements display correctly

### 6. Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Reduced motion support works
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible

### 7. SEO & Meta Tags
- [ ] Title tags are set
- [ ] Meta descriptions present
- [ ] Open Graph tags for social sharing
- [ ] Favicon is set
- [ ] robots.txt configured (if needed)

## Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview

# Check Bundle Size
npm run build -- --mode=analyze  # if analyzer is added
```

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Option 2: Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

### Option 3: GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repo-name"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Traditional Hosting
1. Run `npm run build`
2. Upload contents of `dist/` folder to server
3. Configure server for SPA (single page application)

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit the deployed URL
- [ ] Check all pages load correctly
- [ ] Verify assets load from CDN (if applicable)
- [ ] Test on different devices
- [ ] Check performance on live site

### 2. Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Monitor Web Vitals
- [ ] Set up uptime monitoring

### 3. Performance Optimization (Production)
- [ ] Enable GZIP compression on server
- [ ] Configure browser caching headers
- [ ] Use CDN for static assets (optional)
- [ ] Enable HTTP/2
- [ ] Consider adding PWA features

## Environment Variables (if needed)

Create `.env.production` file:
```env
VITE_API_URL=your-api-url
VITE_GA_ID=your-google-analytics-id
```

## Rollback Plan

1. Keep previous build in `dist-backup/` folder
2. Document deployment dates and versions
3. Use git tags for releases
4. Have rollback procedure ready

## Performance Monitoring Commands

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Bundle analyzer (add to package.json)
npm install --save-dev rollup-plugin-visualizer
```

## Common Issues & Solutions

### Issue: White screen after deployment
**Solution**: Check base URL in vite.config.js

### Issue: 404 on refresh
**Solution**: Configure server for SPA routing
- Netlify: Add `_redirects` file
- Vercel: Add `vercel.json` with rewrites
- Apache: Configure `.htaccess`

### Issue: Images not loading
**Solution**: Check image paths (use relative paths)

### Issue: Slow initial load
**Solution**: 
- Verify code splitting is working
- Check bundle sizes
- Enable compression on server

## Success Criteria

✅ Lighthouse Performance Score: 90+
✅ All pages load in < 3 seconds
✅ Smooth animations (60 FPS on desktop)
✅ No console errors
✅ Mobile responsive (all breakpoints)
✅ Cross-browser compatible
✅ Accessible (WCAG 2.1 AA)

## Final Notes

- Always test in incognito/private mode
- Clear cache when testing
- Test on real devices, not just emulators
- Monitor performance after deployment
- Regular updates and security patches
