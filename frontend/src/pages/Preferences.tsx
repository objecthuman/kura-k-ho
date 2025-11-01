import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Settings, Sparkles, ArrowRight } from 'lucide-react';
import { useUpdatePreferences } from '@/hooks/useAuth';

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

const CATEGORY_COLORS = [
  'bg-red-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-cyan-400',
  'bg-orange-400',
  'bg-lime-400',
  'bg-indigo-400',
];

export function Preferences() {
  const navigate = useNavigate();
  const updatePreferencesMutation = useUpdatePreferences();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

    const preferences = {
      categories: selectedCategories,
      sources: []
    };

    updatePreferencesMutation.mutate(preferences, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err: Error) => {
        setError(err.message || 'Failed to save preferences');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-pink-400 border-4 border-black rotate-12 -z-10" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-cyan-400 border-4 border-black -rotate-12 -z-10" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-yellow-300 border-4 border-black rotate-45 -z-10" />

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <div className="bg-yellow-300 border-4 border-black p-4 rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Settings className="w-12 h-12" />
            </div>
          </div>
          <div className="inline-block bg-white border-4 border-black px-8 py-4 -rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase">Your Preferences</h1>
          </div>
          <p className="text-lg font-bold mt-4 max-w-xl mx-auto">
            Pick your favorite topics! We'll curate news just for you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold text-sm">{error}</p>
              </div>
            )}

            {/* Categories */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5" />
                <label className="text-lg font-black uppercase">
                  Choose Categories (Pick at least 1!)
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map((category, index) => {
                  const isSelected = selectedCategories.includes(category);
                  const colorClass = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-3 border-4 border-black font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all ${
                        isSelected ? colorClass : 'bg-white'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Count */}
            {selectedCategories.length > 0 && (
              <div className="bg-green-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <p className="font-black text-center">
                  {selectedCategories.length} {selectedCategories.length === 1 ? 'CATEGORY' : 'CATEGORIES'} SELECTED!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updatePreferencesMutation.isPending || selectedCategories.length === 0}
              className="w-full px-8 py-4 bg-pink-500 border-4 border-black font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 text-white"
            >
              {updatePreferencesMutation.isPending ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper Text */}
        <p className="text-center mt-6 text-sm font-bold text-gray-700">
          You can change these preferences anytime from your settings!
        </p>
      </div>
    </div>
  );
}
