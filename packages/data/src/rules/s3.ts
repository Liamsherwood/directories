title: "Guidelines for building a website with Payload, AWS S3, and Next.js 15"
tags: ["AWS S3", "Next.js", "Payload"]
slug: "awss3-payload-nextjs-best practices"
content: `# Project Guidelines

## 🚀 Core Technologies Used
- **Next.js 15** (App Router, RSC-first approach)
- **Payload CMS** (for structured content management)
- **AWS S3** (for scalable media storage)
- **Framer Motion & GSAP** (for smooth animations)
- **Shadcn UI & Tailwind CSS** (for UI design)
- **Radix UI & Lucide** (for accessibility and icons)

---

## 🔥 Critical Implementation Notes

### ✅ AWS S3 Best Practices
- **Store Only Large Media**: Upload only photography and videos to S3, not UI assets (icons, SVGs, etc.).
- **Use Signed URLs for Security**: Generate pre-signed URLs for private assets to control access.
- **Enable CloudFront for CDN**: Cache assets globally to improve loading speed.
- **Optimize Image Formats**: Convert to WebP and apply compression to reduce bandwidth usage.
- **Set Lifecycle Policies**: Automatically delete or archive unused assets to save costs.

### ✅ Payload CMS Best Practices
- **Use Payload’s Built-in S3 Plugin**: Store images and videos in S3 directly from Payload.
- **Normalize CMS Data**: Avoid deep nesting; use references and relational structures.
- **Server Components for Data Fetching**: Fetch Payload data in server components for optimal performance.
- **Avoid `useEffect` for Data Fetching**: Use `getServerSideProps` or `generateStaticParams` when possible.

### ✅ Performance & Optimization
- **Limit `use client` Scope**: Prefer React Server Components (RSC) for rendering logic.
- **Use Suspense for Data Fetching**: Wrap client-side data fetching components in `Suspense` for smoother hydration.
- **Defer Loading of Non-Essential Components**: Use dynamic imports (`next/dynamic`) for lower-priority UI elements.
- **Lazy Load Media Assets**: Implement `loading="lazy"` for images and videos.

### ✅ Animation Best Practices
- **Framer Motion for Simple Animations**: Use for transitions, UI interactions, and basic page effects.
- **GSAP for Advanced Animations**: Use for timeline-based animations, scroll interactions, and high-performance effects.
- **Avoid Animating Layout Shift Elements**: Prevent CLS (Cumulative Layout Shift) by setting explicit sizes for animated elements.

---

## ❌ Things to Avoid
- **Do NOT Store UI Assets in S3**: Keep icons, logos, and small assets in local or CDN storage.
- **Do NOT Use `useEffect` for Fetching CMS Data**: Always use server-side rendering or RSC.
- **Do NOT Render Large Media Directly**: Use CloudFront or signed URLs for optimal performance.
- **Do NOT Overuse `use client`**: Only apply it when Web API interaction is required.

---

## 🔎 AI Model Verification Steps

Before generating any code for this project, verify:
1. **Are you using Payload’s S3 plugin correctly?** If not, STOP and FIX.
2. **Are all media assets optimized (WebP, MP4)?** If not, STOP and FIX.
3. **Is CloudFront enabled for media serving?** If not, STOP and FIX.
4. **Are animations handled efficiently with Framer Motion & GSAP?** If not, STOP and FIX.
5. **Are React Server Components prioritized?** If not, STOP and FIX.

### ✅ Correct Example: Fetching CMS Data in a Server Component
```tsx
import { getPayloadClient } from '@/lib/payload';

export default async function HomePage() {
  const payload = await getPayloadClient();
  const posts = await payload.find({ collection: 'blog' });
  return <div>{posts.docs.map(post => <h2 key={post.id}>{post.title}</h2>)}</div>;
}
```

### ❌ Incorrect Example: Fetching CMS Data in a Client Component
```tsx
'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('/api/posts').then(res => res.json()).then(setPosts);
  }, []);
  return <div>{posts.map(post => <h2 key={post.id}>{post.title}</h2>)}</div>;
}
```

🚨 **NEVER use `useEffect` for CMS data fetching!** 🚨

---

This guide ensures a **fast**, **scalable**, and **optimized** website using Payload, AWS S3, and Next.js 15.
`
author: "Liam Sherwood"
