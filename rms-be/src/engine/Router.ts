import { TestRoute } from "../routes/TestRoute";

export class Router {

    /**
     * Register each route here
     */
    private static readonly routes: Map<string, (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>> = new Map([

        ["/test/m1", (request, env, ctx) => new TestRoute(request, env, ctx).method1()],

    ]);

    /**
     * Calls a registered method based on the request path
     * @param request 
     * @param env 
     * @param ctx 
     * @returns 
     */
    public static async execute(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;

        if (!Router.routes.has(path)) {
            return new Response(`${path} not found`, { status: 404 });
        }

        return await this.routes.get(path)!(request, env, ctx);
    }
}