import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Achievement from "./models/Achievement.js";

dotenv.config();

async function runSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Achievement.deleteMany({});

    // Create demo user
    const user = await User.create({
      name: "Samuel Ebenezer",
      branch: "CSE • VFSTR",
      bio: "Passionate about AI, systems, and building polished UIs.",
      skills: ["React", "Node.js", "MongoDB", "Java", "Spring Boot"],
      profilepic: "https://via.placeholder.com/120"
    });

    // Create demo projects
    await Project.insertMany([
      {
        userid: user._id,
        title: "Smart Thermostat System",
        description:
          "IoT-based temperature control using NodeMCU, sensors, and web dashboard.",
        techstack: ["IoT", "React", "Node.js"],
        repolink: "https://github.com/example/smart-thermostat",
        demolink: "https://example.com/demo",
        category: "web"
      },
      {
        userid: user._id,
        title: "AI-Powered E-Commerce Recommender",
        description:
          "Recommendation engine using machine learning and collaborative filtering.",
        techstack: ["Python", "Flask", "ML"],
        repolink: "https://github.com/example/ecommerce-ai",
        demolink: "https://example.com/shop",
        category: "ml"
      }
    ]);

    // Create achievements
    await Achievement.insertMany([
      {
        userid: user._id,
        title: "Smart India Hackathon Finalist",
        date: new Date("2024-08-15"),
        description: "Developed an AI-driven healthcare system for hospitals."
      },
      {
        userid: user._id,
        title: "IEEE Paper Publication",
        date: new Date("2023-12-10"),
        description: "Published research on blockchain-based student data verification."
      }
    ]);

    console.log("🎉 Database seeded successfully!");
    console.log("👉 User ID:", user._id);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
}

runSeed();
