const invoicingspec = require("../../public/json/invoicing-spec.json");
const aiPluginSpec = require("../../public/json/ai-plugin.json");

const getOpenAPISpecFile = (req, res) => {
  res.status(200).json(invoicingspec);
};

const getAIPluginFile = (req, res) => {
  res.status(200).json(aiPluginSpec);
};

module.exports = {
  getOpenAPISpecFile,
  getAIPluginFile,
};
