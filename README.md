# mazayin.github.com
# 🍽️ Mazayin - Luxury Moroccan Restaurant Website

![Mazayin Restaurant](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80)

A sophisticated, high-end restaurant website showcasing the finest Moroccan cuisine in Casablanca. Built with modern web technologies, featuring elegant animations, full responsiveness, and exceptional user experience.

---

## 🌟 Features

### Design & Aesthetics
- ✨ **Luxury Moroccan Theme**: Gold accents, deep burgundy, and warm cream color palette
- 🎨 **Modern Typography**: Playfair Display, Montserrat, and Cormorant Garamond fonts
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop, 4K)
- 🎭 **Elegant Animations**: Smooth scroll effects, parallax, and micro-interactions
- 🖼️ **Professional Layout**: Clean, spacious design with attention to detail

### Functionality
- 🍔 **Interactive Menu**: Filterable menu with categories (appetizers, mains, desserts)
- 🖼️ **Gallery Lightbox**: Full-screen image viewer with keyboard navigation
- 📝 **Reservation System**: Complete form validation and submission handling
- 📧 **Newsletter Subscription**: Email capture with validation
- 🔝 **Back to Top Button**: Smooth scroll to top functionality
- 🧭 **Smart Navigation**: Active link highlighting and smooth scroll anchors
- 📱 **Mobile Menu**: Animated hamburger menu with overlay

### Accessibility
- ♿ **WCAG Compliant**: Semantic HTML5 and ARIA labels
- ⌨️ **Keyboard Navigation**: Full keyboard accessibility support
- 🎯 **Focus Management**: Clear focus indicators for all interactive elements
- 🌗 **Reduced Motion**: Respects user motion preferences
- 🔍 **Screen Reader Friendly**: Proper heading hierarchy and alt text

### Performance
- ⚡ **Optimized Animations**: RequestAnimationFrame for smooth 60fps
- 👁️ **Intersection Observer**: Efficient scroll-triggered animations
- 🖼️ **Lazy Loading**: Progressive image loading support
- 🎯 **Debounce/Throttle**: Performance utilities for scroll events
- 📦 **Modular Code**: Clean, maintainable architecture

---

## 📁 Project Structure

```
mazayin-restaurant/
│
├── index.html                    # Main HTML file
│
├── css/
│   ├── reset.css                 # CSS reset for consistency
│   ├── variables.css             # Design system variables
│   ├── global.css                # Global styles and utilities
│   ├── header.css                # Navigation styles
│   ├── hero.css                  # Hero section styles
│   ├── about.css                 # About section styles
│   ├── menu.css                  # Menu section styles
│   ├── chef.css                  # Chef section styles
│   ├── gallery.css               # Gallery section styles
│   ├── reservations.css          # Reservation form styles
│   ├── footer.css                # Footer styles
│   └── responsive.css            # Global responsive styles
│
├── js/
│   ├── main.js                   # Core JavaScript functionality
│   ├── animations.js             # Scroll animations & effects
│   └── reservations.js           # Form validation & handling
│
├── assets/
│   └── images/                   # Image assets (Unsplash URLs)
│
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Clone or download the repository**
```bash
git clone https://github.com/yourusername/mazayin-restaurant.git
cd mazayin-restaurant
```

2. **Open the project**
```bash
# Simply open index.html in your browser
open index.html

# Or use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

3. **Optional: Use VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

---

## 🎨 Customization Guide

### Colors
Edit the color palette in `css/variables.css`:
```css
:root {
    --color-gold: #D4AF37;
    --color-burgundy: #4A1C1C;
    --color-cream: #F8F4E6;
    /* Add your custom colors */
}
```

### Typography
Change fonts in `index.html` (Google Fonts):
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update in `css/variables.css`:
```css
--font-primary: 'Your Font', serif;
```

### Menu Items
Edit menu items directly in `index.html`:
```html
<div class="menu-item" data-category="mains">
    <div class="menu-item__image-wrapper">
        <img src="your-image-url" alt="Dish name">
    </div>
    <div class="menu-item__content">
        <h3 class="menu-item__title">Your Dish</h3>
        <span class="menu-item__price">$XX</span>
        <p class="menu-item__description">Description</p>
    </div>
</div>
```

### Images
Replace Unsplash URLs with your own images:
```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-xxx" alt="Description">

<!-- After -->
<img src="assets/images/your-image.jpg" alt="Description">
```

### Contact Information
Update footer and reservation sections in `index.html`:
```html
<p class="detail__text">Your Address</p>
<p class="detail__text">Phone: +XXX XXX XXX</p>
<p class="detail__text">Email: your@email.com</p>
```

---

## 🔧 Configuration

### Form Submission
The reservation form currently uses a simulated submission. To connect to a real backend:

**Option 1: Custom API**
Edit `js/reservations.js`:
```javascript
// Replace the setTimeout simulation with actual API call
fetch('https://your-api.com/reservations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
})
.then(response => response.json())
.then(data => handleFormSuccess(form, formData))
.catch(error => handleFormError(form, error.message));
```

**Option 2: FormSubmit.co (No backend required)**
```html
<form action="https://formsubmit.co/your@email.com" method="POST">
    <!-- Your form fields -->
</form>
```

**Option 3: Netlify Forms**
Add `data-netlify="true"` to the form:
```html
<form data-netlify="true" name="reservation">
    <!-- Your form fields -->
</form>
```

### Analytics Integration

**Google Analytics**
Add to `index.html` before closing `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Facebook Pixel**
Add to `index.html` after opening `<body>`:
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari  | ✅ Latest 2 versions |
| Edge    | ✅ Latest 2 versions |
| Opera   | ✅ Latest 2 versions |

### Mobile Support
- ✅ iOS Safari 12+
- ✅ Chrome Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet

---

## 🚢 Deployment

### Netlify (Recommended)
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

### Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Click "Deploy"

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings
3. Navigate to Pages section
4. Select branch and folder
5. Save and wait for deployment

### Traditional Hosting
1. Upload all files to your server via FTP
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to the directory

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Navigation menu works on all devices
- [ ] All links navigate correctly
- [ ] Mobile menu opens and closes properly
- [ ] Menu filtering works correctly
- [ ] Gallery lightbox functions properly
- [ ] Reservation form validates correctly
- [ ] All animations run smoothly
- [ ] Images load properly
- [ ] Responsive design works on all breakpoints
- [ ] Accessibility features work (keyboard navigation, screen readers)

### Browser Testing
Test on multiple browsers and devices:
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Mobile, Samsung Internet
- Tablet: iPad Safari, Android Chrome

---

## 🎯 Performance Optimization

### Already Implemented
- ✅ CSS and JS are modular and maintainable
- ✅ Animations use CSS transforms for GPU acceleration
- ✅ Intersection Observer for efficient scroll detection
- ✅ RequestAnimationFrame for smooth animations
- ✅ Debounce and throttle for scroll events

### Additional Optimizations
1. **Minify CSS and JS**
```bash
# Use a build tool or online minifier
npx minify css/global.css > css/global.min.css
```

2. **Optimize Images**
- Use WebP format for better compression
- Compress images using TinyPNG or ImageOptim
- Implement responsive images with `srcset`

3. **Enable Caching**
Add to `.htaccess` (Apache):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access 1 year"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType application/javascript "access 1 month"
</IfModule>
```

4. **CDN Integration**
Consider using a CDN for static assets:
- Cloudflare
- Amazon CloudFront
- Fastly

---

## 🐛 Troubleshooting

### Common Issues

**Menu filter not working**
- Check if JavaScript is enabled
- Verify `data-category` attributes match button values
- Check browser console for errors

**Animations not triggering**
- Ensure `animations.js` is loaded after DOM
- Check if Intersection Observer is supported
- Verify `data-aos` attributes are present

**Form not submitting**
- Check browser console for validation errors
- Verify all required fields have proper IDs
- Ensure form action URL is correct

**Mobile menu not closing**
- Clear browser cache
- Check for JavaScript errors
- Verify event listeners are attached

---

## 📚 Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)

### Design Inspiration
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)

### Tools
- [Google Fonts](https://fonts.google.com/)
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [FontAwesome](https://fontawesome.com/) - Icon library
- [Color Hunt](https://colorhunt.co/) - Color palettes

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Senior Full-Stack Web Developer**
- Specialized in luxury web experiences
- Focus on performance and accessibility
- Modern web technologies expert

---

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Email: support@mazayin.ma
- Visit: [Mazayin Restaurant Website](https://mazayin.ma)

---

## 🙏 Acknowledgments

- **Google Fonts** - Beautiful typography
- **Unsplash** - High-quality placeholder images
- **Anthropic Claude** - AI assistance in development
- **MDN Web Docs** - Comprehensive web documentation

---

## 📈 Roadmap

### Future Enhancements
- [ ] Add online ordering system
- [ ] Integrate table availability calendar
- [ ] Multi-language support (Arabic, French, English)
- [ ] Add blog section for recipes and news
- [ ] Implement customer reviews and ratings
- [ ] Add social media feed integration
- [ ] Create admin dashboard for content management
- [ ] Add dark mode toggle
- [ ] Implement PWA features (offline support)
- [ ] Add 3D menu visualization

---

## 🎉 Changelog

### Version 1.0.0 (2024)
- ✨ Initial release
- ✅ Complete responsive design
- ✅ Interactive menu filtering
- ✅ Gallery with lightbox
- ✅ Reservation form with validation
- ✅ Smooth scroll animations
- ✅ Mobile-optimized navigation
- ✅ Accessibility features
- ✅ Performance optimizations

---

**Made with ❤️ and ☕ for Mazayin Restaurant**

*Experience the art of Moroccan fine dining*