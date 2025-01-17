import { DbProvider } from "../database/DbProvider";
import { ServiceProvider } from "../engine/ServiceProvider";
import { RouteBase } from "./RouteBase";

export class TestRoute extends RouteBase {

    private _dbProvider: any;

    constructor(request: Request, env: Env, ctx: ExecutionContext) {
        super(request, env, ctx);
        this._dbProvider = ServiceProvider.resolve<DbProvider>("DbProvider");
    }

    public async method1(): Promise<Response> {
        return new Response(`TestRoute.method1: ${this._dbProvider.test()}`);
    }

}