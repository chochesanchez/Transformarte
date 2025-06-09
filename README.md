# TransformArte Website

Official website for TransformArte, a Rotary District 4130 initiative combining art with mental health awareness.

## Project Structure

```
/Users/chochesanchez/Desktop/PROJECTS/ROTARY/TRANSFORMARTE/WEB PAGE/
├── src/                      # Main source code
│   ├── components/           # React components
│   │   ├── EventCalendar.tsx    # Events listing component
│   │   └── ...
│   ├── app/                  # Next.js app directory
│   │   └── [locale]/            # Internationalized pages
│   └── ...
├── messages/                 # Translation files
│   ├── en.json              # English translations
│   └── es.json              # Spanish translations
└── ...
```

## Important Files for Content Updates

### Events
- `src/components/EventCalendar.tsx` - Main events listing
- `messages/es.json` and `messages/en.json` - Featured events on homepage
- `src/app/[locale]/page.tsx` - Homepage with featured events section

## Deployment

This project is deployed to [transform-arte.com.mx](https://transform-arte.com.mx) using Vercel.

### Correct Deployment Process

1. Make sure you're in the correct directory:
```bash
   cd /Users/chochesanchez/Desktop/PROJECTS/ROTARY/TRANSFORMARTE/WEB PAGE
   ```

2. Build and deploy:
   ```bash
   npm run build && vercel deploy --prod
   ```

3. After deployment, clear browser cache and hard refresh (Cmd/Ctrl + Shift + R)

### ⚠️ Important Notes

- This is the MAIN project connected to transform-arte.com.mx
- Do NOT create new Vercel projects or deployments
- Always deploy from this directory
- The project is already properly linked to Vercel with the correct production domain

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. View the site at [http://localhost:3000](http://localhost:3000)

## Content Updates

### Updating Events

1. Edit `src/components/EventCalendar.tsx` for the full events list
2. Update `messages/es.json` and `messages/en.json` for featured events on homepage
3. Build and deploy using the steps above

## Internationalization

- Spanish (es) is the default language
- English (en) translations are available
- All content should be updated in both language files

## Project Links

- Production: [transform-arte.com.mx](https://transform-arte.com.mx)
- Vercel Dashboard: [Vercel Project](https://vercel.com/chochesanchez2003-gmailcoms-projects/transformarte)

## Support

For any questions or issues, please contact the project maintainers.
