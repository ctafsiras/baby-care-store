import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Baby Care Store",
  description:
    "Learn about our e-commerce platform, our story, values, and mission to provide high-quality products and exceptional customer experiences.",
  openGraph: {
    title: "About Us | Baby Care Store",
    description:
      "Discover our story, values, and commitment to quality and customer satisfaction.",
    images: [
      {
        url: "https://web.s-cdn.boostkit.dev/webaction-files/590eaf4467962d794869f303_myteam/our_team-1-64158e683f70e659c3e92504.png",
        width: 600,
        height: 400,
        alt: "Our Team",
      },
    ],
  },
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center font-bold mb-6">About Us</h1>

      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8">
          <Image
            src="https://web.s-cdn.boostkit.dev/webaction-files/590eaf4467962d794869f303_myteam/our_team-1-64158e683f70e659c3e92504.png"
            alt="Our Team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2023, our e-commerce platform was born out of a passion
            for delivering high-quality products and exceptional customer
            experiences. We started as a small team with big dreams, and today,
            we&apos;re proud to serve customers worldwide with our curated
            selection of products.
          </p>
          <p>
            Our mission is to make online shopping seamless, enjoyable, and
            accessible to everyone. We believe in the power of technology to
            connect people with the products they love, while also supporting
            sustainable and ethical business practices.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Customer Satisfaction: We put our customers first in everything we
            do.
          </li>
          <li>Quality: We curate only the best products for our platform.</li>
          <li>
            Innovation: We constantly strive to improve our services and user
            experience.
          </li>
          <li>
            Sustainability: We&apos;re committed to reducing our environmental
            impact.
          </li>
          <li>
            Transparency: We believe in open and honest communication with our
            customers and partners.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
        <p>
          We&apos;re always looking for passionate individuals to join our team.
          If you&apos;re excited about e-commerce and want to make a difference,
          check out our careers page or get in touch with us.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
