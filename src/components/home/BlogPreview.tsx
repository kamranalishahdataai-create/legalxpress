import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  cover_image_url: string | null;
  published_at: string | null;
}

// Fallback posts for demo
const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Shareholder Agreements: A Complete Guide",
    excerpt: "Learn the essential components of a shareholder agreement and why every business needs one to protect stakeholder interests.",
    slug: "understanding-shareholder-agreements",
    cover_image_url: null,
    published_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Procurement Law Changes in 2024: What You Need to Know",
    excerpt: "Recent changes to procurement regulations in Canada and how they affect businesses bidding on government contracts.",
    slug: "procurement-law-changes-2024",
    cover_image_url: null,
    published_at: "2024-01-10",
  },
  {
    id: "3",
    title: "The Incorporation Decision: Federal vs Provincial",
    excerpt: "A comprehensive comparison of federal and provincial incorporation options to help you make the right choice for your business.",
    slug: "federal-vs-provincial-incorporation",
    cover_image_url: null,
    published_at: "2024-01-05",
  },
];

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, slug, cover_image_url, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (data && data.length > 0) {
        setPosts(data);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Legal Insights</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Stay informed with legal insights, industry updates, and practical 
            advice from our team of experts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group card-hover bg-card rounded-xl overflow-hidden border border-border/50"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-secondary/50" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-3">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-secondary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
