import React from "react";
import Image from "next/image";
import google from "@/assets/google.png";
import apple from "@/assets/apple-logo.png";
import microsoft from "@/assets/microsoft.png";
import amazon from "@/assets/social.png";
import meta from "@/assets/meta.png";
import tesla from "@/assets/brand.png";
import ibm from "@/assets/ibm.png";
import intel from "@/assets/intel.png";
import samsung from "@/assets/samsung.png";
import toyota from "@/assets/car.png";

const companies = [
  { name: "Google", logo: google },
  { name: "Apple", logo: apple },
  { name: "Microsoft", logo: microsoft },
  { name: "Amazon", logo: amazon },
  { name: "Meta", logo: meta },
  { name: "Tesla", logo: tesla },
  { name: "IBM", logo: ibm },
  { name: "Intel", logo: intel },
  { name: "Samsung", logo: samsung },
  { name: "Toyota", logo: toyota },
];

const TopCompanies: React.FC = () => {
  return (
    <section className="py-12 overflow-hidden">
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8">
        Companies We Work With
      </h2>
      <div className="relative w-full overflow-hidden py-8">
        <div className="flex animate-scroll-rtl">
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
