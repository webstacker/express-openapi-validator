import { Application } from 'express';
import { OpenAPIV3 } from './framework/types';
export interface OpenApiValidatorOpts {
    apiSpecPath?: string;
    apiSpec?: OpenAPIV3.Document | string;
    multerOpts?: {};
}
export declare class OpenApiValidator {
    private opts;
    private context;
    private multerOpts;
    constructor(options: OpenApiValidatorOpts);
    install(app: Application): void;
}
