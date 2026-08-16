import React from 'react';
import { FaRupeeSign, FaShieldAlt, FaTractor, FaInfoCircle } from 'react-icons/fa';

function GovernmentSchemes() {
  const schemes = [
    {
      id: 1,
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      icon: <FaRupeeSign className="text-4xl text-green-500 mb-4" />,
      desc: "Financial support of ₹6,000 per year to small and marginal farmers, payable in three equal installments.",
      eligibility: "All landholding farmers' families",
      link: "https://pmkisan.gov.in/"
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      icon: <FaShieldAlt className="text-4xl text-blue-500 mb-4" />,
      desc: "Crop insurance scheme to provide comprehensive insurance cover against failure of the crop, helping stabilize income.",
      eligibility: "All farmers growing notified crops in a notified area",
      link: "https://pmfby.gov.in/"
    },
    {
      id: 3,
      name: "Kisan Credit Card (KCC)",
      icon: <FaTractor className="text-4xl text-amber-500 mb-4" />,
      desc: "Provides farmers with timely access to adequate credit for agricultural expenses at reasonable interest rates.",
      eligibility: "Individual/joint cultivators, tenant farmers, self-help groups",
      link: "https://www.myscheme.gov.in/schemes/kcc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-amber-900 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-green-700">
            Government Schemes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover financial support and insurance schemes provided by the government to support your farming journey.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-sm mb-8 flex items-start">
          <FaInfoCircle className="text-blue-500 mt-1 mr-3 text-xl flex-shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>Disclaimer:</strong> This information is provided for guidance. Eligibility and benefits are subject to official government guidelines. Please visit the official portals or your local Panchayat/CSC for accurate application details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col h-full">
              {scheme.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{scheme.desc}</p>
              <div className="mb-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Eligibility</span>
                <span className="text-sm text-gray-700">{scheme.eligibility}</span>
              </div>
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto block text-center py-2 px-4 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GovernmentSchemes;
