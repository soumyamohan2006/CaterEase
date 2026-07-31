const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Event = require("./src/models/Event");
const Catering = require("./src/models/Catering");
const User = require("./src/models/User");

const events = [
  { name: "Wedding Events", description: "Complete wedding event management with premium catering and decor. We work with top vendors to ensure your special day is flawless and unforgettable.", location: "Kerala", date: new Date("2025-09-15"), category: "Wedding", price: 50000, image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80" },
  { name: "Birthday Parties", description: "Make your birthday celebrations special with custom packages. We handle the cake, buffet, decorations, and entertainment.", location: "Kochi", date: new Date("2025-08-10"), category: "Birthday", price: 10000, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80" },
  { name: "Corporate Events", description: "Professional corporate event planning and catering services. From team lunches to large conferences with AV setup and seamless coordination.", location: "Thrissur", date: new Date("2025-07-20"), category: "Corporate", price: 20000, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80" },
  { name: "Anniversary", description: "Elegant anniversary celebrations tailored to your love story. Intimate dinners or grand parties with personalized touches.", location: "Kerala", date: new Date("2025-10-05"), category: "Anniversary", price: 15000, image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80" },
  { name: "Festivals", description: "Festive celebrations with traditional cuisine and entertainment. Authentic regional cuisine and live entertainment.", location: "Kochi", date: new Date("2025-11-01"), category: "Festival", price: 8000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
  { name: "Baby Showers", description: "Welcome your little one in style with our curated packages. Themed decorations, custom cakes, and a curated menu.", location: "Thrissur", date: new Date("2025-08-25"), category: "Baby Shower", price: 8000, image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80" },
];

const catering = [
  { name: "Wedding Premium", description: "Complete premium wedding catering with multi-course meals crafted by expert chefs and live cooking stations.", category: "Wedding", pricePerPerson: 2500, image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", available: true },
  { name: "Birthday Package", description: "Perfect for birthday events with custom cake and buffet spread. Great for intimate gatherings and large parties.", category: "Birthday", pricePerPerson: 500, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", available: true },
  { name: "Corporate Package", description: "Professional corporate catering for meetings and conferences with punctual service and clean presentation.", category: "Corporate", pricePerPerson: 800, image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", available: true },
  { name: "Silver Celebration", description: "Elegant catering for special milestones and anniversaries with refined menu and floral table settings.", category: "Anniversary", pricePerPerson: 1200, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", available: true },
  { name: "Festival Feast", description: "Traditional festival catering with authentic regional cuisine prepared by experienced local chefs.", category: "Festival", pricePerPerson: 600, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", available: true },
  { name: "Gold Premium", description: "Our most luxurious package with live cooking stations, 8-course international menu and premium tableware.", category: "Wedding", pricePerPerson: 3500, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", available: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("Connected to MongoDB");

    await Event.deleteMany({});
    await Catering.deleteMany({});
    console.log("Cleared existing data");

    // Create admin user if not exists
    const existing = await User.findOne({ email: "admin@caterease.com" });
    if (!existing) {
      const hashed = await bcrypt.hash("admin123", 10);
      await User.create({ name: "Admin", email: "admin@caterease.com", password: hashed, role: "admin" });
      console.log("Admin user created — email: admin@caterease.com  password: admin123");
    } else {
      console.log("Admin user already exists");
    }

    await Event.insertMany(events);
    console.log("Events seeded");

    await Catering.insertMany(catering);
    console.log("Catering packages seeded");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
