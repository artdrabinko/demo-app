import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/ui/shadcn/button';
import { Textarea } from '../../shared/ui/shadcn/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { openAIService } from '../../shared/api/openai';

interface AIAssistanceButtonProps {
  fieldName: string;
  currentValue: string;
  onAccept: (suggestion: string) => void;
  context?: string;
  disabled?: boolean;
}

export const AIAssistanceButton: React.FC<AIAssistanceButtonProps> = ({
  fieldName,
  currentValue,
  onAccept,
  context,
  disabled = false
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOpenDialog = async () => {
    setIsOpen(true);
    setError(null);
    setSuggestion('');
    setEditedSuggestion('');
    setIsGenerating(true);

    try {
      const prompt = `Help me write a clear and professional description for: ${fieldName}. Current content: "${currentValue}"`;
      const generatedText = await openAIService.generateTextSuggestion(prompt, context);
      setSuggestion(generatedText);
      setEditedSuggestion(generatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('ai.error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = () => {
    onAccept(editedSuggestion);
    setIsOpen(false);
  };

  const handleDiscard = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleOpenDialog}
        disabled={disabled}
        aria-label={`${t('buttons.helpMeWrite')} for ${fieldName}`}
      >
        <Sparkles className="h-4 w-4 mr-2" />
        {t('buttons.helpMeWrite')}
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleDiscard}>
      <div className="bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-6 max-w-2xl w-full mx-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">{t('ai.suggestion')} - {fieldName}</h3>
        
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{t('ai.generating')}</p>
          </div>
        )}
        
        {error && (
          <div className="p-4 mb-4 bg-destructive/10 border border-destructive/50 rounded-md text-sm text-destructive">
            {error}
          </div>
        )}

        {suggestion && !isGenerating && (
          <div className="space-y-4">
            <Textarea
              value={editedSuggestion}
              onChange={(e) => setEditedSuggestion(e.target.value)}
              rows={8}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {t('messages.editSuggestion')}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleDiscard}>
            {t('buttons.discard')}
          </Button>
          <Button onClick={handleAccept} disabled={!suggestion || isGenerating}>
            {t('buttons.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};