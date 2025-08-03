import { type Lead, type InsertLead, type QuizQuestion, type QuizResponse, type InsertQuizResponse, type Product, type BlogPost, type StackAuditRequest, type InsertStackAuditRequest, type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead management
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadByEmail(email: string): Promise<Lead | undefined>;
  
  // Quiz management
  getQuizQuestions(): Promise<QuizQuestion[]>;
  saveQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponsesByLead(leadId: string): Promise<QuizResponse[]>;
  
  // Products
  getProducts(category?: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  
  // Blog
  getBlogPosts(category?: string): Promise<BlogPost[]>;
  getFeaturedBlogPost(): Promise<BlogPost | undefined>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  
  // Stack Audit
  createStackAuditRequest(request: InsertStackAuditRequest): Promise<StackAuditRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private quizQuestions: Map<string, QuizQuestion>;
  private quizResponses: Map<string, QuizResponse>;
  private products: Map<string, Product>;
  private blogPosts: Map<string, BlogPost>;
  private stackAuditRequests: Map<string, StackAuditRequest>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.quizQuestions = new Map();
    this.quizResponses = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.stackAuditRequests = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed quiz questions
    const questions: QuizQuestion[] = [
      {
        id: "q1",
        question: "What's your primary health concern right now?",
        options: [
          { value: "hormonal", label: "Hormonal Imbalance", description: "Hot flashes, mood swings, irregular periods, perimenopause symptoms", icon: "fas fa-venus" },
          { value: "sleep", label: "Sleep Issues", description: "Insomnia, restless sleep, cortisol spikes, trouble falling asleep", icon: "fas fa-moon" },
          { value: "energy", label: "Low Energy & Fatigue", description: "Afternoon crashes, brain fog, lack of motivation, adrenal fatigue", icon: "fas fa-bolt" },
          { value: "overwhelm", label: "Supplement Overwhelm", description: "Too many pills, unsure what's working, conflicting advice", icon: "fas fa-pills" }
        ],
        category: "primary_concern",
        order: 1
      },
      {
        id: "q2",
        question: "How would you describe your current energy levels?",
        options: [
          { value: "very_low", label: "Very Low", description: "Struggling to get through the day" },
          { value: "low", label: "Low", description: "Tired most of the time" },
          { value: "moderate", label: "Moderate", description: "Some good days, some bad days" },
          { value: "good", label: "Good", description: "Generally energetic with occasional dips" }
        ],
        category: "energy",
        order: 2
      },
      {
        id: "q3",
        question: "How is your sleep quality?",
        options: [
          { value: "poor", label: "Poor", description: "Difficulty falling or staying asleep" },
          { value: "fair", label: "Fair", description: "Some restless nights" },
          { value: "good", label: "Good", description: "Generally sleep well" },
          { value: "excellent", label: "Excellent", description: "Deep, restorative sleep" }
        ],
        category: "sleep",
        order: 3
      },
      {
        id: "q4",
        question: "Are you currently experiencing any hormonal symptoms?",
        options: [
          { value: "many", label: "Many symptoms", description: "Hot flashes, mood swings, irregular periods" },
          { value: "some", label: "Some symptoms", description: "Occasional hormonal fluctuations" },
          { value: "few", label: "Few symptoms", description: "Minor changes" },
          { value: "none", label: "No symptoms", description: "Feeling balanced" }
        ],
        category: "hormonal",
        order: 4
      },
      {
        id: "q5",
        question: "How many supplements are you currently taking?",
        options: [
          { value: "none", label: "None", description: "Not taking any supplements" },
          { value: "few", label: "1-3", description: "Just the basics" },
          { value: "moderate", label: "4-8", description: "A moderate stack" },
          { value: "many", label: "9+", description: "Taking many supplements" }
        ],
        category: "current_stack",
        order: 5
      }
    ];

    questions.forEach(q => this.quizQuestions.set(q.id, q));

    // Seed products
    const products: Product[] = [
      {
        id: "p1",
        name: "Vitex (Chasteberry)",
        brand: "Nature's Way",
        category: "hormones",
        description: "Supports hormone regulation and menstrual cycle balance",
        benefits: ["Hormone regulation support", "Third-party tested", "Non-GMO, vegan"],
        price: "$24.99",
        affiliateUrl: "https://affiliate.link/vitex",
        rating: "4.8",
        reviewCount: 1249,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        featured: true
      },
      {
        id: "p2",
        name: "Magnesium Glycinate",
        brand: "Thorne",
        category: "sleep",
        description: "Highly absorbable magnesium for better sleep and relaxation",
        benefits: ["Better sleep & relaxation", "Highly absorbable form", "NSF certified"],
        price: "$31.99",
        affiliateUrl: "https://affiliate.link/magnesium",
        rating: "4.9",
        reviewCount: 2103,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        featured: true
      },
      {
        id: "p3",
        name: "Omega-3 (DHA/EPA)",
        brand: "Nordic Naturals",
        category: "basics",
        description: "High-quality fish oil for brain and heart health",
        benefits: ["Brain & heart health", "Molecularly distilled", "No fishy aftertaste"],
        price: "$42.95",
        affiliateUrl: "https://affiliate.link/omega3",
        rating: "4.7",
        reviewCount: 856,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        featured: false
      }
    ];

    products.forEach(p => this.products.set(p.id, p));

    // Seed blog posts
    const blogPosts: BlogPost[] = [
      {
        id: "b1",
        title: "The Complete Guide to Perimenopause Supplements: What Actually Works",
        excerpt: "Navigate the confusing world of perimenopause with our comprehensive, science-backed guide to supplements that can actually help with hot flashes, mood swings, and sleep issues.",
        content: "Full article content would go here...",
        category: "hormones",
        imageUrl: "https://pixabay.com/get/g9ea0794908d5341ad1b141d5f8fac104cb95b80b24ea62ab2c93dd25f92246f7a051a6e52c8b0f2b980933278623d796e2f2286e4d36887b1757dba22fa286e1_1280.jpg",
        readTime: 12,
        author: "Dr. Sarah Chen",
        featured: true,
        publishedAt: new Date("2024-12-15"),
        slug: "perimenopause-supplements-guide"
      },
      {
        id: "b2",
        title: "5 Natural Sleep Aids That Actually Work (No Melatonin Required)",
        excerpt: "Discover science-backed alternatives to melatonin that can help you fall asleep faster and stay asleep longer.",
        content: "Full article content would go here...",
        category: "sleep",
        imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 8,
        author: "Dr. Sarah Chen",
        featured: false,
        publishedAt: new Date("2024-12-12"),
        slug: "natural-sleep-aids-guide"
      },
      {
        id: "b3",
        title: "How to Read Supplement Labels Like a Pro (Avoid These Red Flags)",
        excerpt: "Learn the insider secrets to identifying high-quality supplements and avoiding marketing gimmicks.",
        content: "Full article content would go here...",
        category: "quality",
        imageUrl: "https://pixabay.com/get/gaec5f2f24f7ccecf6ad9b4f09eb3754ab933fc7fde4c4437b8a2eb38aa070ee3fb2c3850551a638134aa1fd962e05798e411795e33d0a2a18f9e27267de8321d_1280.jpg",
        readTime: 6,
        author: "Dr. Sarah Chen",
        featured: false,
        publishedAt: new Date("2024-12-10"),
        slug: "reading-supplement-labels"
      }
    ];

    blogPosts.forEach(p => this.blogPosts.set(p.id, p));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      quizResults: insertLead.quizResults || null,
      createdAt: new Date() 
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    return Array.from(this.leads.values()).find(lead => lead.email === email);
  }

  async getQuizQuestions(): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values()).sort((a, b) => a.order - b.order);
  }

  async saveQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = randomUUID();
    const response: QuizResponse = {
      ...insertResponse,
      id,
      leadId: insertResponse.leadId || null,
      questionId: insertResponse.questionId || null,
      createdAt: new Date()
    };
    this.quizResponses.set(id, response);
    return response;
  }

  async getQuizResponsesByLead(leadId: string): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values()).filter(r => r.leadId === leadId);
  }

  async getProducts(category?: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    return category ? products.filter(p => p.category === category) : products;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    );
    return category ? posts.filter(p => p.category === category) : posts;
  }

  async getFeaturedBlogPost(): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.featured);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
  }

  async createStackAuditRequest(insertRequest: InsertStackAuditRequest): Promise<StackAuditRequest> {
    const id = randomUUID();
    const request: StackAuditRequest = {
      ...insertRequest,
      id,
      phone: insertRequest.phone || null,
      budget: insertRequest.budget || null,
      status: "pending",
      createdAt: new Date()
    };
    this.stackAuditRequests.set(id, request);
    return request;
  }
}

export const storage = new MemStorage();
