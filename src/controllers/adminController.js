const getAddProductsPage = (req, res, next) => {
  res.render("add-product");
};

const addProduct = (req, res) => {
  console.log("Inside /product handler");
  res.json({
    ...req.body,
  });
};

const demoAPI = (req, res) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ sampleData: "sampleData" });
    }, 2000);
  })
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  getAddProductsPage,
  addProduct,
  demoAPI,
};
