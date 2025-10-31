import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const CATEGORIES = [
  'Politics',
  'Technology',
  'Business',
  'Sports',
  'Entertainment',
  'Science',
  'Health',
  'Environment',
  'Education',
  'World News',
];

const REGIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'in', label: 'India' },
  { value: 'global', label: 'Global' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

export function Preferences() {
  const navigate = useNavigate();
  const updatePreferences = useAuthStore((state) => state.updatePreferences);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setIsLoading(true);

    try {
      const preferences = {
        categories: selectedCategories,
        sources: [],
        language: selectedLanguage,
        region: selectedRegion,
      };

      const response = await authService.updatePreferences(preferences);

      if (response.success && response.data) {
        updatePreferences(preferences);
        navigate('/');
      } else {
        setError(response.error || 'Failed to save preferences');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Set Your Preferences</CardTitle>
          <CardDescription>
            Customize your news feed by selecting your interests
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Select Categories (at least 1)
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Region</label>
              <div className="grid grid-cols-2 gap-2">
                {REGIONS.map((region) => (
                  <Button
                    key={region.value}
                    type="button"
                    variant={selectedRegion === region.value ? 'default' : 'outline'}
                    onClick={() => setSelectedRegion(region.value)}
                    className="w-full"
                  >
                    {region.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Language</label>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((language) => (
                  <Button
                    key={language.value}
                    type="button"
                    variant={selectedLanguage === language.value ? 'default' : 'outline'}
                    onClick={() => setSelectedLanguage(language.value)}
                    className="w-full"
                  >
                    {language.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
