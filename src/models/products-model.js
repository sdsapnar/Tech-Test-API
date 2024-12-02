const { mysql, poolPromise, pool } = require('../config/db.config');

exports.productList = async (request) => {
    try {
        const {
            currentPage = 1,
            pageSize = 10,
            orderBy = 'productId',
            orderDir = 'ASC',
            searchBy,
            searchFields = [],
            ...filters
        } = request;

        let query = `
            SELECT 
            productId,
            productName,
            description,
            price,
            currency,
            category,
            subCategory,
            productCode,
            productType,
            images,
            imagesUrl,
            moreDetails,
            features,
            benefits,
            specifications,
            organizationId,
            status,
            createdAt,
            updatedAt,
            brandName,
            pricingType,
            discount,
            stock,
            sku,
            availableInCountries,
            verifiedStatus
            FROM Products 
            WHERE 1=1`;
        const values = [];

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query += ` AND ?? = ?`;
                values.push(key, value);
            }
        });

        if (searchBy && searchFields.length > 0) {
            const searchConditions = searchFields
                .map(() => `?? LIKE ?`)
                .join(' OR ');
            query += ` AND (${searchConditions})`;
            searchFields.forEach(field => {
                values.push(field, `%${searchBy}%`);
            });
        }

        query += ` ORDER BY ?? ${orderDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
        values.push(orderBy);

        const offset = (currentPage - 1) * pageSize;
        query += ' LIMIT ?, ?';
        values.push(offset, pageSize);
        const [rows] = await pool.query(query, values);

        return rows;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.vendorList = async (request) => {
    try {

        const query = `SELECT VendorOrganizationId, CompanyName, OrganizationLogoUrl, OrganizationLogoName FROM VendorsOrganizations`;
        const [rows] = await pool.query(query);

        return rows;
    } catch (err) {
        throw new Error(err.message);
    }
};
