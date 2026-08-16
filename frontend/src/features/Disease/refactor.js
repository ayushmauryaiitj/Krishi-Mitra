const fs = require("fs");

const path =
  "c:/Users/2069a/Downloads/404-main/404-main/frontend/src/features/Disease/DiseaseDetector.jsx";
let content = fs.readFileSync(path, "utf8");

// Imports
content = content.replace(
  'import { motion } from "framer-motion";',
  'import { motion } from "framer-motion";\n',
);

// Hook
content = content.replace(
  "function DiseaseDetector() {\n  const [file, setFile] = useState(null);",
  "function DiseaseDetector() {\n  \n  const [file, setFile] = useState(null);",
);

// Strings
content = content.replace(
  /"Invalid file type. Please upload an image."/g,
  '"Invalid file type. Please upload an image."',
);
content = content.replace(
  /"File is too large. Maximum size is 5MB."/g,
  '"File is too large. Maximum size is 5MB."',
);
content = content.replace(
  /"Please select an image file first."/g,
  '"Please select an image file first."',
);
content = content.replace(
  /"An error occurred during analysis."/g,
  '"An error occurred during analysis."',
);
content = content.replace(
  />\s*Crop Disease Detector\s*</g,
  '> {"Crop Disease Detector"} <',
);
content = content.replace(
  />\s*Upload an image of your plant to detect diseases and get treatment\s*recommendations.\s*</g,
  '> {"Upload an image of your plant to detect diseases and get treatment recommendations."} <',
);
content = content.replace(
  />\s*Upload your plant image\s*</g,
  '> {"Upload your plant image"} <',
);
content = content.replace(/>Drag & drop</g, '>{"Drag & drop"}<');
content = content.replace(/>or</g, '>{"or"}<');
content = content.replace(
  />\s*Browse files\s*</g,
  '>\n                            {"Browse files"}\n                          <',
);
content = content.replace(
  />\s*Clear\s*</g,
  '>\n                          <FaTimes className="mr-2" />\n                          {"Clear"}\n                        <',
);
content = content.replace(/"Processing..."/g, '"Processing..."');
content = content.replace(
  /"Analyzing image..."/g,
  '"Analyzing image..."',
);
content = content.replace(
  />\s*Analyze Image\s*</g,
  '>\n                              <MdOutlineHealthAndSafety className="mr-2" />\n                              {"Analyze Image"}\n                            <',
);
content = content.replace(
  />\s*Image uploaded successfully!\s*</g,
  '> {"Image uploaded successfully!"} <',
);
content = content.replace(
  /"Preprocessing image..."/g,
  '"Preprocessing image..."',
);
content = content.replace(
  /"Analyzing plant health..."/g,
  '"Analyzing plant health..."',
);
content = content.replace(
  />\s*Plant Image\s*</g,
  '>\n                      <FaCamera className="mr-2 text-amber-500" />\n                      {"Plant Image"}\n                    <',
);
content = content.replace(
  />\s*Analyze Another\s*</g,
  '>\n                      {"Analyze Another"}\n                    <',
);
content = content.replace(
  />\s*Analysis Results\s*</g,
  '>\n                      <MdOutlineHealthAndSafety className="mr-2 text-green-500" />\n                      {"Analysis Results"}\n                    <',
);
content = content.replace(
  />\s*Error\s*</g,
  '>\n                        {"Error"}\n                      <',
);

// Alt text
content = content.replace(
  /alt="Selected plant preview"/g,
  'alt={"Upload your plant image"}',
);
content = content.replace(
  /alt="Analyzed plant"/g,
  'alt={"Plant Image"}',
);

fs.writeFileSync(path, content, "utf8");
console.log("DiseaseDetector done");
