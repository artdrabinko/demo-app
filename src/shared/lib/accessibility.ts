// Accessibility utilities for enhanced user experience

export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const focusElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

export const getAriaDescribedBy = (errorId: string, helperId?: string): string => {
  const ids = [errorId];
  if (helperId) {
    ids.push(helperId);
  }
  return ids.join(' ');
};

export const createFieldId = (fieldName: string): string => {
  return `${fieldName}-field`;
};

export const createErrorId = (fieldName: string): string => {
  return `${fieldName}-error`;
};

export const createHelperId = (fieldName: string): string => {
  return `${fieldName}-helper`;
};

// Keyboard navigation helpers
export const handleKeyDown = (event: React.KeyboardEvent, onEnter?: () => void, onEscape?: () => void): void => {
  switch (event.key) {
    case 'Enter':
      if (onEnter) {
        event.preventDefault();
        onEnter();
      }
      break;
    case 'Escape':
      if (onEscape) {
        event.preventDefault();
        onEscape();
      }
      break;
  }
};