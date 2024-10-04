import React from "react";
import Image from "next/image";

const companies = [
  { name: "Google", logo: "@/assets/google.png" },
  { name: "Apple", logo: "@/assets/google.png" },
  { name: "Microsoft", logo: "@/assets/google.png" },
  { name: "Amazon", logo: "@/assets/google.png" },
  { name: "Facebook", logo: "@/assets/google.png" },
  { name: "Tesla", logo: "@/assets/google.png" },
  { name: "IBM", logo: "@/assets/google.png" },
  { name: "Intel", logo: "@/assets/google.png" },
  { name: "Samsung", logo: "@/assets/google.png" },
  { name: "Toyota", logo: "@/assets/google.png" },
];

const TopCompanies: React.FC = () => {
  return (
    <section className="py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">
        Companies We Work With
      </h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll hover:pause">
          {companies.concat(companies).map((company, index) => (
            <div key={index} className="flex-shrink-0 mx-8">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={100}
                height={50}
                objectFit="contain"
                className="w-auto h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
