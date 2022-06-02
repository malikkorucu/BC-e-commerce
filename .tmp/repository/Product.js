"use strict";
//import IUser from 'src/interfaces/IUser';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsQuery = void 0;
const getProductsQuery = ({ user, params = {
    search: '',
    skip: 0,
    limit: 5,
}, filter = {}, sort = {}, }) => [
    {
        $lookup: {
            from: 'favorites',
            as: 'is_favorite',
            let: { product_id: '$_id' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                // prettier-ignore
                                { $eq: ['$$product_id', '$product'] },
                                { $eq: ['$user_id', user.id] },
                            ],
                        },
                    },
                },
            ],
        },
    },
    {
        $addFields: {
            is_favorite: {
                $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true],
            },
        },
    },
    {
        $match: Object.assign(Object.assign({}, filter), { $or: [{ title: { $regex: params.search || '', $options: 'i' } }] }),
    },
    {
        $facet: {
            total: [
                {
                    $count: 'createdAt',
                },
            ],
            data: [
                {
                    $addFields: {
                        _id: '$_id',
                    },
                },
            ],
        },
    },
    {
        $sort: Object.assign(Object.assign({}, sort), { createdAt: -1 }),
    },
    {
        $unwind: '$total',
    },
    {
        $project: {
            data: {
                $slice: [
                    '$data',
                    Number(params.skip) || 0,
                    {
                        $ifNull: [Number(params.limit) || 5, '$total.createdAt'],
                    },
                ],
            },
            meta: {
                total: '$total.createdAt',
                limit: {
                    $literal: Number(params.limit) || 5,
                },
                page: {
                    $literal: Number(params.skip) / Number(params.limit) + 1,
                },
                pages: {
                    $ceil: {
                        $divide: ['$total.createdAt', Number(params.limit)],
                    },
                },
            },
        },
    },
];
exports.getProductsQuery = getProductsQuery;
//export const isIncludesInFavorites = (user: IUser) => JSON.stringify();
//# sourceMappingURL=Product.js.map