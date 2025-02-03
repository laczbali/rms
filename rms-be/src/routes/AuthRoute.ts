import { DbProvider } from "../database/DbProvider";
import { ServiceProvider } from "../engine/ServiceProvider";
import { RouteBase } from "./RouteBase";

export class AuthRoute extends RouteBase {

    private _dbProvider: DbProvider;

    constructor(request: Request, env: Env, ctx: ExecutionContext) {
        super(request, env, ctx);
        this._dbProvider = ServiceProvider.resolve<DbProvider>("DbProvider");
    }

    public async login(): Promise<Response> {
        return new Response("AuthRoute.login");
    }

    public async register(): Promise<Response> {

    }

    public async logout(): Promise<Response> {
        return new Response("AuthRoute.logout");
    }

    public async isLoggedIn(): Promise<Response> {
        return new Response("AuthRoute.isLoggedIn");
    }
}