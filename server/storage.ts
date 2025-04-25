import { 
  users, type User, type InsertUser,
  workshops, type Workshop, type InsertWorkshop,
  registrations, type Registration, type InsertRegistration
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Workshop methods
  getAllWorkshops(): Promise<Workshop[]>;
  getWorkshopById(id: number): Promise<Workshop | undefined>;
  getWorkshopsByCategory(category: string): Promise<Workshop[]>;
  getWorkshopsByStatus(status: string): Promise<Workshop[]>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshop(id: number, workshop: Partial<InsertWorkshop>): Promise<Workshop | undefined>;
  deleteWorkshop(id: number): Promise<boolean>;
  
  // Registration methods
  getRegistrationsByWorkshopId(workshopId: number): Promise<Registration[]>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrationCount(workshopId: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workshopsMap: Map<number, Workshop>;
  private registrationsMap: Map<number, Registration>;
  currentUserId: number;
  currentWorkshopId: number;
  currentRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.workshopsMap = new Map();
    this.registrationsMap = new Map();
    this.currentUserId = 1;
    this.currentWorkshopId = 1;
    this.currentRegistrationId = 1;
    
    // Initialize with sample workshops
    this.initSampleWorkshops();
  }

  private initSampleWorkshops() {
    const sampleWorkshops: InsertWorkshop[] = [
      {
        title: "Introduction to Web Development",
        description: "Learn the basics of HTML, CSS, and JavaScript to build your first website from scratch. This workshop is perfect for complete beginners who want to get started with web development. You'll learn how to structure web pages with HTML, style them with CSS, and add interactivity with JavaScript. By the end of the workshop, you'll have created a simple webpage and understand the fundamental concepts of web development.",
        summary: "Learn the basics of HTML, CSS, and JavaScript to build your first website from scratch.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Technology",
        date: new Date("2023-06-15"),
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        location: "Online (Zoom)",
        capacity: 50,
        instructor: "Sarah Johnson",
        instructorTitle: "Senior Web Developer at TechCorp",
        instructorBio: "Sarah has 8+ years of experience in web development and has taught over 50 workshops to more than 1,000 students.",
        instructorImageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        learningPoints: ["HTML fundamentals and page structure", "CSS styling and layout techniques", "JavaScript basics for interactivity", "How to create responsive designs", "Best practices for web development"],
        requirements: ["No prior coding experience needed", "A laptop with a modern web browser", "Text editor (VS Code recommended)", "Stable internet connection for the live session"],
        status: "upcoming"
      },
      {
        title: "UX Design Fundamentals",
        description: "Discover the key principles of user experience design and learn how to create user-centered interfaces that delight your users. This hands-on workshop will cover the UX design process from research to implementation.",
        summary: "Discover the key principles of user experience design and learn how to create user-centered interfaces.",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Design",
        date: new Date("2023-06-22"),
        startTime: "2:00 PM",
        endTime: "5:00 PM",
        location: "San Francisco",
        capacity: 20,
        instructor: "Michael Chen",
        instructorTitle: "UX Designer at DesignStudio",
        instructorBio: "Michael has worked on UX design for major tech companies and has a passion for teaching design principles to newcomers.",
        instructorImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        learningPoints: ["UX research methods", "User personas and journey mapping", "Wireframing and prototyping", "Usability testing", "Design systems"],
        requirements: ["Basic computer skills", "An interest in design", "Pen and paper for sketching", "Optional: design software"],
        status: "upcoming"
      },
      {
        title: "Digital Marketing Strategies",
        description: "Learn effective digital marketing tactics to grow your audience and convert leads into customers. This comprehensive workshop covers social media, content marketing, SEO, and email campaigns.",
        summary: "Learn effective digital marketing tactics to grow your audience and convert leads into customers.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Business",
        date: new Date("2023-06-25"),
        startTime: "10:00 AM",
        endTime: "2:00 PM",
        location: "Online",
        capacity: 40,
        instructor: "Amanda Ross",
        instructorTitle: "Marketing Director",
        instructorBio: "Amanda has led marketing campaigns for startups and Fortune 500 companies, with expertise in digital growth strategies.",
        instructorImageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        learningPoints: ["Social media strategy", "Content marketing fundamentals", "SEO best practices", "Email marketing campaigns", "Analytics and measurement"],
        requirements: ["Basic marketing knowledge", "A laptop or tablet", "Access to your business social accounts (optional)"],
        status: "draft"
      }
    ];

    sampleWorkshops.forEach(workshop => this.createWorkshop(workshop));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Workshop methods
  async getAllWorkshops(): Promise<Workshop[]> {
    return Array.from(this.workshopsMap.values());
  }

  async getWorkshopById(id: number): Promise<Workshop | undefined> {
    return this.workshopsMap.get(id);
  }

  async getWorkshopsByCategory(category: string): Promise<Workshop[]> {
    return Array.from(this.workshopsMap.values())
      .filter(workshop => workshop.category === category);
  }

  async getWorkshopsByStatus(status: string): Promise<Workshop[]> {
    return Array.from(this.workshopsMap.values())
      .filter(workshop => workshop.status === status);
  }

  async createWorkshop(insertWorkshop: InsertWorkshop): Promise<Workshop> {
    const id = this.currentWorkshopId++;
    const workshop: Workshop = { ...insertWorkshop, id };
    this.workshopsMap.set(id, workshop);
    return workshop;
  }

  async updateWorkshop(id: number, workshopData: Partial<InsertWorkshop>): Promise<Workshop | undefined> {
    const existingWorkshop = this.workshopsMap.get(id);
    if (!existingWorkshop) return undefined;

    const updatedWorkshop = { ...existingWorkshop, ...workshopData };
    this.workshopsMap.set(id, updatedWorkshop);
    return updatedWorkshop;
  }

  async deleteWorkshop(id: number): Promise<boolean> {
    return this.workshopsMap.delete(id);
  }

  // Registration methods
  async getRegistrationsByWorkshopId(workshopId: number): Promise<Registration[]> {
    return Array.from(this.registrationsMap.values())
      .filter(registration => registration.workshopId === workshopId);
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = this.currentRegistrationId++;
    const registration: Registration = { 
      ...insertRegistration, 
      id, 
      registeredAt: new Date() 
    };
    this.registrationsMap.set(id, registration);
    return registration;
  }

  async getRegistrationCount(workshopId: number): Promise<number> {
    return Array.from(this.registrationsMap.values())
      .filter(registration => registration.workshopId === workshopId)
      .length;
  }
}

export const storage = new MemStorage();
