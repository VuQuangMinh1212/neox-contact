# 📱 Professional Contact Profile - Nguyễn Hoàng Mai

A modern, interactive digital business card built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Core Functionality
- **Interactive Profile Card** - Professional profile with contact information
- **QR Code Generator** - Generate and download QR codes for easy profile sharing
- **One-Click Actions** - Call, email, and share with single clicks
- **Copy to Clipboard** - Copy any contact information instantly
- **Social Media Integration** - Direct links to WhatsApp, Zalo, WeChat, and LinkedIn

### 🎨 Visual Enhancements
- **Smooth Animations** - Fade-in, slide-up, and scale animations
- **Gradient Background** - Animated gradient background for visual appeal
- **Hover Effects** - Interactive hover states with shadows and transforms
- **Loading States** - Visual feedback for async operations
- **Toast Notifications** - User-friendly feedback for copy actions

### 📱 User Experience
- **Responsive Design** - Works perfectly on all devices
- **Touch Friendly** - Optimized for mobile interactions
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Fast Loading** - Optimized images and performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
npm install
# or
pnpm install
```

### Development
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **QR Codes**: qrcode library
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
neox-contact/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main profile page
├── components/
│   ├── ui/                  # Reusable UI components
│   └── QRCodeModal.tsx      # QR code modal component
├── public/                  # Static assets
└── ...config files
```

## 🎨 Customization

### Personal Information
Update the profile information in `app/page.tsx`:
- Name and title
- Contact details
- Company information
- Social media handles

### Styling
Modify `app/globals.css` to customize:
- Color scheme
- Animations
- Typography
- Layout

### Adding Features
The modular structure makes it easy to add:
- New contact methods
- Additional animations
- Extra functionality
- Custom components

## 📧 Contact

**Nguyễn Hoàng Mai**  
International Business Solutions Consultant  
NEOX Company

- 📱 Phone: (+84) 93 780 2193
- 📧 Email: nguyenhoangmai193@gmail.com
- 🌐 Website: https://neox.vn/
- 💼 LinkedIn: Nguyễn Mai

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ using Next.js and modern web technologies*
