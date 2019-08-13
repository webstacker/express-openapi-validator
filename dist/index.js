"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const openapi_context_1 = require("./openapi.context");
const middlewares = require("./middlewares");
const ono_1 = require("ono");
const loggingKey = 'express-openapi-validator';
class OpenApiValidator {
    constructor(options) {
        if (!options.apiSpecPath && !options.apiSpec)
            throw ono_1.default('apiSpecPath or apiSpec required');
        if (options.apiSpecPath && options.apiSpec)
            throw ono_1.default('apiSpecPath or apiSpec required. not both.');
        this.multerOpts = options.multerOpts;
        const openApiContext = new openapi_context_1.OpenApiContext({
            apiDoc: options.apiSpecPath || options.apiSpec,
        });
        const opts = {
            enableObjectCoercion: true,
            apiDoc: openApiContext.apiDoc,
        };
        this.opts = opts;
        this.context = openApiContext;
    }
    install(app) {
        const pathParams = [];
        for (const route of this.context.routes) {
            if (route.pathParams.length > 0) {
                pathParams.push(...route.pathParams);
            }
        }
        // install param on routes with paths
        for (const p of _.uniq(pathParams)) {
            app.param(p, (req, res, next, value, name) => {
                if (req.openapi.pathParams) {
                    // override path params
                    req.params[name] = req.openapi.pathParams[name] || req.params[name];
                }
                next();
            });
        }
        const aoav = new middlewares.RequestValidator(this.context.apiDoc, {
            coerceTypes: true,
            removeAdditional: false,
            useDefaults: true,
        });
        const validateMiddleware = (req, res, next) => {
            return aoav.validate(req, res, next);
        };
        app.use(middlewares.applyOpenApiMetadata(this.context), middlewares.multipart(this.context, this.multerOpts), validateMiddleware);
        // middlewares.validateRequest({
        //   apiDoc: this.context.apiDoc,
        //   loggingKey,
        //   enableObjectCoercion: this.opts.enableObjectCoercion,
        // }),
        // );
    }
}
exports.OpenApiValidator = OpenApiValidator;
//# sourceMappingURL=index.js.map