const { ac, rs } = require('../constants');
const { productsModel } = require('../models');
const { RequestHelper } = require('../helpers');

exports.productList = async (req, res) => {
    try {
        const jsonData = req.body;
        const missingParams = RequestHelper.isAllParametersPresent([jsonData]);
        if (missingParams.length > 0)
            return res.status(ac.status.success).send(rs.getParameterMissingResponse(missingParams));

        const results = await productsModel.productList(jsonData);
        return res
            .status(ac.status.success)
            .send(rs.getSuccessResponse(results));
    } catch (err) {
        return res
            .status(ac.status.success)
            .send(rs.getServerErrorResponse(err));
    }
};

exports.vendorList = async (req, res) => {
    try {
        const jsonData = req.body;
        const missingParams = RequestHelper.isAllParametersPresent([jsonData]);
        if (missingParams.length > 0)
            return res.status(ac.status.success).send(rs.getParameterMissingResponse(missingParams));

        const results = await productsModel.vendorList(jsonData);
        return res
            .status(ac.status.success)
            .send(rs.getSuccessResponse(results));
    } catch (err) {
        return res
            .status(ac.status.success)
            .send(rs.getServerErrorResponse(err));
    }
}