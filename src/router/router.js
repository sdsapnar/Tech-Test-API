const { apis } = require("../constants");

const {
  productsController
} = require("../controller");

module.exports = (router) => {
  
  /* ================= Products =============================== */
  router.get(apis.products.productsList, productsController.productList)
  router.get(apis.products.vendorList, productsController.vendorList)
  return router;
};
