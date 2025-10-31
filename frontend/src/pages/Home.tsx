import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, FileText, Newspaper, MessageSquare, Shield, Sparkles } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Verify News. Stay Informed.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your AI-powered assistant for fact-checking news, summarizing articles, and staying updated with verified information.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Get Started
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Try Chat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Three Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <CardTitle>Fact Checking</CardTitle>
                <CardDescription>
                  Verify the accuracy of news claims with AI-powered fact-checking backed by reliable sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Instant verification results</li>
                  <li>• Confidence scores</li>
                  <li>• Source citations</li>
                  <li>• Detailed explanations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle>News Summarization</CardTitle>
                <CardDescription>
                  Get concise, easy-to-understand summaries of lengthy news articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Quick article summaries</li>
                  <li>• Key points extraction</li>
                  <li>• Sentiment analysis</li>
                  <li>• Save reading time</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Newspaper className="w-12 h-12 text-purple-500 mb-4" />
                <CardTitle>Personalized Feed</CardTitle>
                <CardDescription>
                  Receive news tailored to your interests and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom categories</li>
                  <li>• Regional filtering</li>
                  <li>• Multi-language support</li>
                  <li>• Verified sources</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up & Set Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Create an account and customize your news preferences
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Ask Questions</h3>
              <p className="text-sm text-muted-foreground">
                Use our chat to fact-check claims or summarize articles
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Stay Informed</h3>
              <p className="text-sm text-muted-foreground">
                Get verified, personalized news in your feed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-4">
            Combat Misinformation Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust our AI-powered fact-checking to stay informed with accurate news.
          </p>
          <Link to="/signup">
            <Button size="lg">
              Start Fact-Checking Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
