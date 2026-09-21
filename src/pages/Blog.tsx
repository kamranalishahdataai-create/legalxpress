import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  cover_image_url: string | null;
  published_at: string | null;
}

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
    excerpt: "A comprehensive comparison of federal and provincial incorporation options to help you make the right choice.",
    slug: "federal-vs-provincial-incorporation",
    cover_image_url: null,
    published_at: "2024-01-05",
  },
  {
    id: "4",
    title: "Contract Essentials: What Every Business Owner Should Know",
    excerpt: "Key contract clauses and provisions that protect your business interests in commercial agreements.",
    slug: "contract-essentials-business-owners",
    cover_image_url: null,
    published_at: "2024-01-02",
  },
  {
    id: "5",
    title: "Corporate Litigation: When to Settle vs. Go to Trial",
    excerpt: "Factors to consider when deciding between settlement and trial in corporate disputes.",
    slug: "corporate-litigation-settle-vs-trial",
    cover_image_url: null,
    published_at: "2023-12-28",
  },
  {
    id: "6",
    title: "Real Estate Transactions: Avoiding Common Pitfalls",
    excerpt: "Common mistakes in residential real estate transactions and how to avoid them.",
    slug: "real-estate-common-pitfalls",
    cover_image_url: null,
    published_at: "2023-12-20",
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, slug, cover_image_url, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setPosts(data);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Legal Insights</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Stay informed with legal insights, industry updates, and practical 
            advice from our team of experts.
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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
                  <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-secondary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 md:py-16 md:py-20 lg:py-24">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground font-body">
                Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
