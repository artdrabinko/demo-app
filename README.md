# Social Support Portal

A modern, accessible social support application with AI assistance for citizens to apply for financial assistance. Built with React, TypeScript, and Material-UI following feature slice design architecture.

## Features

- **3-Step Form Wizard**: Personal Information, Family & Financial Info, and Situation Descriptions
- **AI-Powered Writing Assistance**: OpenAI GPT integration for help with text fields
- **Multi-language Support**: English and Arabic (RTL) with i18next
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Accessibility**: ARIA roles, keyboard navigation, screen reader support
- **Form Validation**: Comprehensive validation with React Hook Form and Yup, real-time error highlighting

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Form Handling**: React Hook Form with Yup validation
- **State Management**: React Context API
- **Internationalization**: React-i18next
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Date Picker**: MUI X Date Pickers

## Project Structure

```
src/
├── app/                    # App-level configuration
├── shared/                 # Shared utilities and components
│   ├── api/               # API services (OpenAI)
│   ├── config/            # Configuration files
│   ├── lib/               # Utility functions
│   ├── locales/           # Translation files
│   └── ui/                # Shared UI components
├── entities/              # Business entities
│   └── form-data/         # Form data types and validation
├── features/              # Feature modules
│   ├── ai-assistance/     # AI writing assistance
│   └── form-wizard/       # Multi-step form
├── widgets/               # Complex UI components
│   └── progress-bar/      # Form progress indicator
└── pages/                 # Page components
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd demo-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
   VITE_APP_NAME=Social Support Portal
   ```

4. **Get OpenAI API Key**
   
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account or sign in
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key and replace `your_openai_api_key_here` in the `.env` file

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## Usage

### Form Steps

1. **Personal Information**
   - Name, National ID, Date of Birth, Gender
   - Address, City, State, Country
   - Phone Number, Email Address

2. **Family & Financial Info**
   - Marital Status, Number of Dependents
   - Employment Status, Monthly Income
   - Housing Status

3. **Situation Descriptions**
   - Current Financial Situation
   - Employment Circumstances
   - Reason for Applying
   - **AI Assistance**: Click "Help Me Write" buttons for AI-generated suggestions

### AI Assistance

The AI assistance feature helps users write better descriptions for their situation:

1. Click the "Help Me Write" button next to any text field in Step 3
2. The AI will generate a professional suggestion based on your current input
3. You can edit the suggestion before accepting it
4. Click "Accept" to use the suggestion or "Discard" to cancel

### Language Support

- Switch between English and Arabic using the language switcher in the top-right corner
- Arabic interface includes RTL (Right-to-Left) layout support
- All form fields and validation messages are translated

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all form elements
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG compliant color schemes
- **Form Validation**: Clear error messages and field requirements

## Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

### Code Structure

The project follows **Feature Slice Design** architecture:

- **Shared**: Reusable utilities, UI components, and configurations
- **Entities**: Business logic and data models
- **Features**: Self-contained feature modules
- **Widgets**: Complex UI components that combine multiple features
- **Pages**: Top-level page components

### Adding New Features

1. Create feature directory under `src/features/`
2. Implement feature logic and components
3. Add translations to `src/shared/locales/`
4. Export from appropriate index files
5. Update routing if needed

### Customization

#### Styling
- Modify theme in `src/App.tsx`
- Override component styles using Material-UI's `sx` prop
- Add custom CSS in `src/index.css`

#### Translations
- Add new keys to `src/shared/locales/en.json` and `src/shared/locales/ar.json`
- Use `useTranslation` hook in components
- Support for interpolation and pluralization

#### Form Validation
- Modify schemas in `src/entities/form-data/validation.ts`
- Add custom validation rules using Yup
- Update error messages in translation files

## API Integration

### OpenAI Configuration

The application integrates with OpenAI's GPT-3.5-turbo model for text generation:

- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Model**: `gpt-3.5-turbo`
- **Rate Limiting**: Built-in error handling for rate limits
- **Timeout**: 30-second timeout for requests
- **Error Handling**: Comprehensive error messages for different failure scenarios

### Mock API

The form submission currently uses a mock API call. To integrate with a real backend:

1. Update the `onSubmit` function in `FormWizard.tsx`
2. Replace the mock call with actual API endpoint
3. Handle real response data and errors
4. Update success/error messaging

## Deployment

### Build for Production

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables for Production

Ensure the following environment variables are set:

```env
VITE_OPENAI_API_KEY=your_production_openai_key
VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
VITE_APP_NAME=Social Support Portal
```

### Deployment Options

#### **Railway (Recommended for SPA)**

1. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Set Environment Variables**
   - In Railway dashboard, go to "Variables"
   - Add:
     - `VITE_OPENAI_API_KEY` = your OpenAI API key
     - `VITE_OPENAI_API_URL` = https://api.openai.com/v1/chat/completions
     - `VITE_APP_NAME` = Social Support Portal

3. **Deploy**
   - Railway will automatically detect the configuration
   - Build and deploy will happen automatically
   - Access your app at the provided Railway URL

#### **Other Options**

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect repository
- **AWS S3**: Upload `dist` folder to S3 bucket with static hosting
- **Docker**: Create a Dockerfile for containerized deployment

## Troubleshooting

### Common Issues

1. **OpenAI API Key Not Working**
   - Verify the API key is correct and active
   - Check if you have sufficient credits in your OpenAI account
   - Ensure the key has the necessary permissions

2. **Form Not Saving Progress**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again
   - Verify the storage key is not conflicting with other applications

3. **Translation Not Loading**
   - Ensure all translation files are properly formatted JSON
   - Check browser console for i18next errors
   - Verify language codes match between switcher and files

4. **Date Picker Not Working**
   - Ensure date-fns is properly installed
   - Check if the date format matches your locale
   - Verify Material-UI date picker dependencies

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section above
- Review the code comments for implementation details

## Architecture Decisions

### Why Feature Slice Design?

- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Clear separation of concerns
- **Team Collaboration**: Different developers can work on different features
- **Testing**: Isolated feature testing becomes easier

### Why Material-UI?

- **Accessibility**: Built-in accessibility features
- **Responsive**: Mobile-first design system
- **Customization**: Extensive theming capabilities
- **Documentation**: Comprehensive documentation and examples

### Why React Hook Form?

- **Performance**: Minimal re-renders
- **Validation**: Easy integration with validation libraries
- **Developer Experience**: Intuitive API
- **Bundle Size**: Smaller bundle compared to alternatives

### Why OpenAI Integration?

- **User Experience**: Helps users write better applications
- **Accessibility**: Assists users with writing difficulties
- **Quality**: Improves application quality and completeness
- **Innovation**: Modern approach to form assistance