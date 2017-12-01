import {
    connectMySQL,
    jsonpTransfer
} from '../../util/base';
import {
    queryGraph,
    test as queryTest
} from '../../util/agg-utils';
import {
    mysqlParams
} from '../../conf/db';

const pool = connectMySQL(mysqlParams);

const testGraph = async(ctx, next) => {
    ctx.body = await queryTest(pool);
}

/**
 * 基本图查询后台 API 实现
 * @param {*} ctx 
 * @param {*} next 
 */
const basicGraph = async(ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;

    const res = await queryGraph(pool, queryParams);
    // pool.end();
    return ctx.body = jsonpTransfer(res, queryParams);
}

export {
    testGraph,
    basicGraph
}