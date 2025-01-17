export class RouteBase {
    protected request: Request;
    protected env: Env;
    protected ctx: ExecutionContext;

    constructor(request: Request, env: Env, ctx: ExecutionContext) {
        this.request = request;
        this.env = env;
        this.ctx = ctx;
    }
}